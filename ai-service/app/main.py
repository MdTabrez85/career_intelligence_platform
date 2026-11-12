
from fastapi import FastAPI

from app.routers.skill_router import router as skill_router
from app.routers.job_match_router import router as job_match_router
from app.routers.skill_gap_router import router as skill_gap_router
from app.routers.roadmap_router import router as roadmap_router


app = FastAPI(
    title="Career Intelligence AI Service",
    description="AI-powered resume analysis and career intelligence service",
    version="1.0.0"
)


app.include_router(skill_router)
app.include_router(job_match_router)
app.include_router(skill_gap_router)
app.include_router(roadmap_router)


@app.get("/")
def home():
    return {
        "application": "Career Intelligence AI Service",
        "status": "Running",
        "message": "Python AI service is working successfully!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "AI Service"
    }
