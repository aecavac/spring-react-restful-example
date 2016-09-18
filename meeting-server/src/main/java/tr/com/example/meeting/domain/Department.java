package tr.com.example.meeting.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * Department Entity.
 * 
 * @author ali.cavac
 *
 */
@Entity
@Table(name = "DEPARTMENT")
//@JsonIdentityInfo(
//		  generator = ObjectIdGenerators.PropertyGenerator.class, 
//		  property = "id", scope = Department.class)
public class Department implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="DEPARTMENT_ID", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Integer id;
	
	@NotEmpty
    @Column(name="NAME", nullable=false)
	private String name;
	
    @Column(name="DESCRIPTION")
	private String description;
	
    @OneToMany(/*cascade=CascadeType.ALL, */mappedBy = "departmentId", fetch = FetchType.EAGER)
//    @Fetch(value = FetchMode.SUBSELECT)
    @Fetch(value = FetchMode.SELECT)    
	private List<Employee> employees;
	
//    @JsonBackReference
//    @ManyToMany(/*cascade=CascadeType.ALL, */fetch = FetchType.LAZY)
//    @Fetch(value = FetchMode.SUBSELECT)
//    @JoinTable(name = "DEPARTMENT_MEETING", joinColumns = { @JoinColumn(name = "DEPARTMENT_ID") }, inverseJoinColumns = { @JoinColumn(name = "MEETING_ID") })    
//	private List<Meeting> meetings;	

    public Department() {}
    
	public Department(Integer id, String name, String description) {
		this.id = id;
		this.name = name;
		this.description = description;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}
	
//	public List<Meeting> getMeetings() {
//		return meetings;
//	}
//
//	public void setMeetings(List<Meeting> meetings) {
//		this.meetings = meetings;
//	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((employees == null) ? 0 : employees.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Department other = (Department) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (employees == null) {
			if (other.employees != null)
				return false;
		} else if (!employees.equals(other.employees))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
}