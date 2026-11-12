SKILL_RECOMMENDATIONS = {
    "Spring Framework": {
        "priority": "High",
        "what_to_learn": "Learn Spring Core, dependency injection, and Spring IoC.",
        "practice_task": "Build a simple Java application using Spring dependency injection."
    },
    "MySQL": {
        "priority": "Medium",
        "what_to_learn": "Learn SQL queries, joins, indexes, and database relationships.",
        "practice_task": "Create a student database and perform CRUD operations using MySQL."
    },
    "Java": {
        "priority": "High",
        "what_to_learn": "Learn Java fundamentals, OOP, collections, and exception handling.",
        "practice_task": "Build a console-based employee management application."
    },
    "SQL": {
        "priority": "High",
        "what_to_learn": "Learn queries, joins, subqueries, grouping, and aggregate functions.",
        "practice_task": "Solve practical SQL problems using a sample employee database."
    },
    "Spring Boot": {
        "priority": "High",
        "what_to_learn": "Learn REST controllers, dependency injection, and Spring Data JPA.",
        "practice_task": "Build a REST API using Spring Boot."
    },
    "REST API": {
        "priority": "High",
        "what_to_learn": "Learn HTTP methods, status codes, request validation, and API design.",
        "practice_task": "Create and test CRUD APIs using Postman."
    },
    "PostgreSQL": {
        "priority": "Medium",
        "what_to_learn": "Learn database design, joins, indexes, and PostgreSQL queries.",
        "practice_task": "Create a relational database and connect it to a backend application."
    },
    "Git": {
        "priority": "Medium",
        "what_to_learn": "Learn Git commits, branches, merging, and conflict resolution.",
        "practice_task": "Create a Git repository and practise branch-based development."
    },
    "Docker": {
        "priority": "Medium",
        "what_to_learn": "Learn Docker images, containers, Dockerfiles, and Compose.",
        "practice_task": "Containerize a simple backend application."
    },
    "Python": {
        "priority": "High",
        "what_to_learn": "Learn Python fundamentals, data structures, functions, and OOP.",
        "practice_task": "Build a Python application that reads and processes CSV files."
    },
    "React": {
        "priority": "High",
        "what_to_learn": "Learn components, props, state, hooks, and API integration.",
        "practice_task": "Build a React dashboard that consumes a REST API."
    },
    "JavaScript": {
        "priority": "High",
        "what_to_learn": "Learn variables, functions, arrays, objects, and asynchronous JavaScript.",
        "practice_task": "Build a small interactive web application."
    },
    "TypeScript": {
        "priority": "Medium",
        "what_to_learn": "Learn types, interfaces, generics, and TypeScript with React.",
        "practice_task": "Convert a small JavaScript application into TypeScript."
    },
    "HTML": {
        "priority": "Medium",
        "what_to_learn": "Learn semantic HTML and accessible page structure.",
        "practice_task": "Create a structured portfolio webpage."
    },
    "CSS": {
        "priority": "Medium",
        "what_to_learn": "Learn layouts, Flexbox, Grid, and responsive design.",
        "practice_task": "Build a responsive webpage for desktop and mobile."
    },
    "Excel": {
        "priority": "High",
        "what_to_learn": "Learn formulas, lookup functions, pivot tables, and data cleaning.",
        "practice_task": "Create an interactive sales analysis spreadsheet."
    },
    "Power BI": {
        "priority": "High",
        "what_to_learn": "Learn Power Query, data modelling, DAX, and dashboards.",
        "practice_task": "Build a sales performance dashboard."
    },
    "Tableau": {
        "priority": "Medium",
        "what_to_learn": "Learn data connections, calculated fields, and dashboard design.",
        "practice_task": "Create an interactive business analytics dashboard."
    },
    "Manual Testing": {
        "priority": "High",
        "what_to_learn": "Learn test cases, test scenarios, defect reporting, and test execution.",
        "practice_task": "Prepare and execute test cases for a login application."
    },
    "Automation Testing": {
        "priority": "High",
        "what_to_learn": "Learn automation frameworks and test scripting fundamentals.",
        "practice_task": "Automate a basic login workflow."
    },
    "Selenium": {
        "priority": "High",
        "what_to_learn": "Learn WebDriver, locators, waits, and browser automation.",
        "practice_task": "Automate a web application's login and registration flows."
    },
    "JUnit": {
        "priority": "Medium",
        "what_to_learn": "Learn unit testing, assertions, and test lifecycle methods.",
        "practice_task": "Write unit tests for a Java service class."
    },
    "Pytest": {
        "priority": "Medium",
        "what_to_learn": "Learn fixtures, assertions, parametrization, and test discovery.",
        "practice_task": "Write automated tests for a Python API."
    },
    "API Testing": {
        "priority": "High",
        "what_to_learn": "Learn API requests, response validation, authentication, and assertions.",
        "practice_task": "Create an API test collection in Postman."
    },
    "Performance Testing": {
        "priority": "Medium",
        "what_to_learn": "Learn load testing, response time, throughput, and bottleneck analysis.",
        "practice_task": "Run a load test against a sample REST API."
    },
    "Linux": {
        "priority": "Medium",
        "what_to_learn": "Learn Linux commands, file permissions, processes, and shell basics.",
        "practice_task": "Perform basic system administration tasks in a Linux environment."
    },
    "GitHub": {
        "priority": "Medium",
        "what_to_learn": "Learn repositories, pull requests, issues, and collaboration workflows.",
        "practice_task": "Publish a project on GitHub and create a pull request."
    },
    "MongoDB": {
        "priority": "Medium",
        "what_to_learn": "Learn collections, documents, CRUD operations, and aggregation.",
        "practice_task": "Build a simple application using MongoDB."
    },
    "Django": {
        "priority": "Medium",
        "what_to_learn": "Learn Django models, views, URLs, and ORM.",
        "practice_task": "Build a basic CRUD application using Django."
    },
    "Flask": {
        "priority": "Medium",
        "what_to_learn": "Learn Flask routing, request handling, and application structure.",
        "practice_task": "Build a small REST API using Flask."
    },
    "FastAPI": {
        "priority": "High",
        "what_to_learn": "Learn routes, Pydantic schemas, validation, and dependency injection.",
        "practice_task": "Build a REST API with FastAPI and Swagger documentation."
    },
    "Bootstrap": {
        "priority": "Medium",
        "what_to_learn": "Learn Bootstrap grid, components, and responsive utilities.",
        "practice_task": "Create a responsive dashboard using Bootstrap."
    },
    "Tailwind CSS": {
        "priority": "Medium",
        "what_to_learn": "Learn utility classes, responsive design, and component styling.",
        "practice_task": "Build a responsive landing page using Tailwind CSS."
    },
    "Spring Framework": {
        "priority": "High",
        "what_to_learn": "Learn Spring Core, dependency injection, and Spring IoC.",
        "practice_task": "Build a simple Java application using Spring dependency injection."
    }
}


def analyze_skill_gaps(missing_skills: list):
    recommendations = []

    for skill in missing_skills:
        recommendation = SKILL_RECOMMENDATIONS.get(skill)

        if recommendation:
            recommendations.append({
                "skill": skill,
                **recommendation
            })
        else:
            recommendations.append({
                "skill": skill,
                "priority": "Medium",
                "what_to_learn": f"Develop practical knowledge of {skill}.",
                "practice_task": f"Complete a small hands-on project using {skill}."
            })

    return recommendations