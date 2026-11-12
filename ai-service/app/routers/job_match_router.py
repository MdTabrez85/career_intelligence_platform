from fastapi import APIRouter, HTTPException

from app.schemas.job_match_schema import (
    JobMatchRequest,
    JobMatchResponse
)

from app.services.job_matcher import match_job_role


router = APIRouter(
    prefix="/api/jobs",
    tags=["Job Matching"]
)


@router.post("/match", response_model=JobMatchResponse)
def match_candidate_with_job(request: JobMatchRequest):
    try:
        result = match_job_role(
            request.candidate_skills,
            request.job_role
        )

        return result

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Job matching failed: {str(error)}"
        )