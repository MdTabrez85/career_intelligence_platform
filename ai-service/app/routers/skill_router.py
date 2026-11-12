from fastapi import APIRouter, HTTPException

from app.schemas.skill_schema import (
    SkillExtractionRequest,
    SkillExtractionResponse
)

from app.services.skill_extractor import extract_skills


router = APIRouter(
    prefix="/api/skills",
    tags=["Resume Intelligence"]
)


@router.post(
    "/extract",
    response_model=SkillExtractionResponse
)
def extract_resume_skills(request: SkillExtractionRequest):

    try:

        skills = extract_skills(request.resume_text)

        total_skills = sum(
            len(skill_list)
            for skill_list in skills.values()
        )

        return {
            "total_skills": total_skills,
            "skills_by_category": skills
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Skill extraction failed: {str(error)}"
        )
