import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AddEmployee = React.createClass({

	getInitialState: function() {

		return {
			addObject: {
				id: '', 
				name: '', 
				surname: '', 
				salary: '', 
				departmentId: ''
			}
		}
    },

	render: function() {

		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Add Employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Employee name</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter name"
								value={this.state.addObject.name}
								onChange={this.onAddEmployeeNameChange} />
							<br />
							
							<ControlLabel>Employee surname</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter surname"
								value={this.state.addObject.surname}
								onChange={this.onAddEmployeeSurnameChange} />
							<br />
							
							<ControlLabel>Employee salary</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter salary"
								value={this.state.addObject.salary}
								onChange={this.onAddEmployeeSalaryChange} />
							<br />
							
							<ControlLabel>Employee department</ControlLabel>
							<Select
								name="departmentsField"
								value={this.state.addObject.departmentId}
								options={this.props.parent.getDepartmentOptions()}
								onChange={this.onAddEmployeeDepartmentChange} />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeAddModal}>Close</Button>
					<Button bsStyle="primary" onClick={this.onAddBtnClicked}>Add</Button>						
				</Modal.Footer>				
			</Modal>
		);
	},

	clearAddObject: function() {
		
		this.state.addObject.id = '';
		this.state.addObject.name = '';
		this.state.addObject.surname = '';
		this.state.addObject.salary = '';
		this.state.addObject.departmentId = '';
	},

	//Input changes
	onAddEmployeeNameChange: function(event) {
		this.state.addObject.name = event.target.value;
		this.forceUpdate();
	},

	onAddEmployeeSurnameChange: function(event) {
		this.state.addObject.surname = event.target.value;
		this.forceUpdate();
	},

	onAddEmployeeSalaryChange: function(event) {
		this.state.addObject.salary = event.target.value;
		this.forceUpdate();
	},

	onAddEmployeeDepartmentChange: function(selection) {

		if(selection === null) {
			this.state.addObject.departmentId = null;
		}else {		
			this.state.addObject.departmentId = selection.value;
		}

		this.forceUpdate();
	},
	
	onAddBtnClicked: function() {

		//Save employee
		axios.post('http://localhost:8080/employees/', this.state.addObject)
			.then(function (response) {
				this.props.parent.closeAddModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default AddEmployee;