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
import ZmitiCarlistApp from './car/index.jsx';
import ZmitiCarcityApp from './car/city.jsx';
import ZmitiCarviewApp from './car/view.jsx';
import ZmitiStoreApp from './store/index.jsx';
import ZmitiStoreChargingApp from './store/charging.jsx';
import ZmitiOrderApp from './order/index.jsx';
import ZmitiCarorderApp from './car/order.jsx';
import ZmitiAboutApp from './about/index.jsx';
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
				path: '/carorder/(:id)',
				app: ZmitiCarorderApp
			}, {
				path: '/car/(:id)/(:city)',
				app: ZmitiCarlistApp
			}, {
				path: '/carcity/(:id)/(:city)',
				app: ZmitiCarcityApp
			}, {
				path: '/carview/(:id)',
				app: ZmitiCarviewApp
			}, {
				path: '/store/(:id)',
				app: ZmitiStoreApp
			}, {
				path: '/order',
				app: ZmitiOrderApp
			}, {
				path: '/about',
				app: ZmitiAboutApp
			},{
				path:'storecharging/(:id)',
				app: ZmitiStoreChargingApp
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