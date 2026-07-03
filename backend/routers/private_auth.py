"""Private authentication router for the romantic website."""
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from services.private_auth import (
    verify_credentials,
    create_session,
    validate_session,
    destroy_session,
)

router = APIRouter(prefix="/api/v1/private-auth", tags=["private-auth"])


class LoginRequest(BaseModel):
    username: str
    password: str
    remember_me: bool = False


class LoginResponse(BaseModel):
    success: bool
    token: Optional[str] = None
    message: str = ""


class SessionCheckRequest(BaseModel):
    token: str


class SessionCheckResponse(BaseModel):
    valid: bool
    username: Optional[str] = None


class LogoutRequest(BaseModel):
    token: str


@router.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    """Authenticate with username and password."""
    try:
        if verify_credentials(data.username, data.password):
            token = create_session(data.username)
            return LoginResponse(
                success=True,
                token=token,
                message="Welcome back, my love ❤️"
            )
        else:
            # Never reveal which field was incorrect
            return LoginResponse(
                success=False,
                token=None,
                message="Invalid credentials. Please try again."
            )
    except Exception as e:
        logging.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Authentication error")


@router.post("/verify", response_model=SessionCheckResponse)
async def verify_session(data: SessionCheckRequest):
    """Verify if a session token is still valid."""
    session = validate_session(data.token)
    if session:
        return SessionCheckResponse(valid=True, username=session["username"])
    return SessionCheckResponse(valid=False, username=None)


@router.post("/logout")
async def logout(data: LogoutRequest):
    """Destroy the session."""
    destroy_session(data.token)
    return {"success": True, "message": "Logged out successfully"}
