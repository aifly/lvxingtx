import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import { createForm } from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Flex,InputItem,Switch,Modal,Result, Stepper,TextareaItem, Range,NavBar, Icon,Button,Picker, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
const H5API='http://api.ev-bluesky.com/v2/';
const WebSite='http://www.ev-bluesky.com/';

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
            ordertype:1,//订单类型
            getcarstoreid: '',
            contentusername:'',
            contentphone:'',            
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

            }],
            hidden: false,
            fullScreen: true,
        }
        this.showModal = key => (e) => {
          e.preventDefault(); // 修复 Android 上点击穿透
          this.setState({
            [key]: true,
          });
        }
        this.onClose = key => () => {
          this.setState({
            [key]: false,
          });
          window.location="./#/car/";
        }
    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    

    goback(){
        history.go(-1);
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
                })
                //console.log(result.detial,'detial');
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
    //提交订单
    onSubmit(){
        var s = this;
        var params={
          carid:s.props.params.id,
          ordertype:s.state.ordertype,//订单类型
          getcarstoreid:s.state.getcarstoreid,//门店
          contentusername:s.state.contentusername,
          contentphone:s.state.contentphone,
          content:s.state.content,
        };
        console.log(params,'params');
    }
    render() {
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
                  color="red"
                />}
                onChange={this.orderstatic.bind(this)}
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
                                      thumb="./assets/images/car-05.png"
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
                                
                                <div className="hr10"></div>
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column2">
                                    
                                    <List>                                       
                                        

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
                                    </List>
                                </div>
                                <div className="hr10"></div>
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column2">
                                    <div className="lv-pane-list-item-last">
                                      <SwitchExample />
                                      <List>

                                          <InputItem                                        
                                              onChange={(value)=>{this.state.contentusername=value;this.forceUpdate();}}
                                              value={this.state.contentusername}                                       
                                              placeholder="请输入您的姓名"
                                          >姓名</InputItem>
                                          <InputItem                                        
                                              onChange={(value)=>{this.state.contentphone=value;this.forceUpdate();}}
                                              value={this.state.contentphone}                                       
                                              placeholder="请输入您的电话"
                                          >电话</InputItem>
                                      </List>
                                    </div>
                                    <div className="lv-pane-list-item-only">
                                      <List>
                                          <TextareaItem
                                            title="备注"
                                            onChange={(value)=>{this.state.content=value;this.forceUpdate();}}
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
                </div>
                <div className="lv-pane-orderview-submit">
                    <div className="lv-pane-orderview-submit-l">确认信息无误后可提交订单</div>
                    <div className="lv-pane-orderview-submit-r" onClick={this.showModal('modal1')}>提交订单</div>
                    <div className="clearfix"></div>
                </div>
                <Modal
                  visible={this.state.modal1}
                  transparent
                  maskClosable={false}
                  onClose={this.onClose('modal1')}
                  title="提交成功"
                  footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                  wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                  <div className="lv-dialog-text">
                    <Result                      
                      message="所提交内容已成功完成验证"
                    />
                  </div>
                </Modal>
            </div>
        )
    }


    componentWillMount() {

    }

    componentDidMount() {
      var s = this;
      s.getDetail();
      s.getdatasource();
    }

}


export default ZmitiPubApp(ZmitiCarorderApp);