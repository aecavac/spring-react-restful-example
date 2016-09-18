package tr.com.example.meeting.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import tr.com.example.meeting.domain.Department;
import tr.com.example.meeting.domain.Meeting;
import tr.com.example.meeting.service.MeetingService;

/**
 * Tests for MeetingController RESTful endpoints.
 * 
 * @author ali.cavac
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class MeetingControllerTest {

	private MockMvc mockMvc;
	
    @Mock
    private MeetingService meetingService;
    
    @InjectMocks
    private MeetingController meetingController;    

    @Before
    public void setup() {
    	MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(meetingController)
                .build();
    }
    
    @Test
    public void test_get_all_success() throws Exception {
        List<Department> departments = Arrays.asList(
        		new Department(1, "Engineering", "Engineering Department"),
        		new Department(2, "Design", "Design Department"));
    	
        List<Meeting> meetings = Arrays.asList(
        		new Meeting(1, "Revision", "Weekly Revision", departments),
        		new Meeting(2, "Scrum", "Scrum Meeting", departments));
        
        when(meetingService.list()).thenReturn(meetings);
        
        mockMvc.perform(get("/meetings"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Revision")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Scrum")));
        
        verify(meetingService, times(1)).list();
        verifyNoMoreInteractions(meetingService);
    }
    
    @Test
    public void test_get_by_id_success() throws Exception {
        List<Department> departments = Arrays.asList(
        		new Department(1, "Engineering", "Engineering Department"),
        		new Department(2, "Design", "Design Department"));
    	Meeting meeting = new Meeting(1, "Revision", "Weekly Revision", departments);
    	
        when(meetingService.findById(1)).thenReturn(meeting);
        
        mockMvc.perform(get("/meetings/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Revision")));
        
        verify(meetingService, times(1)).findById(1);
        verifyNoMoreInteractions(meetingService);
    }
    
    @Test
    public void test_get_by_id_fail_404_not_found() throws Exception {
        when(meetingService.findById(1)).thenReturn(null);
        
        mockMvc.perform(get("/meetings/{id}", 1))
                .andExpect(status().isNotFound());
        
        verify(meetingService, times(1)).findById(1);
        verifyNoMoreInteractions(meetingService);
    }
    
    @Test
    public void test_create_success() throws Exception {
        List<Department> departments = Arrays.asList(
        		new Department(1, "Engineering", "Engineering Department"),
        		new Department(2, "Design", "Design Department"));
    	Meeting meeting = new Meeting(1, "Revision", "Weekly Revision", departments);
    	
        when(meetingService.saveMeeting(meeting)).thenReturn(Boolean.TRUE);
        
        mockMvc.perform(post("/meetings")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(asJsonString(meeting)))
            		.andExpect(status().isCreated());
        
        verify(meetingService, times(1)).saveMeeting(meeting);
        verifyNoMoreInteractions(meetingService);
    }
    
    @Test
    public void test_update_success() throws Exception {
        List<Department> departments = Arrays.asList(
        		new Department(1, "Engineering", "Engineering Department"),
        		new Department(2, "Design", "Design Department"));
    	Meeting meeting = new Meeting(1, "Revision", "Weekly Revision", departments);
    	
        when(meetingService.updateMeeting(meeting)).thenReturn(Boolean.TRUE);
        
        mockMvc.perform(
                put("/meetings/{id}", meeting.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(asJsonString(meeting)))
                	.andExpect(status().isOk());
        
        verify(meetingService, times(1)).updateMeeting(meeting);
        verifyNoMoreInteractions(meetingService);
    }
    
    @Test
    public void test_delete_success() throws Exception {
        List<Department> departments = Arrays.asList(
        		new Department(1, "Engineering", "Engineering Department"),
        		new Department(2, "Design", "Design Department"));
    	Meeting meeting = new Meeting(1, "Revision", "Weekly Revision", departments);
    	
        when(meetingService.deleteById(meeting.getId())).thenReturn(Boolean.TRUE);
        
        mockMvc.perform(
                delete("/meetings/{id}", meeting.getId()))
                .andExpect(status().isNoContent());
        
        verify(meetingService, times(1)).deleteById(meeting.getId());
        verifyNoMoreInteractions(meetingService);
    }    
    
    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }    
}
