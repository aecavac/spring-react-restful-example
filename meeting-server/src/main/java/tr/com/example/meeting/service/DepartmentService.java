package tr.com.example.meeting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tr.com.example.meeting.dao.DepartmentDAO;
import tr.com.example.meeting.domain.Department;
 
/**
 * Department service.
 * 
 * @author ali.cavac
 *
 */
@Transactional
@Service("departmentService")
public class DepartmentService {
 
    @Autowired
    private DepartmentDAO dao;
 
    public List<Department> list() {
        return dao.list();
    }    
    
    public Department findById(Integer id) {
        return dao.findById(id);
    }
 
    public Boolean saveDepartment(Department department) {
        Boolean result = dao.save(department);
        return result;
    }
 
    public Boolean updateDepartment(Department department) {
    	Department entity = dao.findById(department.getId());
        if(entity != null){
        	entity.setName(department.getName());
        	entity.setDescription(department.getDescription());
        	entity.setEmployees(department.getEmployees());
//        	entity.setMeetings(department.getMeetings());
        	dao.update(entity);
        	return true;
        }else{
        	return false;
        }
    }
    
    public Boolean deleteById(Integer id) {
    	Department entity = dao.findById(id);
        if(entity != null){
        	dao.delete(entity);
        	return true;
        }else{
        	return false;
        }
    }
}