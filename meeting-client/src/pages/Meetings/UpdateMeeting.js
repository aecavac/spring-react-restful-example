import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var UpdateMeeting = React.createClass({

	getInitialState: function() {

		return {
			updateObject: {
				id: '', 
				name: '', 
				description: '',
				departments: ''
			}
		}
    },

	render: function() {
		
		if(this.props.parent.state.showUpdateModal === false){
			return (<div></div>);
		}

		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Update Meeting</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Meeting name</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter name"
								value={this.state.updateObject.name}
								onChange={this.onUpdateMeetingNameChange} />
							<br />
							
							<ControlLabel>Meeting description</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter description"
								value={this.state.updateObject.description}
								onChange={this.onUpdateMeetingDescriptionChange} />
							<br />
							
							<ControlLabel>Departments</ControlLabel>
							<Select
								name="departmentsField"
								multi={true}
								value={this.props.parent.getDepartmentOptions(this.state.updateObject.departments)}
								options={this.props.parent.getDepartmentOptions(this.props.parent.state.departments)}
								onChange={this.onUpdateMeetingDepartmentChange} />							
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

    	var selectedMeeting = this.props.parent.getMeetingById(this.props.parent.state.selectedMeetingId);

		this.state.updateObject = {
			id: selectedMeeting.id, 
			name: selectedMeeting.name, 
			description: selectedMeeting.description,
			departments: selectedMeeting.departments,
		}
	},

	clearUpdateObject: function() {
		
		this.state.updateObject.id = '';
		this.state.updateObject.name = '';
		this.state.updateObject.description = '';
		this.state.updateObject.departments = '';
	},

	//Input changes
	onUpdateMeetingNameChange: function(event) {
		this.state.updateObject.name = event.target.value;
		this.forceUpdate();
	},

	onUpdateMeetingDescriptionChange: function(event) {
		this.state.updateObject.description = event.target.value;
		this.forceUpdate();
	},

	onUpdateMeetingDepartmentChange: function(selection) {

		if (selection === null) {
			this.state.updateObject.departments = null;
		} else {
			var departments = selection.map(function(obj){ 
				var rObj = {};
				rObj['id'] = obj['value'];
				rObj['name'] = obj['label'];
				return rObj;
			});
			
			this.state.updateObject.departments = departments;
		}

		this.forceUpdate();		
	},	

	onUpdateBtnClicked: function() {
		
		//Update Meeting
		axios.put('http://localhost:8080/meetings/' + this.state.updateObject.id, this.state.updateObject)
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

export default UpdateMeeting;