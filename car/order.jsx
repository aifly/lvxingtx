import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import {Router,Route,hashHistory,Link,browserHistory} from 'react-router';
import { createForm } from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Flex,InputItem,Radio,Switch,Modal,Result, Stepper,TextareaItem, Range,NavBar, Icon,Button,Picker, List, WhiteSpace,Toast } from 'antd-mobile';
const Item = List.Item;
const H5API='http://api.ev-bluesky.com/v2/';
const WebSite='http://www.ev-bluesky.com/';
const RadioItem = Radio.RadioItem;
function Trim(str,is_global){
   var result;
   result = str.replace(/(^\s+)|(\s+$)/g,"");
   if(is_global.toLowerCase()=="g")
    {
      result = result.replace(/\s/g,"");
    }
   return result;
}
class ZmitiCarorderApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            modal1: false,
            cityid:'',//城市
            storeid:0,//门店
            cartypeid:0,//车型
            visible: false,
            ordertype:0,//订单类型
            getcarstoreid: '',
            contentusername:'',
            contentphone:'', //用户手机号           
            content:'',        
            citydata:[
              [
                {
                  label: '全部',
                  value: 0,
                  children:[{
                      label: '全部',
                      value: 0,
                  }]
                }
              ]
            ],
            carstoredata:[
              [
                {
                  label: '全部',
                  value: 0,
                }
              ]
            ],
            sValue: [0],//地区
            tValue: [0],//门店
            detial:[{
                carid:'',
                carname:'',
                carmodel:'',
                brandid:'',
                carsize:'',
                capacity:'',
                maxpassenger:'',
                maxspeed:'',
                emission:'',
                engine:'',
                motor:'',
                drive:'',
                carbreak:'',
                steer:'',
                config:'',
                carfeature:'',
                caruse:'',
                life:'',
                typeid:'',
                tags:'',
                status:'',
                electricity:'',
                batterytype:'',
                overhang:'',
                suspension:'',
                tyresize:'',
                motortype:'',
                powerrate:'',
                wheelbase:'',
                weight:'',
                createtime:'',
                uid:'',
                edituid:'',
                edittime:'',
                sort:'',
                pictrueids:'',
                hotsort:'',
                typename:'',
                brandname:'',             
                path:[],  
            }],
            hidden: false,
            fullScreen: true,
            orderdata: [
              { value: 0, label: '租车' },
              { value: 1, label: '购车' },
            ],
            value:0,
            thumbImg:'',//车辆图片
            mobilecode:'',//手机验证码
            count: 30,//默认倒计时为*秒
            liked: true,//倒计时显示
        }
        //租车&购车
        this.onChangeOrder = (value) => {
          console.log(value,'checkbox');
          this.setState({
            value:value,
            ordertype:value,
          });
        };
    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    

    goback(){
        history.go(-1);
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
      //window.location="./#/car/";
    }
    //获取详情
    getDetail(){
        var s = this;
        $.ajax({
            url:H5API+'h5/gecardetial',
            type:'post',
            data:{
              carid:this.props.params.id,
            },
            success(result){
              if(result.getret===1004){
                s.setState({
                  detial:result.detial,
                  thumbImg:result.detial.path[0],            
                })
                //console.log(result.detial,'detial');
                console.log(s.state.thumbImg,'s.state.thumbImg');
                s.forceUpdate();
              }

            }
        })
    }
    //获取车型&门店
    getdatasource(){
      var s = this;
    
      $.ajax({
        url:H5API+'h5/getcitylist',
        type:'post',
        success(data){
          console.log(data,'getdata');               
          $.each(data.citydata,function(index,item){
              var mm=index+1;
              s.state.citydata[0][mm]={'label':item.label , 'value':item.value,'children':item.children};
          })
          //console.log(s.state.citydata,'s.state.citydata');
          s.forceUpdate();

        }
      })
    }
    selectcity(val){
        var s = this;
        var citydata=s.state.citydata[0];
        console.log(val,'城市');

        this.setState({
            sValue:val,
            tValue:0,//门店数值初始化
        })
        s.state.carstoredata[0][0]={label: '全部', value:0};
        $.each(citydata,function(index,item){
            var nn=index+1;
            var sValue=item.value;
            if(sValue==val){              
              
              //console.log(item.children,'item.children');
              $.each(item.children,function(idx,ele){
                  var ii=idx+1;
                  s.state.carstoredata[0][ii]={'label':ele.label , 'value':ele.value};
              })

              s.forceUpdate();
            }
            
            
        })
        //console.log(s.state.carstoredata,'s.state.carstoredata');
        s.forceUpdate();
        
    }
    selectstoretype(val){
        console.log(val,'门店');
        this.setState({
            tValue:val,
            getcarstoreid:String(val),
        })
    }
    //门店数值初始化
    openpicker(){
      this.setState({
          tValue:0,
          carstoredata:[
            [
              {
                label: '全部',
                value: 0,
              }
            ]
          ]
      })
    }
    //订单类型
    orderstatic(e){
      var s = this;    
      var val=e.target.value;
      if(val==='on'){
        console.log(val,'购车');
        s.state.ordertype=1;
      }else{
        console.log(val,'租车');
        s.state.ordertype=0;
      }
    }
    contentusername(val){
      var s = this;
      s.state.contentusername=val;
      s.forceUpdate();
    }
    //打开弹窗
    opendialog(){
      var s = this;      
      var contentusername=s.state.contentusername;
      var contentphone=Trim(s.state.contentphone,'g');//手机号
      var usermobilelen=contentphone.length;//手机号长度

      if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(contentphone))){ 
          console.log("不是完整的11位手机号或者正确的手机号前七位"); 
          return false; 
      }else{
        //发送验证码
        if(contentusername!=''){
          $.ajax({
            type:'post',
            url:'http://www.ev-bluesky.com/index.php/Home/Api/sendSms/',
            data:{
              mobile:contentphone
            },
            dataType:'json',
            success:function(data){
              console.log(data);
              if(data.code==0){ 
                console.info("验证码发送success");
              }
            }          
          });  
          s.showModal();//打开弹窗
          s.recodeClick();  
          console.log(usermobilelen,'usermobilelen');
        }

        return true;
      }
      
    }
    //提交订单
    onSubmit(){
      var s = this;
      var contentphone=Trim(s.state.contentphone,'g');
      var mobilecode=s.state.mobilecode;
      $.ajax({
        type:'post',
        url:'http://www.ev-bluesky.com/index.php/Home/Api/checkSmscode/',
        data:{
          mobile:contentphone,
          code:mobilecode,
        },
        dataType:'json',
        success:function(data){

          console.log(data);
          if(data.code==0){
            console.info("提交验证码success");
            //验证成功后提交表单
            $.ajax({
              url:H5API+'h5/saveorder',
              type:'post',
              data:{
                carid:s.props.params.id,
                ordertype:s.state.ordertype,//订单类型
                getcarstoreid:s.state.getcarstoreid,//门店
                contentusername:s.state.contentusername,
                contentphone:contentphone,
                content:s.state.content,
                mobilecode: s.state.mobilecode,
              },
              success(result){                
                if(result.getmsg==='提交订单成功'){
                  s.setState({
                    modal1: false,//提交成功后关闭弹窗
                  });
                  Toast.info('提交订单成功', 1);
                  console.log(result,'提交后显示');            
                }else{
                  Toast.info('提交订单失败', 1);
                }
              }
            }) 
          }
        },
        error:function(msg){
          console.log(msg,'验证码错误');
          Toast.info('验证码错误', 1);
        }
        
      });



    }
    //重新发送验证码
    reAjaxMobileCode(){
      var s = this;
      var contentphone=Trim(s.state.contentphone,'g');
      $.ajax({
            type:'post',
            url:'http://www.ev-bluesky.com/index.php/Home/Api/sendSms/',
            data:{
              mobile:contentphone
            },
            dataType:'json',
            success:function(data){
              console.log(data);
              if(data.code==0){ 
                console.info("验证码发送success");
              }
            }          
        }); 
    }
    //倒计时发送验证码
    recodeClick(){
        if(this.state.liked){
          this.timer = setInterval(function () {
            var count = this.state.count;
            this.state.liked = false;
            count -= 1;
            if (count < 1) {
              this.setState({
                liked: true
              });
              count = 30;
　　　　　　　clearInterval(this.timer);
            }
            this.setState({
              count: count
            });
          }.bind(this), 1000);
        }
        
    }
    render() {

        let reCodetext = this.state.liked ? <Button onClick={this.reAjaxMobileCode.bind(this)} size="small" inline>获取验证码</Button> : <Button size="small" disabled inline>{this.state.count}秒后重发</Button>;
        
        let SwitchExample = (props) => {
          const { getFieldProps } = props.form;
          return (
            <List>
              <List.Item
                extra={<Switch
                  {...getFieldProps('Switch5', {
                    initialValue: true,
                    valuePropName: 'checked',
                  })}
                  platform="android"
                  color="#38b44c"
                />}
                onClick={this.orderstatic.bind(this)}
              >订单类型</List.Item>
            </List>
          );
        };
        SwitchExample = createForm()(SwitchExample);
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="lv-top-navbar">
                  <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.goback.bind(this)}
                  >确认订单</NavBar>
                </div>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-100}}>
                    <div className="scroller">            
                        <div className="lv-pane">                          
                            
                            <div className="lv-pane-orderview">
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column1">                                  
                                  <List>
                                    <Item><div className="lv-pane-orderview-h2">{this.state.detial.carname}</div></Item>
                                    <Item
                                      thumb={WebSite+this.state.thumbImg}
                                    >
                                        <div className="lv-pane-orderview-arr">
                                            <div className="lv-pane-orderview-arritem">
                                                <div className="lv-pane-orderview-arr-l">电动机型</div>
                                                <div className="lv-pane-orderview-arr-r">{this.state.detial.motortype}</div>
                                            </div>
                                            <div className="lv-pane-orderview-arritem2">
                                                <div className="lv-pane-orderview-arr-l">电池总储电量</div>
                                                <div className="lv-pane-orderview-arr-r">{this.state.detial.electricity+'kwh'}</div>
                                            </div>
                                            <div className="lv-pane-orderview-arritem">
                                                <div className="lv-pane-orderview-arr-l">续航里程</div>
                                                <div className="lv-pane-orderview-arr-r">{this.state.detial.life+'km'}</div>
                                            </div>
                                            <div className="lv-pane-orderview-arritem">
                                                <div className="lv-pane-orderview-arr-l">可乘人数</div>
                                                <div className="lv-pane-orderview-arr-r">{this.state.detial.maxpassenger}</div>
                                            </div>
                                        </div>

                                    </Item>
                                  </List>

                                  
                                </div>
                                <div className="hr10"></div>

                                <div className="lv-pane-orderview-inner lv-pane-orderview-column2 lv-pane-list-item-only">
                                    
                                    <List>                                       
                                        {this.state.orderdata.map(i => (
                                          <RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this.onChangeOrder(i.value)}>
                                            {i.label}
                                          </RadioItem>
                                        ))}
                                        <Picker
                                          data={this.state.citydata}
                                          title="选择地区"
                                          cascade={false}
                                          extra="选择地区"
                                          value={this.state.sValue}
                                         
                                          onChange={this.selectcity.bind(this)}
                                          
                                        >
                                          <Item arrow="down" onClick={this.openpicker.bind(this)}>地区</Item>
                                        </Picker>
                                        

                                        <Picker
                                          data={this.state.carstoredata}
                                          title="选择门店"
                                          cascade={false}
                                          extra="选择门店"
                                          value={this.state.tValue}
                                          onChange={this.selectstoretype.bind(this)}
                                          
                                        >
                                          <List.Item arrow="down">门店</List.Item>
                                        </Picker>
                                        <InputItem                                        
                                              onChange={this.contentusername.bind(this)}
                                              value={this.state.contentusername}                                       
                                              placeholder="请输入您的姓名"
                                          >姓名</InputItem>
                                          <InputItem                                        
                                              onChange={(value) => {this.state.contentphone=value;this.forceUpdate();}}
                                              value={this.state.contentphone}                                     
                                              placeholder="请输入11位手机号码"
                                              type={'phone'}
                                          >电话</InputItem>
                                          <TextareaItem
                                            title="备注"
                                            onChange={(value) => {this.state.content=value;this.forceUpdate();}}
                                            value={this.state.content}
                                            autoHeight
                                            labelNumber={5}
                                            placeholder="请输入备注内容"
                                          />
                                    </List>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lv-pane-orderview-submit">
                    <div className="lv-pane-orderview-submit-l">确认信息无误后可提交订单</div>                    
                    {this.state.contentphone.length===13 && this.state.contentusername.length!="" ? <div className="lv-pane-orderview-submit-r"  onClick={this.opendialog.bind(this)}>提交订单</div> : <div className="lv-pane-orderview-submit-r">提交订单</div>}
                    <div className="clearfix"></div>
                </div>
                {/*<Modal
                  visible={this.state.modal1}
                  transparent
                  maskClosable={false}
                  onClose={this.onClose.bind(this)}
                  title="提交成功"
                  footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose.bind(this)(); } }]}
                  wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                  <div className="lv-dialog-text">
                    <Result                      
                      message="所提交内容已成功完成验证"
                    />
                  </div>
                </Modal>*/}
                <Modal
                  visible={this.state.modal1}
                  transparent
                  maskClosable={false}
                  onClose={this.onClose.bind(this)}
                  title="- 输入验证码 -"
                  footer={[
                    { text: '关闭', onPress: () => { this.onClose.bind(this)(); } },
                    { text: '确定', onPress: () => { this.onSubmit.bind(this)(); } }
                  ]}
                  wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                  <div className="lv-dialog-text">
                    <div className="lv-dialog-text-tips">已向 <span>{this.state.contentphone} </span>发送验证码</div>
                    <div className="lv-dialog-text-code">
                      <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                          <List.Item
                            extra={<div onClick={this.recodeClick.bind(this)}>{reCodetext}</div>}
                            multipleLine
                          >
                            <InputItem                                        
                              onChange={(value) => {this.state.mobilecode=value;this.forceUpdate();}}
                              value={this.state.mobilecode}                                       
                              placeholder="请输入验证码"
                              type={'number'}
                              maxLength={6}
                            />
                          </List.Item>
                      </List>
                    </div>
                  </div>
                </Modal>
            </div>
        )
    }


    componentWillMount() {

    }

    componentDidMount() {
      var s = this;

      this.scroll = new IScroll(this.refs['wrapper'],{
            scrollbars:true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            preventDefault:false,//允许默认点击事件
        });

        setTimeout(() => {
            this.scroll.refresh();
        },1000);

      s.getDetail();
      s.getdatasource();
    }

}


export default ZmitiPubApp(ZmitiCarorderApp);