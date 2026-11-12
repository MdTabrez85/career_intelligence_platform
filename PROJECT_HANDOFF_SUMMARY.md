Career Intelligence Platform — Project Handoff Summary
Development handoff prepared
 MCA Final-Year Project


This document captures the confirmed development history, current architecture, completed functionality, troubleshooting decisions, and the next implementation steps for continuing the project in a new ChatGPT conversation.

Project name: AI-Powered Career Intelligence Platform

Project type: IGNOU MCA Final-Semester Major Project

Primary objective: Build a full-stack AI-powered platform that analyzes resumes, evaluates candidate suitability for job roles, identifies skill gaps, and generates personalized learning roadmaps.

Project root directory:
C:\career_intelligence_platform


Critical Java package requirement:
com.careerintelligence


Never use the outdated package com.careerignou.

1. Project overview and objectives
The Career Intelligence Platform is designed to help job seekers understand their professional skills and career readiness using AI.

The platform follows this workflow:
Resume Upload

PDF / DOCX


AI Resume Skill Extraction

Identifies technical skills and categories


Job Role Matching

Calculates candidate-job compatibility


Skill Gap Analysis

Identifies missing skills and learning priorities


Personalized Learning Roadmap

Planned next feature


The project is intended to demonstrate:
- Full-stack application development.
- REST API integration.
- Authentication and authorization.
- Database management.
- AI/ML service integration.
- Resume parsing and text processing.
- Career recommendation and skill analysis.
- Practical software engineering architecture.

2. Complete technology stack and versions
The following versions were confirmed during setup. They should be treated as the recorded environment versions, not assumed to be the latest releases.
Component	Technology	Recorded version
Operating system	Windows	Windows environment
IDE	VS Code	Installed
Frontend	React	19.x generation; exact patch unconfirmed
Frontend language	TypeScript	Installed; exact patch unconfirmed
Build tool	Vite	8.2.2
Node.js	Node.js	24.20.0
Package manager	npm	10.5.0
Backend	Spring Boot	4.1.1
Backend language	Java	OpenJDK 21.0.12.1
Java compiler	javac	21.0.12.1
Build tool	Maven Wrapper	3.9.16
Security	Spring Security	7.1.x generation
Authentication	JWT	JJWT 0.12.6
Database	PostgreSQL	18.6
Database GUI	pgAdmin	pgAdmin 4
AI service	Python	3.12.10
Python package manager	pip	25.0.1
AI API framework	FastAPI	Exact version unconfirmed
AI ASGI server	Uvicorn	Exact version unconfirmed
Version control	Git	2.55.0
Container platform	Docker Desktop	29.7.2
Docker Compose	Compose	5.5.0

Other important backend dependencies:
- Spring Boot Actuator.
- Spring Data JPA.
- Spring Validation.
- Spring WebMVC.
- Spring Security.
- PostgreSQL JDBC driver.
- Apache PDFBox 3.0.5.
- Apache POI OOXML 5.4.1.
- JJWT API, implementation and Jackson integration 0.12.6.
Important configuration detail: Spring Boot 4.1.1 is the recorded project version and should not be upgraded automatically during continuation. Its release is confirmed by the official Spring announcement. 
Home+1


3. Actual folder structure
The confirmed root directory is:

C:\career_intelligence_platform

The following top-level folders were established:
career_intelligence_platform/
│
├── frontend/
│
├── backend/
│
├── ai_service/
│
├── database/
│
├── docs/
│
└── .git/


The project was initialized using Git, with initial root commit:
c37e248


The exact latest complete nested folder tree has not been verified from a fresh directory listing. The following is the known implementation structure, not a claim that every listed file is present at precisely these paths.

Frontend
frontend/
├── src/
│   ├── pages/
│   │   ├── Resume.tsx
│   │   └── Dashboard.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   └── ...
│
├── package.json
└── ...


Backend
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── careerintelligence/
│       │           ├── controller/
│       │           ├── service/
│       │           ├── config/
│       │           ├── security/
│       │           ├── entity/
│       │           ├── repository/
│       │           └── ...
│       │
│       └── resources/
│           └── application.properties
│
├── pom.xml
└── mvnw.cmd


