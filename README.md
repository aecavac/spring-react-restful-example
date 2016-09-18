# Spring Boot & React - Example RESTful Application
---

**Application Name:** Meeting

Meeting is an example RESTful application that uses React for client and Spring Boot as backend service. 
Demonstrates CRUD operations for Employee, Department and Meeting entities. Client and server applications are formed as separate projects.

**Client Application:** [meeting-client](meeting-client)

**Server Application:** [meeting-server](meeting-server)

**MySQL create script with initial data:** [db_meeting.sql](files/db_meeting.sql)

**MySQL Workbench project file:** [meeting.mwb](files/meeting.mwb)

**Meeting ER Diagram:**

![Meeting ER](/files/MeetingER.png?raw=true "Meeting ER")

**TODO:**
* Add Pagination(Lazy loading)
* Add Authentication & Authorization
* Add client side input validation, toast notification and loader effect
* Add RESTful fail checks both for client and server side
* May add service interfaces
* Add client tests