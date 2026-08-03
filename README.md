# Job Application Tracker

## MVP Project Write-Up

## 1. Project Overview

The Job Application Tracker is a full-stack web application that helps users organize and manage applications for jobs, internships, scholarships, and other professional or educational opportunities.

The application replaces scattered notes, spreadsheets, browser bookmarks, and memory-based tracking with a centralized dashboard. Authenticated users can track what they applied for, monitor the current status of each opportunity, review important notes, and update their records as the application process progresses.

Each user has a private dashboard that displays only the applications associated with their account.

## 2. Problem Statement

Managing multiple applications can quickly become disorganized. Applicants may:

* Forget deadlines
* Lose application links
* Forget which opportunities they applied for
* Lose track of interview stages
* Forget when they last followed up
* Store important details across several unrelated tools

The Job Application Tracker addresses this problem by giving users one central place to manage each opportunity from initial interest through the final outcome.

## 3. Target User

The application is designed for people actively applying for:

* Jobs
* Internships
* Scholarships
* Fellowships
* Academic programs
* Similar professional or educational opportunities

The intended user needs a lightweight and private tracking system that is easy to understand, quick to update, and accessible from a single dashboard.

## 4. Core Project Goals

The MVP was designed to allow users to:

1. Log in securely.
2. View a private dashboard containing only their applications.
3. Create new application records.
4. View the details of an individual application.
5. Edit existing applications.
6. Delete applications.
7. Retain saved data after refreshing or logging out.
8. Prevent other users from accessing their records.

The most important requirement was that each authenticated user could only access applications belonging to their own account.

## 5. Completed MVP Features

### Authentication

* Users can securely log in and log out through Auth0.
* Auth0 identifies each user through a verified access token.
* Authenticated Auth0 users are synchronized with user records in PostgreSQL.

### Application Management

Authenticated users can:

* View all applications associated with their account.
* Create a new application.
* View the details of one application.
* Edit an existing application.
* Delete an application.

### Data Persistence

* Application data is stored in PostgreSQL through Neon.
* Saved applications remain available after refreshing the browser.
* Saved data remains connected to the user after logging out and returning later.
* The deployed frontend successfully communicates with the deployed backend API.

## 6. Application Data Model

Each application record includes the following fields:

| Field       | Description                                             |
| ----------- | ------------------------------------------------------- |
| `company`   | Name of the company, school, organization, or program   |
| `role`      | Job title, internship, scholarship, or opportunity name |
| `status`    | Current stage of the application                        |
| `notes`     | Flexible information related to the application         |
| `userId`    | Database ID of the user who owns the application        |
| `createdAt` | Date and time the record was created                    |
| `updatedAt` | Date and time the record was last updated               |

### Status Options

The `status` field uses predefined options rather than unrestricted text. This keeps the dashboard consistent and supports future filtering or sorting features.

The available status options are:

* Interested
* Applied
* Interviewing
* Offer
* Rejected
* Withdrawn

### Notes Field

The `notes` field remains intentionally flexible. Users can store information such as:

* Application deadlines
* Application URLs
* Salary information
* Scholarship amounts
* Contact information
* Interview notes
* Follow-up dates
* Required documents
* Next steps

## 7. User Flow

### Login and User Synchronization

1. The user visits the application.
2. The user is presented with a login screen.
3. The user logs in through Auth0.
4. Auth0 confirms the user’s identity.
5. The frontend receives an Auth0 access token.
6. The backend verifies the access token.
7. The Auth0 user is matched with or added to the PostgreSQL `users` table.

### Dashboard and CRUD Workflow

1. The dashboard requests the authenticated user’s applications.
2. The backend identifies the user through the verified Auth0 token.
3. The backend returns only applications associated with that user’s database ID.
4. The user can create, view, update, or delete their own records.
5. Changes are saved to PostgreSQL.
6. Refreshing the browser reloads the saved information from the database.

## 8. Technical Architecture

### Frontend

The frontend was built with:

* React
* Vite
* Axios
* Auth0

The frontend is responsible for:

* Displaying the login interface
* Displaying the application dashboard
* Rendering forms and application details
* Sending authenticated API requests
* Updating the interface after CRUD actions

### Backend

The backend was built with:

* Node.js
* Express
* Sequelize

The backend is responsible for:

* Verifying Auth0 access tokens
* Synchronizing authenticated users with the database
* Processing CRUD requests
* Enforcing application ownership
* Communicating with PostgreSQL

