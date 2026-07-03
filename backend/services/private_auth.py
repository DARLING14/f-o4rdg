"""Private authentication service for the romantic website.
Single authorized account with hashed password and session management.
"""
import hashlib
import secrets
import time
from typing import Optional, Dict

# In-memory session store (sufficient for single-user private site)
_sessions: Dict[str, dict] = {}

# Single authorized account - hashed credentials
# Username: "mylove" / Password: "forever2024"
_AUTHORIZED_USERNAME = "mylove"
_AUTHORIZED_PASSWORD_HASH = hashlib.sha256("forever2024".encode()).hexdigest()


def verify_credentials(username: str, password: str) -> bool:
    """Verify username and password against the single authorized account."""
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    # Constant-time comparison to prevent timing attacks
    username_match = secrets.compare_digest(username.lower(), _AUTHORIZED_USERNAME)
    password_match = secrets.compare_digest(password_hash, _AUTHORIZED_PASSWORD_HASH)
    return username_match and password_match


def create_session(username: str) -> str:
    """Create a new session token for the authenticated user."""
    token = secrets.token_urlsafe(64)
    _sessions[token] = {
        "username": username,
        "created_at": time.time(),
        "last_active": time.time()
    }
    return token


def validate_session(token: str) -> Optional[dict]:
    """Validate a session token and return session data."""
    if not token:
        return None
    session = _sessions.get(token)
    if not session:
        return None
    # Sessions last 30 days
    if time.time() - session["created_at"] > 30 * 24 * 3600:
        del _sessions[token]
        return None
    session["last_active"] = time.time()
    return session


def destroy_session(token: str) -> bool:
    """Destroy a session (logout)."""
    if token in _sessions:
        del _sessions[token]
        return True
    return False
