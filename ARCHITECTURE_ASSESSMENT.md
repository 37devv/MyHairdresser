# Architecture Assessment

## Summary
- Two-tier monorepo: Spring Boot + JPA backend (`backend/`) and React/MUI frontend (`myhairdresser-frontend/`).
- Backend layering is clear (controller/service/repository/model).
- Biggest risks are security/data exposure, inconsistent DTO usage, and lack of auth boundary.

## What’s Working Well
- Clear backend layering: `controller/`, `service/`, `repository/`, `model/` (`backend/src/main/java/ch/myhairdresser/backend/...`).
- Liquibase for schema evolution (`backend/src/main/resources/db/changelog`).
- MapStruct in use for mapping DTOs in some flows (`backend/src/main/java/ch/myhairdresser/backend/mapper`).
- Frontend structured with routes/layouts/pages and wired to backend endpoints.

## High-Risk Issues
1. Passwords can leak via API responses
   - `Hairsalon` includes `password`, and entities are returned directly in endpoints such as `autocomplete` and `search`.
   - Files:
     - `backend/src/main/java/ch/myhairdresser/backend/model/dao/Hairsalon.java`
     - `backend/src/main/java/ch/myhairdresser/backend/controller/HairsalonController.java`

2. Authentication is plaintext and not hardened
   - Login compares stored password directly and returns a string without issuing a token/session.
   - Files:
     - `backend/src/main/java/ch/myhairdresser/backend/service/HairsalonService.java`
     - `backend/src/main/java/ch/myhairdresser/backend/controller/HairsalonController.java`

3. CORS allows any origin with credentials
   - `GlobalCorsConfig` allows `*` with `allowCredentials(true)`.
   - File: `backend/src/main/java/ch/myhairdresser/backend/config/GlobalCorsConfig.java`

4. Entities exposed directly in API responses
   - Controllers return `Appointment`, `Hairsalon`, and `Service` directly.
   - Files:
     - `backend/src/main/java/ch/myhairdresser/backend/controller/*.java`

## Medium-Risk Issues
1. Missing or inconsistent validation
   - `javax.validation` is present but `@Valid` and constraint annotations are not used.
   - Files: `backend/src/main/java/ch/myhairdresser/backend/controller/*.java`

2. Potential double-booking
   - `bookAppointment` does not check for overlapping timeslots or guard against race conditions.
   - File: `backend/src/main/java/ch/myhairdresser/backend/service/AppointmentService.java`

3. EAGER fetching on multiple collections
   - `Hairsalon` eagerly fetches `images`, `dailyOpeningHours`, `services`, which can cause heavy queries and large payloads.
   - File: `backend/src/main/java/ch/myhairdresser/backend/model/dao/Hairsalon.java`

4. Controller bug in `getHairsalonByName`
   - Method signature does not match the path and appears to call `getHairsalonById` incorrectly.
   - File: `backend/src/main/java/ch/myhairdresser/backend/controller/HairsalonController.java`

## Frontend Architecture Observations
- API calls are duplicated and hard-coded (`http://localhost:8080/api`) across components.
  - Examples:
    - `myhairdresser-frontend/src/pages/appointment/AppointmentDialog.js`
    - `myhairdresser-frontend/src/pages/client-facing/FilterHairsalonSearch.js`
- `.env` exists but no API base URL is configured (`myhairdresser-frontend/.env`).
- Redux is present, but most API logic is in components, creating an inconsistent data layer.

## Quick Wins (1–2 days)
1. Stop returning entities directly; use response DTOs and ensure `password` is never serialized.
2. Hash and salt passwords; return a token/session on login.
3. Centralize API base URL in config or `.env` (e.g., `REACT_APP_API_BASE_URL`).
4. Lock down CORS to known origins.
5. Fix `getHairsalonByName` signature mismatch.

## Questions to Tailor the Next Pass
1. Is this intended for production deployment or a prototype?
2. Will there be multiple salons/users with roles (admin, staff, customer)?
3. What’s your expected scale (appointments per day, concurrent users)?
4. What’s your preferred deployment target (Docker, cloud, bare metal)?
