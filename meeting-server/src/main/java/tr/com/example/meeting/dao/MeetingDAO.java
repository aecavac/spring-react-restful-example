package tr.com.example.meeting.dao;

import org.springframework.stereotype.Repository;

import tr.com.example.meeting.domain.Meeting;
 
/**
 * Meeting DAO.
 * 
 * @author ali.cavac
 *
 */
@Repository("meetingDAO")
public class MeetingDAO extends AbstractDao<Integer, Meeting> {
 
    public Meeting findById(Integer id) {
    	Meeting meeting = getByKey(id);
        return meeting;
    }
 
    public Boolean save(Meeting meeting) {
		Boolean result = persist(meeting);
		return result;
    }
}