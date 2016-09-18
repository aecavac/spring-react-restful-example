import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
	render: function() {
		
		return (
			<div className="header">
				<p className="header-info">
					Meeting React App
				</p>
				<div className="menu">
					<Link to="/employees" className="menu-link-item" activeClassName="active">Employees</Link>
					<Link to="/departments" className="menu-link-item" activeClassName="active">Departments</Link>
					<Link to="/meetings" className="menu-link-item" activeClassName="active">Meetings</Link>
				</div>
			</div>

		);
	}
});

export default Header;