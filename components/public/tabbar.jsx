import 'antd-mobile/dist/antd-mobile.css';
import React, {	Component} from 'react';
import {
	Router,
	Route,
	hashHistory,
	Link,
	browserHistory
} from 'react-router';
import {TabBar,Flex, Button,Picker, List, WhiteSpace } from 'antd-mobile';
export default class Zmitimenubar extends Component {
	constructor(props) {
		super(props);

		this.state = {
		    hidden: false,
		    fullScreen: false,
		};
	}


	componentWillMount() {

	}

    pagelinks(pageText) {
        window.location=pageText;
        //console.log(pageText,'pageText');
    }
	render() {

		return (
				<div>

	                <TabBar
	                  unselectedTintColor="#949494"
	                  tintColor="#22ac38"
	                  barTintColor="white"
	                  hidden={this.state.hidden}
	                >
	                  <TabBar.Item
	                    title="首页"
	                    key="home"
	                    icon={<div style={{
	                      width: '22px',
	                      height: '22px',
	                      background: 'url(./assets/images/menu-ico-1.png) center center /  21px 21px no-repeat' }}
	                    />
	                    }
	                    selectedIcon={<div style={{
	                      width: '22px',
	                      height: '22px',
	                      background: 'url(./assets/images/menu-ico-c1.png) center center /  21px 21px no-repeat' }}
	                    />
	                    }
	                    selected={this.props.selectedTab === 'blueTab'}
	                    onPress={this.pagelinks.bind(this,'./#/')}
	                    data-seed="logId"
	                  >

	                  </TabBar.Item>

	                  <TabBar.Item
	                    icon={
	                      <div style={{
	                        width: '22px',
	                        height: '22px',
	                        background: 'url(./assets/images/menu-ico-2.png) center center /  21px 21px no-repeat' }}
	                      />
	                    }
	                    selectedIcon={
	                      <div style={{
	                        width: '22px',
	                        height: '22px',
	                        background: 'url(./assets/images/menu-ico-c2.png) center center /  21px 21px no-repeat' }}
	                      />
	                    }
	                    title="车源"
	                    key="car"
	                    selected={this.props.selectedTab === 'redTab'}
	                    onPress={this.pagelinks.bind(this,'./#/car/')}
	                    data-seed="logId1"
	                  >

	                  </TabBar.Item>

	                  <TabBar.Item
	                    icon={
	                      <div style={{
	                        width: '22px',
	                        height: '22px',
	                        background: 'url(./assets/images/menu-ico-3.png) center center /  21px 21px no-repeat' }}
	                      />
	                    }
	                    selectedIcon={
	                      <div style={{
	                        width: '22px',
	                        height: '22px',
	                        background: 'url(./assets/images/menu-ico-c3.png) center center /  21px 21px no-repeat' }}
	                      />
	                    }
	                    title="门店"
	                    key="store"
	                    selected={this.props.selectedTab === 'greenTab'}
	                    onPress={this.pagelinks.bind(this,'./#/store/')}
	                  >

	                  </TabBar.Item>

	                  <TabBar.Item
	                    icon={{ uri: './assets/images/menu-ico-4.png' }}
	                    selectedIcon={{ uri: './assets/images/menu-ico-c4.png' }}
	                    title="需求"
	                    key="order"
	                    selected={this.props.selectedTab === 'yellowTab'}
	                    onPress={this.pagelinks.bind(this,'./#/order/')}
	                  >

	                  </TabBar.Item>
	                </TabBar>
               </div>
		);
	}
}
Zmitimenubar.defaultProps = {
    selectedTab: 'redTab',
}