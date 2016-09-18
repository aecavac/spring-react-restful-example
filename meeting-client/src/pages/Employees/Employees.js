import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import AddEmployeeModal from './AddEmployee';
import UpdateEmployeeModal from './UpdateEmployee';

var Employees = React.createClass({

	getInitialState: function() {
		
		return {
			data: null,
			departments: null,
			selectedEmployeeId: null,
			showAddModal: false,
			showUpdateModal: false
		}
    },
	
	componentDidMount: function() {
		this.refreshTable();
	},
	
	render: function() {

		var selectRowProp = {
			mode: "radio",
			clickToSelect: true,
			className: "selected-row",
			bgColor: 'rgb(101, 148, 255)',			
			onSelect: this.onRowSelect
		};		
		
		if(!this.state.data){
			return (<div></div>);
		}
		
		return (
			<div>
				<ButtonGroup className="m-10">
					<Button bsStyle="primary" onClick={this.openAddModal}><Glyphicon glyph="plus" />Add</Button>
					<Button bsStyle="warning" disabled={this.state.selectedEmployeeId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Update</Button>
					<Button bsStyle="danger" disabled={this.state.selectedEmployeeId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Delete</Button>
				</ButtonGroup>
			
				<BootstrapTable data={this.state.data} 
								striped={true} 
								hover={true} 
								//pagination={true} 
								search={true} 
								selectRow={selectRowProp}>
					<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Employee ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name" dataSort={true}>First Name</TableHeaderColumn>
					<TableHeaderColumn dataField="surname">Last Name</TableHeaderColumn>
					<TableHeaderColumn dataField="salary" dataFormat={this.priceFormatter}>Salary</TableHeaderColumn>
					<TableHeaderColumn dataField="departmentId" dataFormat={this.departmentFormatter}>Depertment</TableHeaderColumn>
				</BootstrapTable>
							
				<AddEmployeeModal parent={this} ref="addEmployee" />

				<UpdateEmployeeModal parent={this} ref="updateEmployee"/>
			</div>		
		);
	},
	
	// Keep selected row
	onRowSelect: function(row, isSelected) {
		if(isSelected) {
			this.setState({ selectedEmployeeId: row.id });
		}else {
			this.setState({ selectedEmployeeId: null });
		}
	},
	
	// Department list for Select component
	getDepartmentOptions: function() {
		var options = [];

		options = this.state.departments.map(function(obj){ 
			var rObj = {};
			rObj['value'] = obj['id'];
			rObj['label'] = obj['name'];
			return rObj;
		});

		return options;		
	},	
	
	//Add modal open/close
	closeAddModal: function() {
		this.setState({ showAddModal: false });
		this.refs.addEmployee.clearAddObject();
	},
	openAddModal: function() {
		this.refs.addEmployee.clearAddObject();		
		this.setState({ showAddModal: true });
	},

	//Update modal open/close
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.updateEmployee.clearUpdateObject();
	},
	openUpdateModal: function() {
		this.refs.updateEmployee.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//BEGIN: Delete Employee
	onDeleteBtnClicked: function() {
		
		axios.delete('http://localhost:8080/employees/' + this.state.selectedEmployeeId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});		
	},
	//END: Delete Employee
	
	priceFormatter: function(cell, row){
		return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
	},
	
	departmentFormatter: function(cell, row) {
		return this.getDepartmentName(row.departmentId);
	},
	
	getDepartmentName: function(departmentId) {

		for(var i in this.state.departments) {
			if(this.state.departments[i].id === departmentId) {
				return this.state.departments[i].name;
			}
		}
		return '';
	},

	getEmployeeById: function(id) {
		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	},

	getEmployees: function() {
	  return axios.get('http://localhost:8080/employees');
	},

	getDepartments: function() {
	  return axios.get('http://localhost:8080/departments');
	},
	
	//Get table data and update the state to render
	refreshTable: function() {
		
		axios.all([this.getEmployees(), this.getDepartments()])
		.then(axios.spread(function (employees, departments) {
			this.setState({data: employees.data,
							departments: departments.data});
		}.bind(this)));
	}
});

export default Employees;