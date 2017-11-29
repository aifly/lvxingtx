import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import { createForm } from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {Result,TabBar,Flex, InputItem,Switch, Stepper,TextareaItem, Range,NavBar, Icon,Button,Picker, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
const H5API='http://api.ev-bluesky.com/v2/';
class ZmitiOrderApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            username:'',
            usermobile:'',
            content: '',
            tValue: ['0'],//车型
            cartypedata:[[
                {
                  label: '全部',
                  value: '0',
                }
            ]],
            display:'none',//提交后显示
            hidden: false,
            fullScreen: true,
        }
    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    selectcartype(val){
      console.log(val,'车型');
      this.setState({
        tValue:val,
      })
    }

    //获取车型
    getdatasource(){
      var s = this;    
      $.ajax({
        url:H5API+'h5/getcitylist',
        type:'post',
        success(data){
          //console.log(data,'getdata');               
          $.each(data.cartypedata,function(index,item){
              var ii=index+1;
              s.state.cartypedata[0][ii]={'label':item.label , 'value':String(item.value)};
          })
          s.forceUpdate();

        }
      })
      s.forceUpdate();
    }

    render() {
        let tabbarProps ={
            selectedTab: 'yellowTab',
        }
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
                                        type="phone"
                                        onChange={(value)=>{this.state.usermobile=value;this.forceUpdate();}}
                                        value={this.state.usermobile}
                                        placeholder="请输入11位手机号码"
                                      >
                                        您的电话
                                      </InputItem>                                       
                                      
                                      <Picker
                                        data={this.state.cartypedata}
                                        title="选择车型"
                                        cascade={false}
                                        extra="请选择"
                                        value={this.state.tValue}
                                        onChange={this.selectcartype.bind(this)}
                                        onOk={v => this.setState({ tValue: v })}
                                      >
                                        <List.Item arrow="horizontal">需求车型</List.Item>
                                      </Picker>
                                      <InputItem placeholder="请输入">
                                        用车地址
                                      </InputItem>

                                      
                                      <List.Item data-seed="logId">需求内容</List.Item>
                                      <TextareaItem                                        
                                        onChange={(value)=>{this.state.content=value;this.forceUpdate();}}
                                        value={this.state.content}
                                        placeholder="请输入需求内容..."
                                        labelNumber={5}
                                      />
                                    </List>
                                  </form>
                                  <div className="lv-order-btn"> 
                                    <div className="lv-pane-index-formitem"><div className="lv-pane-btn01" onClick={this.onSubmit.bind(this)}>确认</div></div>
                                  </div>
                                  <div className="lv-order-telephone">咨询电话 010-8047152
                                  </div>
                                  <div style={{display:this.state.display}}>
                                    <Result
                                      img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
                                      title="提交成功"
                                      message="所提交内容已成功完成验证"
                                    />
                                  </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lv-menu-bar">
                  <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
                </div>
            </div>
        )
    }





    componentWillMount() {

    }

    componentDidMount() {
        /*
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
        */
        this.getdatasource();

    }
    onSubmit(){
      var s = this;
    }

}


export default ZmitiPubApp(ZmitiOrderApp);