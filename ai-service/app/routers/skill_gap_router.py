from fastapi import APIRouter, HTTPException

from app.schemas.skill_gap_schema import (
    SkillGapRequest,
    SkillGapResponse
)

from app.services.skill_gap_analyzer import analyze_skill_gaps


router = APIRouter(
    prefix="/api/skills",
    tags=["Skill Gap Analysis"]
)


@router.post("/gap-analysis", response_model=SkillGapResponse)
def get_skill_gap_analysis(request: SkillGapRequest):
    try:
        recommendations = analyze_skill_gaps(
            request.missing_skills
        )

        return {
            "total_missing_skills": len(request.missing_skills),
            "recommendations": recommendations
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Skill gap analysis failed: {str(error)}"
        )