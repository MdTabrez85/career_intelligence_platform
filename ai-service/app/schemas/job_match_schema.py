from pydantic import BaseModel, Field
from typing import Dict, List


class JobMatchRequest(BaseModel):
    candidate_skills: Dict[str, List[str]] = Field(
        ...,
        description="Skills extracted from the candidate's resume"
    )

    job_role: str = Field(
        ...,
        min_length=1,
        description="Target job role for matching"
    )


class JobMatchResponse(BaseModel):
    job_role: str
    match_percentage: float
    total_required_skills: int
    matched_skill_count: int
    missing_skill_count: int
    matched_skills: List[str]
    missing_skills: List[str]