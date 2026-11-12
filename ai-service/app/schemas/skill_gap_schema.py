from pydantic import BaseModel, Field
from typing import List


class SkillGapRequest(BaseModel):
    missing_skills: List[str] = Field(
        ...,
        description="Skills missing for the selected job role"
    )


class SkillRecommendation(BaseModel):
    skill: str
    priority: str
    what_to_learn: str
    practice_task: str


class SkillGapResponse(BaseModel):
    total_missing_skills: int
    recommendations: List[SkillRecommendation]