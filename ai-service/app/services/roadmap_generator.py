SKILL_LEARNING_PLANS = {
    "Spring Framework": {
        "duration_days": 10,
        "topics": [
            "Spring Core",
            "Dependency Injection",
            "Spring IoC",
            "Spring Beans"
        ],
        "project": "Build a Java application using Spring dependency injection."
    },
    "MySQL": {
        "duration_days": 7,
        "topics": [
            "SQL Fundamentals",
            "Joins",
            "Indexes",
            "Database Relationships"
        ],
        "project": "Build a student database with CRUD operations."
    },
    "Docker": {
        "duration_days": 7,
        "topics": [
            "Docker Fundamentals",
            "Images and Containers",
            "Dockerfiles",
            "Docker Compose"
        ],
        "project": "Containerize a backend application."
    },
    "Python": {
        "duration_days": 14,
        "topics": [
            "Python Fundamentals",
            "Data Structures",
            "Functions",
            "Object-Oriented Programming"
        ],
        "project": "Build a Python application that processes CSV files."
    },
    "SQL": {
        "duration_days": 7,
        "topics": [
            "SQL Queries",
            "Joins",
            "Subqueries",
            "Aggregate Functions"
        ],
        "project": "Solve practical SQL problems using an employee database."
    }
}


def generate_learning_roadmap(missing_skills: list):
    roadmap = []
    current_day = 1

    for skill in missing_skills:
        plan = SKILL_LEARNING_PLANS.get(skill)

        if plan:
            duration = plan["duration_days"]
            topics = plan["topics"]
            project = plan["project"]
        else:
            duration = 7
            topics = [
                f"{skill} Fundamentals",
                f"Core Concepts of {skill}",
                f"Practical Applications of {skill}"
            ]
            project = f"Build a small practical project using {skill}."

        roadmap.append({
            "skill": skill,
            "start_day": current_day,
            "end_day": current_day + duration - 1,
            "duration_days": duration,
            "topics": topics,
            "project": project
        })

        current_day += duration

    return {
        "total_skills": len(roadmap),
        "total_duration_days": current_day - 1,
        "roadmap": roadmap
    }