package tr.com.example.meeting.dao;

import org.springframework.stereotype.Repository;

import tr.com.example.meeting.domain.Employee;

/**
 * Employee DAO.
 * 
 * @author ali.cavac
 *
 */
@Repository("employeeDAO")
public class EmployeeDAO extends AbstractDao<Integer, Employee> {
 
    public Employee findById(Integer id) {
    	Employee employee = getByKey(id);
        return employee;
    }
 
    public Boolean save(Employee employee) {
		Boolean result = persist(employee);
		return result;
    }
}