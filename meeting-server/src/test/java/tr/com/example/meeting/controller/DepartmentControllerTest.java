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
import tr.com.example.meeting.service.DepartmentService;

/**
 * Tests for DepartmentController RESTful endpoints.
 * 
 * @author ali.cavac
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class DepartmentControllerTest {

	private MockMvc mockMvc;
	
    @Mock
    private DepartmentService departmentService;
    
    @InjectMocks
    private DepartmentController departmentController;    

    @Before
    public void setup() {
    	MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(departmentController)
                .build();
    }
    
    @Test
    public void test_get_all_success() throws Exception {
        List<Department> departments = Arrays.asList(
        		new Department(1, "Engineering", "Engineering Department"),
        		new Department(2, "Design", "Design Department"));
        
        when(departmentService.list()).thenReturn(departments);
        
        mockMvc.perform(get("/departments"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Engineering")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Design")));
        
        verify(departmentService, times(1)).list();
        verifyNoMoreInteractions(departmentService);
    }
    
    @Test
    public void test_get_by_id_success() throws Exception {
    	Department department = new Department(1, "Design", "Design Department");
        when(departmentService.findById(1)).thenReturn(department);
        
        mockMvc.perform(get("/departments/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Design")));
        
        verify(departmentService, times(1)).findById(1);
        verifyNoMoreInteractions(departmentService);
    }
    
    @Test
    public void test_get_by_id_fail_404_not_found() throws Exception {
        when(departmentService.findById(1)).thenReturn(null);
        
        mockMvc.perform(get("/departments/{id}", 1))
                .andExpect(status().isNotFound());
        
        verify(departmentService, times(1)).findById(1);
        verifyNoMoreInteractions(departmentService);
    }
    
    @Test
    public void test_create_success() throws Exception {
    	Department department = new Department(2, "Design", "Design Department");
        when(departmentService.saveDepartment(department)).thenReturn(Boolean.TRUE);
        
        mockMvc.perform(post("/departments")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(asJsonString(department)))
            		.andExpect(status().isCreated());
        
        verify(departmentService, times(1)).saveDepartment(department);
        verifyNoMoreInteractions(departmentService);
    }
    
    @Test
    public void test_update_success() throws Exception {
    	Department department = new Department(2, "Design", "Design Department");
        when(departmentService.updateDepartment(department)).thenReturn(Boolean.TRUE);
        
        mockMvc.perform(
                put("/departments/{id}", department.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(asJsonString(department)))
                	.andExpect(status().isOk());
        
        verify(departmentService, times(1)).updateDepartment(department);
        verifyNoMoreInteractions(departmentService);
    }
    
    @Test
    public void test_delete_success() throws Exception {
    	Department department = new Department(1, "Design", "Design Department");
        when(departmentService.deleteById(department.getId())).thenReturn(Boolean.TRUE);
        
        mockMvc.perform(
                delete("/departments/{id}", department.getId()))
                .andExpect(status().isNoContent());
        
        verify(departmentService, times(1)).deleteById(department.getId());
        verifyNoMoreInteractions(departmentService);
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
