from fastapi import APIRouter, HTTPException

from app.schemas.roadmap_schema import (
    RoadmapRequest,
    RoadmapResponse
)

from app.services.roadmap_generator import generate_learning_roadmap


router = APIRouter(
    prefix="/api/roadmap",
    tags=["Learning Roadmap"]
)


@router.post("/generate", response_model=RoadmapResponse)
def create_learning_roadmap(request: RoadmapRequest):
    try:
        result = generate_learning_roadmap(
            request.missing_skills
        )

        return result

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Roadmap generation failed: {str(error)}"
        )