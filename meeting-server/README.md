## Server Application

**Techs:** Spring Boot as RESTful backend, Maven, Hibernate, MySQL
	
**RESTful API Address:** http://localhost:8080

**Employee endpoints**
 * HTTP GET 	: "localhost:8080/employees" getting all employees.
 * HTTP GET 	: "localhost:8080/employees/{id}" get an employee by id.
 * HTTP POST	: "localhost:8080/employees" create a new employee.
 * HTTP PUT 	: "localhost:8080/employees/{id}" update an existing employee.
 * HTTP DELETE : "localhost:8080/employees/{id}" delete an employee by id.

_Department and Meeting endpoints are similar to Employee endpoints._

**Configuration Files**

`WebConfiguration.java` : CORS methods("GET", "POST", "PUT", "DELETE") allowed for development.

`HibernateConfiguration.java` : Hibernate configurations

**Maven Run Configurations**

`clean spring-boot:run`: clean and run Spring Boot application

`clean test`: clean and run tests