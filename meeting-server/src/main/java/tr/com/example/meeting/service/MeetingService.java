package tr.com.example.meeting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tr.com.example.meeting.dao.MeetingDAO;
import tr.com.example.meeting.domain.Meeting;
 
/**
 * Meeting service.
 * 
 * @author ali.cavac
 *
 */
@Transactional
@Service("meetingService")
public class MeetingService {
 
    @Autowired
    private MeetingDAO dao;
 
    public List<Meeting> list() {
        return dao.list();
    }    
    
    public Meeting findById(Integer id) {
        return dao.findById(id);
    }
 
    public Boolean saveMeeting(Meeting meeting) {
        Boolean result = dao.save(meeting);
        return result;
    }
 
    public Boolean updateMeeting(Meeting meeting) {
    	Meeting entity = dao.findById(meeting.getId());
        if(entity != null){
        	entity.setName(meeting.getName());
        	entity.setDescription(meeting.getDescription());
        	entity.setDepartments(meeting.getDepartments());
        	dao.update(entity);
        	return true;
        }else{
        	return false;
        }
    }
    
    public Boolean deleteById(Integer id) {
    	Meeting entity = dao.findById(id);
        if(entity != null){
        	dao.delete(entity);
        	return true;
        }else{
        	return false;
        }
    }
}