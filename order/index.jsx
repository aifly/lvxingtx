import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import { createForm } from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {Result,TabBar,Flex,Modal,InputItem,Switch, Stepper,TextareaItem, Range,NavBar, Icon,Button,Picker, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
const H5API='http://api.ev-bluesky.com/v2/';
function Trim(str,is_global){
   var result;
   result = str.replace(/(^\s+)|(\s+$)/g,"");
   if(is_global.toLowerCase()=="g")
    {
      result = result.replace(/\s/g,"");
    }
   return result;
}
class ZmitiOrderApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            modal1: false,
            username:'',
            usermobile:'',
            typeid:0,
            cityname:'',
            content: '',
            mobilecode:'',
            sValue: ['其他城市'],//地区
            tValue: ['0'],//车型
            citydata:[
              [
                {
                  label: '城市',
                  value: '其他城市',
                },
              ]
            ],
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
    selectcity(val){
      console.log(val,'城市');
      this.setState({
        sValue:val,
      })
    }
    selectcartype(val){
      console.log(val,'车型');
      this.setState({
        tValue:val,
      })
    }
    //打开弹窗
    showModal(){
      var s = this;
      //e.preventDefault(); 
      s.setState({
        modal1: true,
      });
      s.forceUpdate();
    }
    //关闭弹窗
    onClose(){
      var s = this;
      s.setState({
        modal1: false,
      });
      s.forceUpdate();
      //window.location="./";
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
          $.each(data.citydata,function(index,item){
              var mm=index+1;
              s.state.citydata[0][mm]={'label':item.label , 'value':String(item.label)};
          })
          s.forceUpdate();
        }
      })
    }
    //打开弹窗
    opendialog(){
      var s = this;      
      var username=s.state.username;
      var usermobile=Trim(s.state.usermobile,'g');//手机号
      var usermobilelen=usermobile.length;//手机号长度
      var typeid=String(s.state.tValue);
      var cityname=String(s.state.sValue);
      var content=s.state.content;
      if(usermobilelen==11){
        //发送验证码
        $.ajax({
          type:'post',
          url:'http://www.ev-bluesky.com/index.php/Home/Api/sendSms/mobile/'+usermobile+'.html',
          data:'mobile='+usermobile,
          dataType:'json',
          success:function(data){
            console.log(data);
            if(data.code==0){ 
              console.info("验证码发送success");
            }
          }          
        });  
        s.showModal();//打开弹窗     
        console.log(usermobilelen,'usermobilelen');
      }
      
    }
    //提交
    onSubmit(){
      var s = this;
      var usermobile=Trim(s.state.usermobile,'g');
      var mobilecode=s.state.mobilecode;
      $.ajax({
        type:'post',
        url:'http://www.ev-bluesky.com/index.php/Home/Api/checkSmscode/mobile/'+usermobile+'/code/'+mobilecode+".html",
        data:'mobile='+usermobile+"&code="+mobilecode,
        dataType:'json',
        success:function(data){

          console.log(data);
          if(data.code==0){
            console.info("提交验证码success");
            //验证成功后提交表单
            $.ajax({
              url:H5API+'h5/saveuserneed',
              type:'post',
              data:{
                username:s.state.username,
                usermobile:Trim(s.state.usermobile,'g'),
                typeid:String(s.state.tValue),
                cityname:String(s.state.sValue),
                content: s.state.content,
                mobilecode: s.state.mobilecode,
              },
              success(result){                
                if(result.getmsg==='提交用车需求成功'){
                  s.setState({
                    modal1: false,//提交成功后关闭弹窗
                  });
                  console.log(result,'提交后显示');            
                }
              }
            }) 
          }
        },
        error:function(msg){
          console.log(msg,'验证码错误');
        }
        
      });



    }

    render() {
        let tabbarProps ={
            selectedTab: 'yellowTab',
        }
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-50}}>
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

                                      <Picker
                                        data={this.state.citydata}
                                        title="地区"
                                        cascade={false}
                                        extra="用车地址"
                                        value={this.state.sValue}
                                        onChange={this.selectcity.bind(this)}
                                        onOk={v => this.setState({ sValue: v })}
                                      >
                                        <List.Item arrow="horizontal">用车地址</List.Item>
                                      </Picker>

                                      
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
                                    <div className="lv-pane-index-formitem"><div className="lv-pane-btn01" onClick={this.opendialog.bind(this)}>确认</div></div>
                                  </div>
                                  <div className="lv-order-telephone">咨询电话 010-8047152
                                  </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lv-menu-bar">
                  <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
                </div>
                <Modal
                  visible={this.state.modal1}
                  transparent
                  maskClosable={false}
                  onClose={this.onClose.bind(this)}
                  title="输入验证码"
                  footer={[{ text: '确定', onPress: () => { this.onSubmit.bind(this)(); } }]}
                  wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                  <div className="lv-dialog-text">
                    <div className="lv-dialog-text-tips">请输入手机接收到的验证码</div>
                    <div className="lv-dialog-text-code">
                      <InputItem                                        
                        onChange={(value)=>{this.state.mobilecode=value;this.forceUpdate();}}
                        value={this.state.mobilecode}                                       
                        placeholder="验证码"
                      >验证码</InputItem>
                    </div>
                  </div>
                </Modal>
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
    

}


export default ZmitiPubApp(ZmitiOrderApp);