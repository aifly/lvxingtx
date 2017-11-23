import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

import {
	Router,
	Route,
	hashHistory,
	Link,
	browserHistory
} from 'react-router';
import ZmitiHomeApp from './home/index.jsx';
import ZmitiBusApp from './bus/index.jsx';
import ZmitiCarlistApp from './car/index.jsx';


import $ from 'jquery';

class App extends React.Component {
	constructor(args) {
		super(...args);
		this.state = {}
	}
	render() {
		var apps = [{
				path: '/',
				app: ZmitiHomeApp
			}, {
				path: '/bus/(id)',
				app: ZmitiBusApp
			}, {
				path: '/car/(id)',
				app: ZmitiCarlistApp
			}

		];
		return (
			<Router history={hashHistory}>
				{apps.map((app, i) => {
					return <Route key={i} path={app.path} component={app.app}/>
				})}
			</Router>
		)
	}



	componentWillMount() {


		//window.obserable = new Obserable();


	}

	componentDidMount() {

	}
}

ReactDOM.render(<App></App>, document.getElementById('fly-main'));