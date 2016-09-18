package tr.com.example.meeting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tr.com.example.meeting.dao.EmployeeDAO;
import tr.com.example.meeting.domain.Employee;

/**
 * Employee service.
 * 
 * @author ali.cavac
 *
 */
@Transactional
@Service("employeeService")
public class EmployeeService {
 
    @Autowired
    private EmployeeDAO dao;
 
    public List<Employee> list() {
        return dao.list();
    }
    
    public Employee findById(Integer id) {
        return dao.findById(id);
    }
 
    public Boolean saveEmployee(Employee employee) {
        Boolean result = dao.save(employee);
        return result;
    }
 
    public Boolean updateEmployee(Employee employee) {
    	Employee entity = dao.findById(employee.getId());
        if(entity != null){
            entity.setName(employee.getName());
            entity.setSurname(employee.getSurname());
            entity.setSalary(employee.getSalary());
            entity.setDepartmentId(employee.getDepartmentId());
            dao.update(entity);
            return true;
        }else{
        	return false;
        }
    }
    
    public Boolean deleteById(Integer id) {
    	Employee entity = dao.findById(id);
        if(entity != null){
        	dao.delete(entity);
        	return true;
        }else{
        	return false;
        }    	
    }
}