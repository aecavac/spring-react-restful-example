import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import AddDepartmentModal from './AddDepartment';
import UpdateDepartmentModal from './UpdateDepartment';

var Departments = React.createClass({

	getInitialState: function() {

		return {
			data: null,
			selectedDepartmentId: null,
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
					<Button bsStyle="warning" disabled={this.state.selectedDepartmentId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Update</Button>
					<Button bsStyle="danger" disabled={this.state.selectedDepartmentId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Delete</Button>
				</ButtonGroup>
			
				<BootstrapTable data={this.state.data} 
								striped={true} 
								hover={true} 
								//pagination={true} 
								search={true} 
								selectRow={selectRowProp}>
					<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Department ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
					<TableHeaderColumn dataField="description">Description</TableHeaderColumn>
				</BootstrapTable>
							
				<AddDepartmentModal parent={this} ref="addDepartment" />

				<UpdateDepartmentModal parent={this} ref="updateDepartment"/>
			</div>		
		);
	},
	
	// Keep selected row
	onRowSelect: function(row, isSelected) {

		if(isSelected) {
			this.setState({ selectedDepartmentId: row.id });
		}else {
			this.setState({ selectedDepartmentId: null });
		}
	},
	
	//Add modal open/close
	closeAddModal: function() {
		this.setState({ showAddModal: false });
		this.refs.addDepartment.clearAddObject();
	},

	openAddModal: function() {
		this.refs.addDepartment.clearAddObject();		
		this.setState({ showAddModal: true });
	},

	//Update modal open/close
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.updateDepartment.clearUpdateObject();
	},
	
	openUpdateModal: function() {
		this.refs.updateDepartment.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//BEGIN: Delete Department
	onDeleteBtnClicked: function() {
		
		axios.delete('http://localhost:8080/departments/' + this.state.selectedDepartmentId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});		
	},
	//END: Delete Department
	
	getDepartmentById: function(id) {

		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	},

	//Get table data and update the state to render
	refreshTable: function() {
		
		axios.get('http://localhost:8080/departments')
		.then(function (departments) {
			this.setState({data: departments.data});
		}.bind(this));
	}
});

export default Departments;