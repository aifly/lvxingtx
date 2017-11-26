import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import createForm from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Flex, InputItem,Switch, Stepper,TextareaItem, Range,NavBar, Icon,Button,Picker, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
class ZmitiOrderApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            username:'',
            usermobile:'',
            content: '',
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
                            <div className="lv-pane-order">
                                <div className="lv-pane-order-inner">
                                  <NavBar
                                    mode="light"
                                  >用车需求提交</NavBar>
                                  <div className="hr10"></div>

                                  <form>
                                    <List>
                                      <InputItem                                        
                                        onChange={(value)=>{this.state.username=value;this.forceUpdate();}}
                                        value={this.state.username}                                       
                                        placeholder="请输入您的姓名"
                                      >您的姓名</InputItem>
                                      <InputItem 
                                        onChange={(value)=>{this.state.usermobile=value;this.forceUpdate();}}
                                        value={this.state.usermobile}
                                        placeholder="请输入您的电话"
                                      >
                                        您的电话
                                      </InputItem>
                                      <InputItem placeholder="请输入">
                                        需求车型
                                      </InputItem>
                                      <InputItem placeholder="请输入">
                                        用车地址
                                      </InputItem>

                                      
                                    </List>
                                    <List renderHeader={() => '需求内容'}>
                                      <TextareaItem                                        
                                        onChange={(value)=>{this.state.content=value;this.forceUpdate();}}
                                        value={this.state.content}
                                        placeholder="请输入需求内容..."
                                        autoHeight
                                        labelNumber={5}
                                      />
                                    </List>
                                  </form>
                                  <div className="lv-order-btn"> 
                                    <div className="lv-pane-index-formitem"><div className="lv-pane-btn01" onClick={this.onSubmit.bind(this)}>确认</div></div>
                                  </div>
                                  <div className="lv-order-telephone">咨询电话 010-8047152
                                  </div>
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
    onSubmit(){
      var s = this;
    }

}


export default ZmitiPubApp(ZmitiOrderApp);