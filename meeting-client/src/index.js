import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import MainTemplate from './pages/MainTemplate';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Meetings from './pages/Meetings';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={MainTemplate}>
			<Route path="employees" components={{main: Employees}} />
			<Route path="departments" components={{main: Departments}} />
			<Route path="meetings" components={{main: Meetings}} />
		</Route>
	</Router>,
	document.getElementById('root')
);
