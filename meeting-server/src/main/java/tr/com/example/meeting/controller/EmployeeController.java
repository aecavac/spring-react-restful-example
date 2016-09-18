package tr.com.example.meeting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tr.com.example.meeting.domain.Employee;
import tr.com.example.meeting.service.EmployeeService;

/**
 * Employee RESTful controller for CRUD operations.
 * 
 * @author ali.cavac
 *
 */
@RestController
public class EmployeeController {

	@Autowired
    private EmployeeService service;

	@GetMapping("/employees")
    public ResponseEntity<List<Employee>> employee() {
		List<Employee> employees = this.service.list();
    	return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
    }
    
    @GetMapping(value = "/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Integer id) {
    	Employee employee = this.service.findById(id);
    	if(employee == null){
    		return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
    	}else{
    		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
    	}
    }
    
    @PostMapping(value = "/employees")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
    	//TODO: check result
    	this.service.saveEmployee(employee);
		return new ResponseEntity<Employee>(employee, HttpStatus.CREATED);
	}
    
    @PutMapping(value = "/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee employee) {
    	//TODO: check result    	
    	this.service.updateEmployee(employee);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/employees/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Integer id) {
    	//TODO: check result		
		this.service.deleteById(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}