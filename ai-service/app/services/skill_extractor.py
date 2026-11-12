
import re


# Technical skills supported by our initial skill database.
SKILL_DATABASE = {
    "Programming Languages": [
        "Python",
        "Java",
        "JavaScript",
        "TypeScript",
        "C",
        "C++",
        "C#",
        "PHP",
        "SQL"
    ],

    "Frontend Development": [
        "HTML",
        "CSS",
        "React",
        "Angular",
        "Vue.js",
        "Bootstrap",
        "Tailwind CSS"
    ],

    "Backend Development": [
        "Spring Boot",
        "Spring Framework",
        "FastAPI",
        "Django",
        "Flask",
        "Node.js",
        "Express.js",
        "REST API"
    ],

    "Databases": [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Oracle",
        "SQL Server",
        "Redis"
    ],

    "Tools and Technologies": [
        "Git",
        "GitHub",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "Linux",
        "AWS",
        "Azure",
        "Power BI",
        "Tableau",
        "Excel"
    ],

    "Testing and Validation": [
        "Manual Testing",
        "Automation Testing",
        "Selenium",
        "JUnit",
        "Pytest",
        "API Testing",
        "Performance Testing"
    ]
}


SKILL_ALIASES = {
    "js": "JavaScript",
    "ts": "TypeScript",
    "reactjs": "React",
    "nodejs": "Node.js",
    "postgres": "PostgreSQL",
    "postgresql": "PostgreSQL",
    "restful api": "REST API",
    "powerbi": "Power BI",
    "ms excel": "Excel"
}


def extract_skills(resume_text: str):

    if not resume_text or not resume_text.strip():
        return {}

    normalized_text = resume_text.lower()

    extracted_skills = {}

    for category, skills in SKILL_DATABASE.items():

        matched_skills = []

        for skill in skills:

            pattern = r"(?<![a-z0-9])" + re.escape(
                skill.lower()
            ) + r"(?![a-z0-9])"

            if re.search(pattern, normalized_text):
                matched_skills.append(skill)

        if matched_skills:
            extracted_skills[category] = matched_skills

    # Check common alternative skill names.
    for alias, actual_skill in SKILL_ALIASES.items():

        pattern = r"(?<![a-z0-9])" + re.escape(
            alias
        ) + r"(?![a-z0-9])"

        if re.search(pattern, normalized_text):

            for category, skills in SKILL_DATABASE.items():

                if actual_skill in skills:

                    if category not in extracted_skills:
                        extracted_skills[category] = []

                    if actual_skill not in extracted_skills[category]:
                        extracted_skills[category].append(actual_skill)

                    break

    return extracted_skills