Python AI service
ai_service/
└── app/
    ├── main.py
    ├── routers/
    │   └── skill_router.py
    ├── schemas/
    │   └── skill_schema.py
    └── services/
        └── skill_extractor.py


The precise nested paths for the other AI routers and services should be verified before making modifications.

Database and documentation
database/
docs/


A PROJECT_STATUS.md file is also part of the planned handoff/documentation workflow. Its latest contents have not been provided in this conversation.

4. Backend and frontend architecture
The project uses a three-layer application architecture.
Frontend — React + TypeScript

Port 5173

Resume upload, dashboard, authentication, results and UI interactions

HTTP / JSON / JWT

Backend — Spring Boot

Port 8080

REST APIs, JWT security, resume processing, database operations and AI service communication

PostgreSQL

Port 5432

Persistent application data


Python FastAPI

Port 8000

AI and skill analysis




Frontend architecture
React handles:
- Login and registration interfaces.
- Authentication state through AuthContext.
- API communication through the centralized api.ts service.
- Dashboard navigation.
- Resume upload and management.
- Extracted resume text preview.
- AI skill extraction.
- Job role matching.
- Skill gap analysis.
- Displaying AI recommendations.
The main component currently being developed is:

frontend/src/pages/Resume.tsx
Backend architecture
Spring Boot handles:
- REST API endpoints.
- User registration and login.
- JWT token validation.
- Role-based authentication infrastructure.
- Resume file upload.
- PDF/DOCX text extraction.
- Resume data persistence.
- Communication with the Python AI service.
- Returning AI results to the React application.
Python AI architecture
FastAPI handles the AI processing independently.

The Spring Boot backend acts as the intermediary:
React
  |
  v
Spring Boot Controller
  |
  v
AiServiceClient
  |
  v
FastAPI Router
  |
  v
Python AI Service
  |
  v
JSON Response


This separation allows the AI logic to be developed independently from the Java application.

5. Database configuration and existing tables
PostgreSQL connection confirmed
Recorded database configuration:
Setting	Value
Database	career_intelligence_db
Database server	PostgreSQL
Version	18.6
Port	5432
Database username	Configured locally
Password	Configured locally; not included here

The backend successfully connected to PostgreSQL.

A previous health check returned:
{
  "database": "PostgreSQL",
  "application": "Career Intelligence Platform",
  "status": "UP"
}


Confirmed database table
The following table was explicitly verified in PostgreSQL:
public.users


User registration and authentication were tested against the database.
Resume data
Resume functionality has been implemented, including:
- Resume upload.
- Original filename.
- Content type.
- File size.
- Upload timestamp.
- Parsing status.
- Extracted text length.
- Parsing error.
- Extracted resume text retrieval.
This confirms the resume persistence functionality, but the latest actual PostgreSQL table name and complete schema were not supplied in this conversation.

Do not assume the complete database schema. Inspect PostgreSQL before creating new entities or tables.

Useful verification command:
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;


To inspect columns:
SELECT
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;



6. Completed features and implementation details
The following features have been implemented and tested successfully.
6.1 Project setup
Completed
- Java 21 environment installed.
- Node.js and npm installed.
- Python environment installed.
- PostgreSQL installed.
- pgAdmin configured.
- Docker Desktop installed.
- VS Code configured.
- Git repository initialized.
- React frontend created using Vite.
- Spring Boot backend created.
- FastAPI AI service established.
- PostgreSQL database created.
6.2 User registration
Completed
Registration endpoint was implemented.

Initial issue: HTTP 500 during registration.

After debugging, registration returned:
201 Created


User data was successfully persisted.
6.3 User login
Completed
Login endpoint was implemented.

Initial issue: HTTP 404.

After correction, login returned:
200 OK


JWT authentication was subsequently tested.
6.4 JWT authentication
Completed and tested
The following JWT functionality is implemented:
- Token generation.
- Token validation.
- Email extraction from token.
- Role extraction from token.
- Authentication context population.
- Protected API testing.
Confirmed Spring Boot terminal output:
JWT DEBUG: Token is VALID
JWT DEBUG: Email = tab.test@outlook.com
JWT DEBUG: Role = STUDENT
JWT DEBUG: Authentication set successfully


6.5 Resume upload and text extraction
Completed
Supported formats:
- PDF
- DOCX
File-size limit implemented in the frontend:
5 MB


Java libraries:
- Apache PDFBox 3.0.5.
- Apache POI OOXML 5.4.1.
Implemented functionality:
1. Select a resume.
2. Validate file extension.
3. Validate file size.
4. Upload through Spring Boot.
5. Extract resume text.
6. Store extracted text.
7. Retrieve uploaded resume information.
8. Preview extracted text in React.
9. Display extraction status and errors.
The resume preview feature was tested successfully.
6.6 AI Resume Skill Extraction
Completed and tested
Frontend endpoint:
POST /api/ai/skills/extract


Python endpoint:
POST /api/skills/extract


The frontend sends:
{
  "resume_text": "I have experience in Java, Python, SQL, Spring Boot, React, PostgreSQL, Git, GitHub, Docker, Linux and REST API."
}


Confirmed successful response:
{
  "total_skills": 11,
  "skills_by_category": {
    "Programming Languages": [
      "Python",
      "Java",
      "SQL"
    ],
    "Frontend Development": [
      "React"
    ],
    "Backend Development": [
      "Spring Boot",
      "REST API"
    ],
    "Databases": [
      "PostgreSQL"
    ],
    "Tools and Technologies": [
      "Git",
      "GitHub",
      "Docker",
      "Linux"
    ]
  }
}


Important implementation detail:

The feature was tested with a technical Java Developer resume. A nontechnical resume returned zero recognized technical skills, which is expected behavior.
6.7 Job Role Matching
Completed and tested
Frontend endpoint:
POST /api/ai/jobs/match


Python endpoint:
POST /api/jobs/match


Example request:
{
  "candidate_skills": {
    "Programming Languages": [
      "Python",
      "Java",
      "SQL"
    ],
    "Backend Development": [
      "Spring Boot",
      "REST API"
    ],
    "Databases": [
      "PostgreSQL"
    ],
    "Tools and Technologies": [
      "Git",
      "GitHub",
      "Docker",
      "Linux"
    ]
  },
  "job_role": "Java Developer"
}


Important: candidate_skills must be a dictionary/object, not a flat list.

Confirmed successful response:
{
  "job_role": "Java Developer",
  "match_percentage": 77.78,
  "total_required_skills": 9,
  "matched_skill_count": 7,
  "missing_skill_count": 2,
  "matched_skills": [
    "Java",
    "SQL",
    "Spring Boot",
    "REST API",
    "PostgreSQL",
    "Git",
    "Docker"
  ],
  "missing_skills": [
    "Spring Framework",
    "MySQL"
  ]
}


The match percentage formula is:
\[
\text{Match Percentage} =
\frac{\text{Matched Skills}}{\text{Total Required Skills}}
\times 100
\]

Example:
\[
\frac{7}{9}\times100=77.78\%
\]

The frontend displays:
- Selected job role.
- Match percentage.
- Total required skills.
- Number of matched skills.
- Number of missing skills.
- Matched skills.
- Missing skills.
6.8 AI Skill Gap Analysis
Completed and tested
Frontend endpoint:
POST /api/ai/skills/gap-analysis


Python endpoint:
POST /api/skills/gap-analysis


Frontend sends missing skills from the Job Matching response.

Example request:
{
  "missing_skills": [
    "Spring Framework",
    "MySQL"
  ]
}


The frontend has been implemented to display:
- Missing skill name.
- Learning priority.
- What to learn.
- Practical exercise.
The following frontend interface was added:
interface SkillGapItem {
  skill: string;
  priority: string;
  what_to_learn: string;
  practice_task: string;
}

interface SkillGapResult {
  recommendations: SkillGapItem[];
}


State variables:
const [skillGapResult, setSkillGapResult] =
  useState<SkillGapResult | null>(null);

const [skillGapLoading, setSkillGapLoading] =
  useState(false);

const [skillGapError, setSkillGapError] =
  useState("");


The API integration function:
const handleSkillGapAnalysis = async () => {
  if (!jobMatchResult || jobMatchResult.missing_skill_count === 0) {
    setSkillGapError("Please complete Job Role Matching first.");
    return;
  }

  setSkillGapLoading(true);
  setSkillGapError("");
  setSkillGapResult(null);

  try {
    const response = await api.post("/ai/skills/gap-analysis", {
      missing_skills: jobMatchResult.missing_skills,
    });

    setSkillGapResult(response.data);
  } catch (err: any) {
    setSkillGapError(
      err.response?.data?.message ||
        "Unable to perform Skill Gap Analysis. Please try again."
    );
  } finally {
    setSkillGapLoading(false);
  }
};


The user explicitly confirmed:

"Yes it appears successfully."

Therefore, Skill Gap Analysis is considered integrated successfully.

7. API endpoints and request/response formats
The following endpoint inventory distinguishes confirmed routes from routes whose exact schemas have not been shared.
7.1 Authentication endpoints
Method	Endpoint	Purpose
POST	/api/auth/register	Register user
POST	/api/auth/login	Authenticate user

Registration and login were successfully tested.

Exact request and response property names should be inspected from the current source code before making changes.
7.2 Resume endpoints
Method	Endpoint	Purpose
GET	/api/resumes	Retrieve uploaded resumes
POST	/api/resumes/upload	Upload resume
GET	/api/resumes/{id}/text	Retrieve extracted resume text

The frontend uses these paths through its centralized api service.

Upload uses multipart form data:
const formData = new FormData();
formData.append("file", file);

await api.post("/resumes/upload", formData);


Resume preview:
const response = await api.get(`/resumes/${resumeId}/text`);


7.3 AI endpoints
Method	Spring Boot endpoint	Python endpoint	Status
POST	/api/ai/skills/extract	/api/skills/extract	Completed
POST	/api/ai/jobs/match	/api/jobs/match	Completed
POST	/api/ai/skills/gap-analysis	/api/skills/gap-analysis	Completed
POST	/api/ai/roadmap/generate	/api/roadmap/generate	Backend client method exists; frontend integration pending

The roadmap request/response schema has not been provided. Do not invent its payload.
7.4 Health endpoint
A backend health endpoint was previously tested:
GET /api/health


Confirmed result:
{
  "database": "PostgreSQL",
  "application": "Career Intelligence Platform",
  "status": "UP"
}


Python health endpoint:
GET /health


Confirmed response:
200 OK



8. Important Java classes, React components and Python files
8.1 Important Java classes
AiController.java
Package:
com.careerintelligence.controller


Responsibilities:
- Exposes the four AI endpoints.
- Accepts JSON requests.
- Delegates processing to AiServiceClient.
- Returns AI service responses.
The following controller methods exist:
extractSkills()
matchJobRole()
analyzeSkillGaps()
generateRoadmap()


AiServiceClient.java
Package:
com.careerintelligence.service


Responsibilities:
- Connects Spring Boot to FastAPI.
- Configures the AI service base URL.
- Sends POST requests.
- Serializes JSON requests.
- Deserializes JSON responses.
Current implementation uses:
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;


This is important because the project uses Spring Boot 4's Jackson 3 package namespace in the current implementation.

The HTTP client uses:
RestClient


Its four methods are:
extractSkills()
matchJobRole()
analyzeSkillGaps()
generateRoadmap()


RestClientConfig.java
Package:
com.careerintelligence.config


Provides the Spring bean:
@Bean
public RestClient.Builder restClientBuilder() {
    return RestClient.builder();
}


AiController.java and AiServiceClient.java
These are confirmed AI integration classes. Other important existing backend classes include the JWT authentication filter, security configuration, resume processing classes, authentication controller and user controller.

Their exact latest filenames and implementations should be checked before editing.
8.2 Important React components
Resume.tsx
Path:
frontend/src/pages/Resume.tsx


This is the main AI workflow interface.

Confirmed functionality:
- Resume upload.
- Resume listing.
- File validation.
- Resume preview.
- AI skill extraction.
- Job role matching.
- Skill gap analysis.
- Loading indicators.
- Success and error messages.
- Navigation to dashboard.
- Logout.
Important TypeScript interfaces:
interface ResumeItem {
  id: number;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  parsingStatus: string;
  extractedTextLength: number;
  parsingError: string | null;
}


interface SkillExtractionResult {
  total_skills: number;
  skills_by_category: Record<string, string[]>;
}


interface JobMatchResult {
  job_role: string;
  match_percentage: number;
  total_required_skills: number;
  matched_skill_count: number;
  missing_skill_count: number;
  matched_skills: string[];
  missing_skills: string[];
}


interface SkillGapItem {
  skill: string;
  priority: string;
  what_to_learn: string;
  practice_task: string;
}


interface SkillGapResult {
  recommendations: SkillGapItem[];
}


AuthContext.tsx
Path:
frontend/src/context/AuthContext.tsx


Responsibilities:
- Manages authentication state.
- Provides logout functionality.
- Provides authentication context to components.
api.ts
Path:
frontend/src/services/api.ts


Responsibilities:
- Centralized API communication.
- Backend base URL configuration.
- Authentication token handling through the configured API client/interceptors.
The exact interceptor implementation should be inspected before changes.
8.3 Important Python files
skill_router.py
ai_service/app/routers/skill_router.py


Handles:
POST /api/skills/extract


Imports:
from app.schemas.skill_schema import (    SkillExtractionRequest,    SkillExtractionResponse)from app.services.skill_extractor import extract_skills



skill_schema.py
ai_service/app/schemas/skill_schema.py


Confirmed request schema:
from pydantic import BaseModel, Fieldfrom typing import Dict, Listclass SkillExtractionRequest(BaseModel):    resume_text: str = Field(        ...,        min_length=1,        description="Extracted text from the candidate's resume"    )class SkillExtractionResponse(BaseModel):    total_skills: int    skills_by_category: Dict[str, List[str]]



skill_extractor.py
ai_service/app/services/skill_extractor.py


Implements:
extract_skills()



The complete implementation was not included in this handoff, so preserve the existing file rather than replacing it.

Other Python routers and services have been implemented for job matching, skill gap analysis and roadmap generation, but their precise file names and schemas need verification.

9. Authentication, JWT and security implementation
The project uses Spring Security and JWT-based stateless authentication.
Confirmed security components
Component	Responsibility
SecurityConfig	Security filter chain and security configuration
JwtAuthenticationFilter	Validates incoming JWT tokens
JWT utility/service	Token creation and validation
BCryptPasswordEncoder	Password hashing
AuthController	Registration and login APIs

The exact latest class names for the JWT utility and authentication service should be verified from the source tree.
Confirmed SecurityConfig characteristics
The user previously shared the following configuration characteristics:
- JWT authentication filter injected into the security filter chain.
- CSRF disabled.
- Form login disabled.
- HTTP Basic authentication disabled.
- Stateless session management.
- BCrypt password encoder bean configured.
The application uses JWT tokens rather than server-side HTTP sessions for authentication.
JWT validation flow
1. User submits login credentials.
2. Backend validates credentials.
3. Password is checked using BCrypt.
4. Backend generates a JWT.
5. Frontend receives the token.
6. Frontend uses the token for protected API requests.
7. JwtAuthenticationFilter validates the token.
8. Email and role are extracted.
9. Authentication is populated in Spring Security's context.
Role information
Confirmed role in the JWT debug output:
STUDENT


Role-based authorization is an intended security capability. However, the full set of role restrictions and their final tests have not been documented here.

Do not assume ADMIN-specific restrictions are complete.

10. Current development progress
Project progress
Project setup
Completed

User authentication
Working

JWT authentication
Tested

Resume upload and parsing
Working

AI skill extraction
Working

Job role matching
Working

Skill gap analysis
Working

Personalized roadmap
Pending frontend integration


The first three AI capabilities are confirmed working through the frontend.

The project is currently at the stage of completing the fourth AI capability.

11. Errors encountered and their solutions
This section is particularly important. The next ChatGPT conversation should not repeat these troubleshooting steps unnecessarily.
Issue 1: Registration returned HTTP 500
Problem: User registration failed initially.

Resolution: Registration logic was debugged and corrected.

Final result: 201 Created.
Issue 2: Login returned HTTP 404
Problem: Login endpoint was not resolving.

Resolution: Endpoint configuration was corrected.

Final result: 200 OK.
Issue 3: JWT-protected endpoint returned HTTP 403
Problem: Authentication was not being accepted correctly.

Resolution: JWT filter and authentication handling were debugged.

Subsequent testing showed:
JWT DEBUG: Token is VALID
JWT DEBUG: Authentication set successfully


A test without a token also returned the expected:
401 Unauthorized


Issue 4: Python FastAPI returned HTTP 422
Problem: FastAPI reported:
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body"],
      "msg": "Field required",
      "input": null
    }
  ]
}


Investigation:
- FastAPI documentation worked at http://127.0.0.1:8000/docs.
- Direct PowerShell requests worked.
- The Spring Boot client was not sending the body in a way FastAPI successfully recognized.
Resolution: The AiServiceClient implementation was changed to serialize the request explicitly using Jackson and send JSON as a string with the correct content type.

Important current code:
byte[] jsonBody = objectMapper.writeValueAsBytes(request);

return restClient.post()
        .uri(endpoint)
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)
        .body(new String(
            jsonBody,
            java.nio.charset.StandardCharsets.UTF_8
        ))
        .retrieve()
        .body(
            new ParameterizedTypeReference<Map<String, Object>>() {}
        );


The user confirmed that the request subsequently worked.

Do not revert this implementation without a reproducible reason.
Issue 5: Jackson imports were underlined in VS Code
Initially, these imports were unresolved:
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


The user had Spring Boot 4 and encountered the new Jackson namespace in their project.

The implementation was changed to:
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;


The Maven dependency configuration was reviewed and updated.

Final result: Maven build succeeded.
Issue 6: Job matching returned HTTP 422
Problem:

FastAPI expected:
candidate_skills: dictionary


But Spring Boot sent:
{
  "candidate_skills": [
    "Python",
    "Java",
    "SQL"
  ]
}


Resolution:

The request was corrected to send categorized skills as a JSON object.

Correct format:
{
  "candidate_skills": {
    "Programming Languages": [
      "Python",
      "Java",
      "SQL"
    ]
  },
  "job_role": "Java Developer"
}


Final result: 200 OK.
Issue 7: Technical skills were not found in a nontechnical resume
Problem: Skill extraction displayed:
Total Skills Identified: 0

No recognized skills were found in this resume.


Resolution: The user uploaded a technical Java Developer resume.

Final result: The extraction and subsequent matching worked successfully.

This was not a backend error.
Issue 8: VS Code yellow underlines
Some Job Matching state variables and functions appeared faded with yellow underlines.

These were TypeScript warnings associated with unused declarations during implementation.

The user confirmed that the feature subsequently worked.
Issue 9: Resume preview integration
The user initially had difficulty locating the correct insertion points for code.

Resolution: A complete Resume.tsx file was provided rather than isolated snippets.

For future modifications, continue providing complete files whenever the user says they cannot locate where code should go.

12. Pending tasks and known issues
Immediate pending task
Next implementation
 Personalized Learning Roadmap.

The Spring Boot client already contains:
public Map<String, Object> generateRoadmap(
        Map<String, Object> request) {

    return post("/api/roadmap/generate", request);
}


The controller already exposes:
@PostMapping("/roadmap/generate")


The Python service also has a roadmap-generation route, as reflected in the existing architecture.

However, the frontend integration has not been completed.
Other pending work
Task	Status
Roadmap frontend integration	Pending
Verify roadmap request schema	Pending
Verify roadmap response schema	Pending
End-to-end testing of all four AI features	Pending
Verify complete database schema	Pending
Verify complete folder structure	Pending
Review role-based authorization rules	Needs verification
Add automated backend/frontend tests	Not confirmed
Improve UI responsiveness and consistency	Future work
Complete technical documentation	Future work
Final MCA project report	Pending
Final project testing and demonstration	Pending

Known limitations
1. Exact current dependency patch versions have not all been recorded.
2. The full database schema has not been supplied.
3. The complete current source tree has not been supplied.
4. Roadmap request/response models have not been verified.
5. Full role-based access control testing has not been confirmed.
6. The AI implementation's exact underlying algorithms and whether an external LLM is used have not been fully documented.
Do not claim the platform uses a particular external LLM, transformer model, or generative AI provider until the actual implementation is inspected.

13. Exact last completed step
Last confirmed completion
The user successfully integrated and tested AI Skill Gap Analysis in:
frontend/src/pages/Resume.tsx


The implementation includes:
1. SkillGapItem interface.
2. SkillGapResult interface.
3. Skill gap state variables.
4. handleSkillGapAnalysis() function.
5. Analyze My Skill Gaps button.
6. Loading and error handling.
7. Skill gap recommendations display.
The user explicitly confirmed:
Yes it appears successfully.

After that, the assistant proposed the Personalized Learning Roadmap as the next feature.

No roadmap frontend implementation has been confirmed.

14. Exact next step to implement
Personalized Learning Roadmap — Step 1: Inspect the existing Python implementation
Do not start by writing new code.

First inspect the existing Python roadmap files and their schemas.

The known Spring Boot route is:
POST /api/ai/roadmap/generate


The known Python route is:
POST /api/roadmap/generate


The existing AiServiceClient.generateRoadmap() method and AiController.generateRoadmap() method should be reused.

First ask the user to share these files:
1. Python roadmap router.
2. Python roadmap schema.
3. Python roadmap service.
4. Current Resume.tsx (only if necessary to inspect the latest roadmap integration point).
Then:
- Understand the exact request format.
- Understand the exact response format.
- Create the corresponding TypeScript interfaces.
- Add roadmap state variables.
- Implement the API function.
- Add a Generate Learning Roadmap button.
- Display the generated learning plan.
- Test using the Java Developer resume.
Expected conceptual output
For the earlier Java Developer example:
- Missing skill: Spring Framework.
- Missing skill: MySQL.
The platform should produce an organized learning plan with:
- Learning duration.
- Topics.
- Daily or weekly milestones.
- Practical exercises.
- Learning sequence.
The proposed 17-day duration (10 days for Spring Framework and 7 days for MySQL) was an illustrative example, not an already implemented or confirmed roadmap calculation.

Important: Preserve the working Skill Extraction, Job Matching and Skill Gap Analysis features. Do not rewrite them unnecessarily.

15. Instructions for the next ChatGPT conversation
The next ChatGPT conversation must follow these development rules.
Teaching approach
The user is developing this project as an MCA student and prefers beginner-friendly, step-by-step guidance.

Follow these rules:
1. Explain one development step at a time.
2. Always specify the exact file path.
3. Explain where new code should be inserted.
4. When modifying a large component, provide the complete updated file.
5. Do not skip setup or configuration steps.
6. Explain what each important piece of code does.
7. Give testing instructions after every major implementation.
8. Wait for the user to confirm success before moving to the next step.
9. Do not repeat features already completed.
10. Do not assume code exists without checking the current implementation.
Critical technical rules
- Java base package: com.careerintelligence.
- Frontend: React + TypeScript + Vite.
- Backend: Spring Boot 4.1.1.
- Database: PostgreSQL 18.6.
- AI service: Python + FastAPI.
- Preserve the existing AiServiceClient JSON serialization implementation.
- Reuse existing endpoints and services wherever possible.
- Avoid unnecessary dependency upgrades.
- Do not replace working code without a specific reason.
- Keep frontend, backend and Python service responsibilities separate.

16. Ready-to-use prompt for the next ChatGPT conversation
Copy the following prompt and paste it into your new conversation.

# Continue My MCA Final-Year Project — AI-Powered Career Intelligence Platform

I am continuing development of my IGNOU MCA final-semester major project, called **AI-Powered Career Intelligence Platform**.

I am sharing the complete project handoff summary from my previous ChatGPT conversation. Treat it as the development history and source of truth, while verifying important details against my actual source code whenever necessary.

## 1. Project configuration

Project root:

`C:\career_intelligence_platform`

Main folders:

- frontend/
- backend/
- ai_service/
- database/
- docs/

Java base package:

`com.careerintelligence`

IMPORTANT: Never use the outdated `com.careerignou` package.

## 2. Technology stack

- Java 21
- Spring Boot 4.1.1
- Maven Wrapper
- Spring Security
- JWT (JJWT 0.12.6)
- PostgreSQL 18.6
- React
- TypeScript
- Vite 8.2.2
- Node.js 24.20.0
- npm 10.5.0
- Python 3.12.10
- FastAPI
- Uvicorn
- VS Code
- Git

Ports:

- Frontend: 5173
- Spring Boot: 8080
- Python AI service: 8000
- PostgreSQL: 5432

Database:

`career_intelligence_db`

