# API Inventory & Endpoint Specifications: `mpscexam`

This document defines all RESTful / Server Action API endpoint contracts for the MPSC Exam platform.

---

## 1. Authentication Endpoints

### `POST /api/auth/register`
* **Purpose:** Create a new candidate profile.
* **Request Body:**
  ```json
  {
    "name": "Aniket Patil",
    "email": "aniket@example.com",
    "phone": "+919579616908",
    "password": "StrongPassword123",
    "targetExam": "MPSC_RAJYASEVA_2026"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "user": { "id": "usr_101", "name": "Aniket Patil", "email": "aniket@example.com" }
  }
  ```

### `POST /api/auth/login`
* **Purpose:** Authenticate user and issue JWT / HttpOnly cookie.
* **Request Body:** `{ "email": "aniket@example.com", "password": "StrongPassword123" }`
* **Response (200 OK):** `{ "success": true, "token": "jwt_token_here", "user": { ... } }`

---

## 2. Test Series & Exam Runner Endpoints

### `GET /api/tests`
* **Purpose:** Retrieve list of available mock tests with filtering.
* **Query Params:** `?category=rajyaseva&type=prelims&page=1&limit=10`
* **Response (200 OK):**
  ```json
  {
    "tests": [
      {
        "id": "tst_2026_01",
        "title": "MPSC Prelims GS 1 - Full Mock Test 1",
        "totalQuestions": 100,
        "durationMinutes": 120,
        "totalMarks": 200,
        "negativeMarksPerWrong": 0.5
      }
    ],
    "total": 24
  }
  ```

### `POST /api/tests/:id/start`
* **Purpose:** Initiate an exam session for the authenticated user.
* **Response (200 OK):**
  ```json
  {
    "attemptId": "att_9001",
    "startedAt": "2026-08-31T10:00:00.000Z",
    "durationSeconds": 7200,
    "questions": [
      {
        "id": "q_1",
        "questionMarathi": "महाराष्ट्रातील खालीलपैकी कोणत्या जिल्ह्यात सर्वाधिक वनक्षेत्र आहे?",
        "questionEnglish": "Which of the following districts in Maharashtra has the highest forest cover?",
        "options": [
          { "key": "A", "textMarathi": "गडचिरोली", "textEnglish": "Gadchiroli" },
          { "key": "B", "textMarathi": "रत्नागिरी", "textEnglish": "Ratnagiri" },
          { "key": "C", "textMarathi": "चंद्रपूर", "textEnglish": "Chandrapur" },
          { "key": "D", "textMarathi": "पुणे", "textEnglish": "Pune" }
        ],
        "marks": 2.0
      }
    ]
  }
  ```
  *(Note: `correctOption` and `explanation` are deliberately omitted during active test execution).*

### `POST /api/tests/:id/submit`
* **Purpose:** Grade submitted responses and finalize test attempt.
* **Request Body:**
  ```json
  {
    "attemptId": "att_9001",
    "answers": [
      { "questionId": "q_1", "selectedOption": "A", "timeSpentSeconds": 45 }
    ]
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "attemptId": "att_9001",
    "score": 142.5,
    "totalMarks": 200,
    "correctCount": 75,
    "incorrectCount": 15,
    "unattemptedCount": 10,
    "accuracy": 83.33,
    "rank": 14,
    "totalParticipants": 850
  }
  ```

### `GET /api/attempts/:id`
* **Purpose:** Retrieve post-exam review with full bilingual solutions.
* **Response (200 OK):** Includes questions, student choice, correct key, and detailed reasoning.

---

## 3. Question Bank & PYQ Endpoints

### `GET /api/pyq`
* **Purpose:** Query previous years' questions archive.
* **Query Params:** `?year=2024&exam=combine_group_b&subject=polity`
* **Response (200 OK):** Paginated question items with explanations.
