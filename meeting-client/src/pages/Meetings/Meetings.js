import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import AddMeetingModal from './AddMeeting';
import UpdateMeetingModal from './UpdateMeeting';

var Meetings = React.createClass({

	getInitialState: function() {

		return {
			data: null,
			departments: null,
			selectedMeetingId: null,
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
					<Button bsStyle="warning" disabled={this.state.selectedMeetingId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Update</Button>
					<Button bsStyle="danger" disabled={this.state.selectedMeetingId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Delete</Button>
				</ButtonGroup>
			
				<BootstrapTable data={this.state.data} 
								striped={true} 
								hover={true} 
								//pagination={true} 
								search={true} 
								selectRow={selectRowProp}>
					<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Meeting ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
					<TableHeaderColumn dataField="description">Description</TableHeaderColumn>
				</BootstrapTable>
							
				<AddMeetingModal parent={this} ref="addMeeting" />

				<UpdateMeetingModal parent={this} ref="updateMeeting"/>
			</div>		
		);
	},
	
	// Keep selected row
	onRowSelect: function(row, isSelected) {
		if(isSelected) {
			this.setState({ selectedMeetingId: row.id });
		}else {
			this.setState({ selectedMeetingId: null });
		}
	},
	
	// Department list for Select component
	getDepartmentOptions: function(departments) {
		var options = [];
		
		if(!departments) {
			return options;
		}

		options = departments.map(function(obj){ 
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
		this.refs.addMeeting.clearAddObject();
	},

	openAddModal: function() {
		this.refs.addMeeting.clearAddObject();		
		this.setState({ showAddModal: true });
	},

	//Update modal open/close
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.updateMeeting.clearUpdateObject();
	},

	openUpdateModal: function() {
		this.refs.updateMeeting.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//BEGIN: Delete Meeting
	onDeleteBtnClicked: function() {
		
		axios.delete('http://localhost:8080/meetings/' + this.state.selectedMeetingId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});		
	},
	//END: Delete Meeting
	
	getMeetingById: function(id) {
		
		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	},


	getMeetings: function() {
	  return axios.get('http://localhost:8080/meetings');
	},

	getDepartments: function() {
	  return axios.get('http://localhost:8080/departments');
	},
	
	//Get table data and update the state to render
	refreshTable: function() {
		
		axios.all([this.getMeetings(), this.getDepartments()])
		.then(axios.spread(function (meetings, departments) {
			this.setState({data: meetings.data,
							departments: departments.data});
		}.bind(this)));
	}
});

export default Meetings;