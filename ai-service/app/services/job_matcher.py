from app.services.job_requirements import JOB_ROLE_REQUIREMENTS


def match_job_role(candidate_skills: dict, job_role: str):

    # Check whether the requested job role exists.
    if job_role not in JOB_ROLE_REQUIREMENTS:
        raise ValueError(f"Job role '{job_role}' is not available.")

    required_skills_by_category = JOB_ROLE_REQUIREMENTS[job_role]

    matched_skills = []
    missing_skills = []

    total_required_skills = 0

    # Compare candidate skills with job requirements.
    for category, required_skills in required_skills_by_category.items():

        candidate_category_skills = candidate_skills.get(category, [])

        for skill in required_skills:

            total_required_skills += 1

            if skill.lower() in [
                candidate_skill.lower()
                for candidate_skill in candidate_category_skills
            ]:
                matched_skills.append(skill)

            else:
                missing_skills.append(skill)

    # Calculate the job match percentage.
    if total_required_skills > 0:
        match_percentage = round(
            (len(matched_skills) / total_required_skills) * 100,
            2
        )
    else:
        match_percentage = 0

    return {
        "job_role": job_role,
        "match_percentage": match_percentage,
        "total_required_skills": total_required_skills,
        "matched_skill_count": len(matched_skills),
        "missing_skill_count": len(missing_skills),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }
