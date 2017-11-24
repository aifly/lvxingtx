import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import {createForm} from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Flex, Button,Picker, List, WhiteSpace } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const Item = List.Item;
class ZmitiOrderApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            selectedTab: 'yellowTab',
            hidden: false,
            fullScreen: true,
        }
    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    render() {

        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight}}>
                    <div className="scroller">            
                        <div className="lv-pane">
                            <div className="lv-pane-store">
                                <div className="lv-pane-store-inner">
                                  <img src="./assets/images/order.png"/>
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
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
                    selected={this.state.selectedTab === 'blueTab'}
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
                    selected={this.state.selectedTab === 'redTab'}
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
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={this.pagelinks.bind(this,'./#/store/')}
                  >

                  </TabBar.Item>

                  <TabBar.Item
                    icon={{ uri: './assets/images/menu-ico-4.png' }}
                    selectedIcon={{ uri: './assets/images/menu-ico-c4.png' }}
                    title="需求"
                    key="order"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={this.pagelinks.bind(this,'./#/order/')}
                  >

                  </TabBar.Item>
                </TabBar>
            </div>
        )
    }





    componentWillMount() {

    }

    componentDidMount() {
        this.scroll = new IScroll(this.refs['wrapper'],{
            scrollbars:true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });

        setTimeout(()=>{
            this.scroll.refresh();
        },1000);

    }

}

export default ZmitiPubApp(ZmitiOrderApp);