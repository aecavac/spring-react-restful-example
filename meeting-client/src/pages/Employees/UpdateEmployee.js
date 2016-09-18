import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var UpdateEmployee = React.createClass({

	getInitialState: function() {

		return {
			updateObject: {
				id: '', 
				name: '', 
				surname: '', 
				salary: '', 
				departmentId: ''
			}
		}
    },

    shouldComponentUpdate: function() {
    	//console.log('EU:shouldComponentUpdate');
    	//return this.props.parent.state.showUpdateModal;
    	return true;
    },

	render: function() {
		
		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Update Employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Employee name</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter name"
								value={this.state.updateObject.name}
								onChange={this.onUpdateEmployeeNameChange} />
							<br />
							
							<ControlLabel>Employee surname</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter surname"
								value={this.state.updateObject.surname}
								onChange={this.onUpdateEmployeeSurnameChange} />
							<br />
							
							<ControlLabel>Employee salary</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter salary"
								value={this.state.updateObject.salary}
								onChange={this.onUpdateEmployeeSalaryChange} />
							<br />
							
							<ControlLabel>Employee department</ControlLabel>
							<Select
								name="departmentsField"
								value={this.state.updateObject.departmentId}
								options={this.props.parent.getDepartmentOptions()}
								onChange={this.onUpdateEmployeeDepartmentChange} />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeUpdateModal}>Close</Button>
					<Button bsStyle="primary" onClick={this.onUpdateBtnClicked}>Update</Button>						
				</Modal.Footer>
			</Modal>
		);
	},

	fillUpdateObject: function() {

    	var selectedEmployee = this.props.parent.getEmployeeById(this.props.parent.state.selectedEmployeeId);

		this.state.updateObject = {
			id: selectedEmployee.id, 
			name: selectedEmployee.name, 
			surname: selectedEmployee.surname, 
			salary: selectedEmployee.salary, 
			departmentId: selectedEmployee.departmentId
		}
	},

	clearUpdateObject: function() {

		this.state.updateObject.id = '';
		this.state.updateObject.name = '';
		this.state.updateObject.surname = '';
		this.state.updateObject.salary = '';
		this.state.updateObject.departmentId = '';
	},

	//Input changes
	onUpdateEmployeeNameChange: function(event) {
		this.state.updateObject.name = event.target.value;
		this.forceUpdate();
	},

	onUpdateEmployeeSurnameChange: function(event) {
		this.state.updateObject.surname = event.target.value;
		this.forceUpdate();
	},

	onUpdateEmployeeSalaryChange: function(event) {
		this.state.updateObject.salary = event.target.value;
		this.forceUpdate();		
	},

	onUpdateEmployeeDepartmentChange: function(selection) {

		if(selection === null) {
			this.state.updateObject.departmentId = null;
		}else {
			this.state.updateObject.departmentId = selection.value;
		}
		
		this.forceUpdate();		
	},
			
	onUpdateBtnClicked: function() {
		
		//Update employee
		axios.put('http://localhost:8080/employees/' + this.state.updateObject.id, this.state.updateObject)
			.then(function (response) {
				this.props.parent.closeUpdateModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default UpdateEmployee;