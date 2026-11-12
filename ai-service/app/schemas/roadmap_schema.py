from pydantic import BaseModel, Field
from typing import List


class RoadmapRequest(BaseModel):
    missing_skills: List[str] = Field(
        ...,
        description="Skills the candidate needs to learn"
    )


class SkillRoadmapItem(BaseModel):
    skill: str
    start_day: int
    end_day: int
    duration_days: int
    topics: List[str]
    project: str


class RoadmapResponse(BaseModel):
    total_skills: int
    total_duration_days: int
    roadmap: List[SkillRoadmapItem]