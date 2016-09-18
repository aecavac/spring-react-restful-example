package tr.com.example.meeting.dao;

import org.springframework.stereotype.Repository;

import tr.com.example.meeting.domain.Department;

/**
 * Department DAO.
 * 
 * @author ali.cavac
 *
 */
@Repository("departmentDAO")
public class DepartmentDAO extends AbstractDao<Integer, Department> {
 
    public Department findById(Integer id) {
    	Department department = getByKey(id);
        return department;
    }
 
    public Boolean save(Department department) {
		Boolean result = persist(department);
		return result;
    }
}