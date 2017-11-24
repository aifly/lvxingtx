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
class ZmitiStoreApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        }
    }    
    renderContent(pageText) {
        return (
          <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
            <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
            <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  hidden: !this.state.hidden,
                });
              }}
            >
              Click to show/hide tab-bar
            </a>
            <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  fullScreen: !this.state.fullScreen,
                });
              }}
            >
              Click to switch fullscreen
            </a>
          </div>
        );
    }
    render() {

        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight}}>
                    <div className="scroller">            
                        <div className="lv-pane">
                            <div className="lv-pane-store">
                                <div className="lv-pane-store-inner">
                                   47547
                                    
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
                    key="Life"
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
                    onPress={() => {
                      this.setState({
                        selectedTab: 'blueTab',
                      });
                    }}
                    data-seed="logId"
                  >
                    {this.renderContent.bind(this,'Life')}
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
                    key="Koubei"
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'redTab',
                      });
                    }}
                    data-seed="logId1"
                  >
                    {this.renderContent.bind(this,'Koubei')}
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
                    key="Friend"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'greenTab',
                      });
                    }}
                  >
                    {this.renderContent.bind(this,'Friend')}
                  </TabBar.Item>

                  <TabBar.Item
                    icon={{ uri: './assets/images/menu-ico-4.png' }}
                    selectedIcon={{ uri: './assets/images/menu-ico-c4.png' }}
                    title="需求"
                    key="my"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'yellowTab',
                      });
                    }}
                  >
                    {this.renderContent.bind(this,'My')}
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