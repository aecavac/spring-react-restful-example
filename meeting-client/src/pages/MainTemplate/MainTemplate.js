import React from 'react';
import Header from '../Header';
import '../../styles/bootstrap-3.3.6/dist/css/bootstrap.min.css';
import '../../styles/bootstrap-3.3.6/dist/css/bootstrap-theme.min.css';
import '../../styles/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../styles/react-select/dist/react-select.min.css';
import '../../styles/index.css';

var MainTemplate = React.createClass({

	render: function() {
		
		const { main } = this.props;
		
		return (
			<div>
				<Header />

				<div className="container">
					{main}
				</div>				
			</div>		
		);
	}
});

export default MainTemplate;