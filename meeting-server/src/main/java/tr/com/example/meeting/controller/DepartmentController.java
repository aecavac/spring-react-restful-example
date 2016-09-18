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

import tr.com.example.meeting.domain.Department;
import tr.com.example.meeting.service.DepartmentService;

/**
 * Department RESTful controller for CRUD operations.
 * 
 * @author ali.cavac
 *
 */
@RestController
public class DepartmentController {
	
	@Autowired
    private DepartmentService service;

	@GetMapping("/departments")
    public ResponseEntity<List<Department>> getDepartments() {
		List<Department> departments = this.service.list();
    	return new ResponseEntity<List<Department>>(departments, HttpStatus.OK);
    }
    
    @GetMapping(value = "/departments/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable("id") Integer id) {
    	Department department = this.service.findById(id);
    	
    	if(department == null){
    		return new ResponseEntity<Department>(HttpStatus.NOT_FOUND);
    	}else{
    		return new ResponseEntity<Department>(department, HttpStatus.OK);
    	}    	
    }
    
    @PostMapping(value = "/departments")
	public ResponseEntity<Department> addDepartment(@RequestBody Department department) {
    	this.service.saveDepartment(department);
		return new ResponseEntity<Department>(department, HttpStatus.CREATED);
	}
    
    @PutMapping(value = "/departments/{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department) {
    	this.service.updateDepartment(department);
		return new ResponseEntity<Department>(department, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/departments/{id}")
	public ResponseEntity<Void> deleteDepartment(@PathVariable("id") Integer id) {
		this.service.deleteById(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}    
}