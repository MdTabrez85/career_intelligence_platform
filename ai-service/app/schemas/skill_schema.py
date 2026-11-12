from pydantic import BaseModel, Field
from typing import Dict, List


class SkillExtractionRequest(BaseModel):
    resume_text: str = Field(
        ...,
        min_length=1,
        description="Extracted text from the candidate's resume"
    )


class SkillExtractionResponse(BaseModel):
    total_skills: int
    skills_by_category: Dict[str, List[str]]