## 3. Completed functionality

The following features have already been implemented and tested:

1. Project environment setup.
2. PostgreSQL database connection.
3. User registration.
4. User login.
5. JWT token generation and validation.
6. JWT authentication filter.
7. Spring Security configuration.
8. Resume upload (PDF/DOCX).
9. Resume text extraction using PDFBox and Apache POI.
10. Resume storage and retrieval.
11. Extracted resume text preview.
12. AI Resume Skill Extraction.
13. AI Job Role Matching.
14. AI Skill Gap Analysis.

The following workflow is working:

Resume Upload → Skill Extraction → Job Role Matching → Skill Gap Analysis.

## 4. Important existing files

Frontend:

- frontend/src/pages/Resume.tsx
- frontend/src/services/api.ts
- frontend/src/context/AuthContext.tsx

Backend:

- com.careerintelligence.controller.AiController
- com.careerintelligence.service.AiServiceClient
- com.careerintelligence.config.RestClientConfig
- Existing authentication, JWT, security and resume classes.

Python:

- ai_service/app/routers/skill_router.py
- ai_service/app/schemas/skill_schema.py
- ai_service/app/services/skill_extractor.py
- Existing job matching, skill gap and roadmap implementations.

## 5. Important AI endpoints

Spring Boot:

- POST /api/ai/skills/extract
- POST /api/ai/jobs/match
- POST /api/ai/skills/gap-analysis
- POST /api/ai/roadmap/generate

Python:

- POST /api/skills/extract
- POST /api/jobs/match
- POST /api/skills/gap-analysis
- POST /api/roadmap/generate

The Spring Boot controller and AiServiceClient already have roadmap-generation methods.

Do not unnecessarily recreate them.

## 6. Important previous debugging solution

The AiServiceClient uses Jackson 3 imports:

`tools.jackson.core.JacksonException`

`tools.jackson.databind.ObjectMapper`

It explicitly serializes requests into JSON and sends them through Spring RestClient using application/json.

This implementation fixed a recurring FastAPI HTTP 422 issue.

Do not revert this implementation without a reproducible reason.

Job matching requires candidate_skills to be a categorized JSON object, not a flat array.

## 7. Current development position

The last completed feature is AI Skill Gap Analysis.

It has been successfully integrated into Resume.tsx.

The frontend displays:

- Missing skills.
- Learning priority.
- What to learn.
- Practical exercise.

I explicitly confirmed that it works successfully.

## 8. Immediate next task

Continue with:

**Personalized Learning Roadmap Integration.**

The backend controller, AI client method and Python roadmap endpoint already exist.

Start by asking me to share these existing Python files:

1. Roadmap router.
2. Roadmap schema.
3. Roadmap service.

Inspect their actual implementation before writing frontend code.

Then implement the roadmap integration in React.

Expected functionality:

- Generate a learning roadmap from identified skill gaps.
- Display learning duration.
- Display learning topics.
- Display daily or weekly milestones.
- Display practical exercises.
- Display the learning sequence.

Do not invent the request or response schema. Derive it from the existing Python implementation.

## 9. My development preferences

I am a beginner in some of these technologies, so teach me step by step.

For every implementation:

1. Give me the exact file path.
2. Tell me exactly where to insert the code.
3. Explain the purpose of the code.
4. Provide complete code when modifying a large file such as Resume.tsx.
5. Give me the exact commands to run.
6. Tell me how to test using Postman or the browser.
7. Wait for my confirmation before proceeding.

Do not repeat completed features or unnecessarily rewrite existing working code.

If a file's actual implementation is unknown, ask me to share it rather than guessing.

## 10. Long-term project objective

After completing the learning roadmap, help me finish the remaining project work:

- Complete end-to-end testing.
- Review role-based authorization.
- Improve the UI.
- Add appropriate validations and error handling.
- Verify database schema.
- Add automated tests.
- Prepare project documentation.
- Prepare IGNOU MCA project report.
- Prepare diagrams, architecture documentation and presentation.
- Prepare for project demonstration and viva.

Maintain the existing architecture and package naming.

**First response:** Acknowledge this handoff, summarize the exact current development position briefly, and ask me to share the Python roadmap router, schema and service files so we can begin implementation without repeating completed work.