### Database

The application uses:

* PostgreSQL
* Neon

The database stores:

* User records
* Application records
* The relationship between users and their applications

### Deployment

The application is deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Neon
* **Authentication:** Auth0

## 9. Authentication and Authorization

After login, Auth0 provides the frontend with an access token.

The frontend includes the token in protected API requests through the authorization header:

```text
Authorization: Bearer tokenHere
```

The backend then:

1. Verifies that the token is valid.
2. Reads the Auth0 user identifier from the token.
3. Finds the corresponding user in the PostgreSQL `users` table.
4. Uses the user’s database ID when accessing application records.
5. Rejects requests involving records owned by another user.

## 10. Protected Route Behavior

For example, the following route retrieves the authenticated user’s applications:

```text
GET /api/applications
```

The route does not return every application stored in the database. It returns only records where the application’s `userId` matches the logged-in user’s database ID.

The same ownership requirement applies to routes for viewing, editing, and deleting individual applications:

```text
GET /api/applications/:id
PATCH /api/applications/:id
DELETE /api/applications/:id
```

Before completing any of these requests, the backend confirms that the requested application belongs to the authenticated user.

## 11. Security Requirements

### Record Ownership

Users cannot access another user’s application records by:

* Changing an application ID in the URL
* Manually editing an API request
* Changing a frontend query parameter
* Sending another user’s database ID

### Backend Enforcement

The backend does not trust frontend values such as:

```text
?userId=2
```

The current user is identified through the verified Auth0 token.

Application ownership is checked on the backend before a record is returned, edited, or deleted.

### Environment Variables

Sensitive configuration values are stored in environment variables and excluded from GitHub.

These values include:

* Database connection strings
* Auth0 domain
* Auth0 audience
* Auth0 client ID
* Backend API URLs
* Other private credentials

## 12. Deployment Configuration

### Neon

Neon hosts the PostgreSQL database and stores the user and application records.

### Render

Render hosts the Express backend API and connects to Neon through environment variables.

### Vercel

Vercel hosts the React frontend and sends authenticated requests to the deployed Render API.

### Auth0

Auth0 is configured with the deployed frontend URL in the appropriate settings, including:

* Allowed callback URLs
* Allowed logout URLs
* Allowed web origins
* CORS settings

Local development URLs can also remain configured for continued development and testing.

## 13. MVP Scope

The completed MVP focused on the central authenticated CRUD workflow.

The MVP did not include:

* Shared applications between users
* Team collaboration
* Multiple owners for one application
* Document or résumé uploads
* Automated job-board integrations
* Advanced analytics
* Email notifications
* Deadline reminders
* Complex search or reporting tools

These features were intentionally excluded so the project could prioritize authentication, ownership, data persistence, and the complete CRUD workflow.

## 14. Future Improvements

Potential future improvements include:

* A dedicated application URL field
* Application deadline fields
* Date-applied and date-opened fields
* Interview-date tracking
* Contact-person information
* Scholarship-specific fields
* Scholarship amount and eligibility tracking
* Filtering by application status
* Sorting by newest, oldest, deadline, or status
* Searching by company or role
* Deadline reminders
* Follow-up reminders
* Dashboard analytics
* Improved mobile responsiveness
* Archived applications
* Custom status options

## 15. Validated Project Outcomes

The completed application met the established MVP benchmarks:

1. Users can securely log in through Auth0.
2. Users can create new application records.
3. Saved applications remain available after refreshing the page or logging back in.
4. Users can view the details of individual applications.
5. Users can edit their existing applications.
6. Users can delete their applications.
7. Authenticated users cannot view, edit, or delete records belonging to another user.
8. The deployed Vercel frontend successfully communicates with the Render backend.
9. The Render backend successfully reads from and writes to the Neon PostgreSQL database.
10. The completed application demonstrates a full authenticated PERN CRUD workflow.

## 16. Final MVP Status

The Job Application Tracker MVP was successfully completed.

A logged-in user can perform the full application-management workflow:

```text
Login
  ↓
View Dashboard
  ↓
Create Application
  ↓
View Application
  ↓
Update Application
  ↓
Delete Application
  ↓
Persist Data in PostgreSQL
```

The final product is simple enough to demonstrate clearly while functioning as a practical and secure application-tracking tool. It demonstrates frontend development, backend API design, relational database management, authentication, authorization, deployment, and a complete PERN CRUD workflow.
