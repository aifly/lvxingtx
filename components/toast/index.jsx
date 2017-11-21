import React, { Component } from 'react';
import {PubCom} from '../public/pub.jsx';
import './css/index.css';
import $ from 'jquery';

class ZmitiToastApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		return (
			<div className='zmiti-toast-main-ui'>
				{this.props.toast||''}
			</div>
		);
	}


	componentDidMount() {

	}
}
export default PubCom(ZmitiToastApp);