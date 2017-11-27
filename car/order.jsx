import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import createForm from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Flex, InputItem,Switch, Stepper,TextareaItem, Range,NavBar, Icon,Button,Picker, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
import { district, provinceLite as province } from 'antd-mobile-demo-data';
// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 15 }}
  >
    <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
    </div>
  </div>
);
class ZmitiCarorderApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            cityid:'',//城市
            storeid:0,//门店
            cartypeid:0,//车型
            visible: false,
            username:'',
            usermobile:'',
            codenums: '',            
            citydata:[
              [
                {
                  label: '石家庄',
                  value: '138',
                },
                {
                  label: '武汉',
                  value: '180',
                },
                {
                  label: '南京',
                  value: '220',
                },
                {
                  label: '成都',
                  value: '322',
                },
                {
                  label: '贵阳',
                  value: '111',
                },
                {
                  label: '广州',
                  value: '76',
                },
                {
                  label: '海口',
                  value: '120',
                },
                {
                  label: '长沙',
                  value: '197',
                },
                {
                  label: '太原',
                  value: '300',
                },
              ]
            ],
            carstoredata:[
              [
                {
                  label: '全部',
                  value: '0',
                },{
                  label: '河北江富新能源汽车销售有限公司',
                  value: '1',
                },
                {
                  label: '湖北神通捷能电动汽车销售有限公司',
                  value: '2',
                },
                {
                  label: '镇江易联捷能新能源汽车有限公司',
                  value: '3',
                },
                {
                  label: '镇江国达新能源汽车租赁有限公司',
                  value: '4',
                },
              ]
            ],
            sValue: ['138'],//地区
            tValue: ['0'],//车型
            selectedTab: 'yellowTab',
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
    selectstoretype(val){
        console.log(val,'门店');
        this.setState({
            tValue:val,
        })
    }
    onSubmit(){
        var s = this;
        var params={
            cityid:s.state.sValue.toString(),//城市
            storeid:s.state.tValue.toString(),//门店
            cartypeid:s.state.cartypeid,//车型
        };
        console.log(params,'params');
    }
    render() {
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <NavBar mode="light">确认订单</NavBar>
                <div className="hr10"></div>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-100}}>
                    <div className="scroller">            
                        <div className="lv-pane">                          
                            
                            <div className="lv-pane-orderview">
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column1">                                  
                                  <List>
                                    <Item><div className="lv-pane-orderview-h2">舒驰YTK6810EV1纯电动客车8米</div></Item>
                                    <Item
                                      thumb="./assets/images/car-05.png"
                                    >
                                        <div className="lv-pane-orderview-arr">
                                            <div className="lv-pane-orderview-arritem">
                                                <div className="lv-pane-orderview-arr-l">电动机型</div>
                                                <div className="lv-pane-orderview-arr-r">WTEM60-40-2</div>
                                            </div>
                                            <div className="lv-pane-orderview-arritem2">
                                                <div className="lv-pane-orderview-arr-l">电池总储电量</div>
                                                <div className="lv-pane-orderview-arr-r">122kwh</div>
                                            </div>
                                            <div className="lv-pane-orderview-arritem">
                                                <div className="lv-pane-orderview-arr-l">续航里程</div>
                                                <div className="lv-pane-orderview-arr-r">260km</div>
                                            </div>
                                            <div className="lv-pane-orderview-arritem">
                                                <div className="lv-pane-orderview-arr-l">可乘人数</div>
                                                <div className="lv-pane-orderview-arr-r">26</div>
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
                                          onChange={v => this.setState({ sValue: v })}
                                          onOk={v => this.setState({ sValue: v })}
                                        >
                                          <Item arrow="down" >地区</Item>
                                        </Picker>
                                        

                                        <Picker
                                          data={this.state.carstoredata}
                                          title="选择门店"
                                          cascade={false}
                                          extra="选择门店"
                                          value={this.state.tValue}
                                          onChange={this.selectstoretype.bind(this)}
                                          onOk={v => this.setState({ tValue: v })}
                                        >
                                          <List.Item arrow="down">门店</List.Item>
                                        </Picker>
                                    </List>
                                </div>
                                <div className="hr10"></div>
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column2">
                                    <List>
                                        <InputItem                                        
                                            onChange={(value)=>{this.state.username=value;this.forceUpdate();}}
                                            value={this.state.username}                                       
                                            placeholder="请输入您的姓名"
                                        >姓名</InputItem>
                                        <InputItem                                        
                                            onChange={(value)=>{this.state.usermobile=value;this.forceUpdate();}}
                                            value={this.state.usermobile}                                       
                                            placeholder="请输入您的电话"
                                        >电话</InputItem>
                                        <InputItem                                        
                                            onChange={(value)=>{this.state.codenums=value;this.forceUpdate();}}
                                            value={this.state.codenums}                                       
                                            placeholder="18位身份证号"
                                        >身份证号</InputItem>
                                    </List>
                                </div>

                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lv-pane-orderview-submit">
                    <div className="lv-pane-orderview-submit-l">确认信息无误后可提交订单</div>
                    <div className="lv-pane-orderview-submit-r" onClick={this.onSubmit.bind(this)}>提交订单</div>
                    <div className="clearfix"></div>
                </div>
                  
            </div>
        )
    }





    componentWillMount() {

    }

    componentDidMount() {


    }


}


export default ZmitiPubApp(ZmitiCarorderApp);