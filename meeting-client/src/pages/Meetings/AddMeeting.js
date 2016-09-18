import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AddMeeting = React.createClass({

	getInitialState: function() {
		
		return {
			addObject: {
				id: '', 
				name: '', 
				description: '',
				departments: ''
			}
		}
    },
	
	render: function() {

		if(this.props.parent.state.showAddModal === false){
			return (<div></div>);
		}	
	
		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Add Meeting</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Meeting name</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter name"
								value={this.state.addObject.name}
								onChange={this.onAddMeetingNameChange} />
							<br />
							
							<ControlLabel>Meeting description</ControlLabel>
							<FormControl
								type="text"
								placeholder="Enter description"
								value={this.state.addObject.description}
								onChange={this.onAddMeetingDescriptionChange} />
							<br />
							
							<ControlLabel>Departments</ControlLabel>
							<Select
								name="departmentsField"
								multi={true}
								value={this.props.parent.getDepartmentOptions(this.state.addObject.departments)}
								options={this.props.parent.getDepartmentOptions(this.props.parent.state.departments)}
								onChange={this.onAddMeetingDepartmentChange} />								
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
		this.state.addObject.description = '';
	},

	//Input changes
	onAddMeetingNameChange: function(event) {
		this.state.addObject.name = event.target.value;
		this.forceUpdate();
	},

	onAddMeetingDescriptionChange: function(event) {
		this.state.addObject.description = event.target.value;
		this.forceUpdate();
	},

	onAddMeetingDepartmentChange: function(selection) {

		if (selection === null) {
			this.state.updateObject.departments = null;
		} else {
			var departments = selection.map(function(obj){ 
				var rObj = {};
				rObj['id'] = obj['value'];
				rObj['name'] = obj['label'];
				return rObj;
			});
			
			this.state.addObject.departments = departments;
		}
		
		this.forceUpdate();		
	},

	onAddBtnClicked: function() {

		//Save meeting
		axios.post('http://localhost:8080/meetings/', this.state.addObject)
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

export default AddMeeting;