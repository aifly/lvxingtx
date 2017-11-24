import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import {createForm} from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Flex, Button,Picker, List, WhiteSpace,Drawer,NavBar, Icon } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const Item = List.Item;
class ZmitiStoreApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            dataLeftMenu:[
              '石家庄',
              '武汉',
              '南京',
              '成都',
              '贵阳',
              '广州',
              '海口',
              '长沙',
              '太原',
            ],
            open: true,//默认关闭左侧菜单
            selectedTab: 'greenTab',
            hidden: false,
            fullScreen: true,
        }
        this.onOpenChange = (...args) => {
          console.log(args);
          this.setState({ open: !this.state.open });
        }
    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    render() {
        const sidebar = (<List>
          {this.state.dataLeftMenu.map((item, index) => {
            return (<List.Item key={index}
            >{item}</List.Item>);
          })}
        </List>);
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight}}>
                    <div className="scroller">            
                        <div className="lv-pane">
                            <div className="lv-pane-store">
                                <div className="lv-pane-store-inner">
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        Click upper-left corner
      </Drawer>
                                    
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

export default ZmitiPubApp(ZmitiStoreApp);