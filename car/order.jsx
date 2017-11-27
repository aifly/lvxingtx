import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import createForm from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Flex, InputItem,Switch, Stepper,TextareaItem, Range,NavBar, Icon,Button,Picker, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
class ZmitiCarorderApp extends React.Component {
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
                            <NavBar mode="light">确认订单</NavBar>
                            <div className="hr10"></div>
                            <div className="lv-pane-orderview">
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column1">                                  
                                  <List>
                                    <Item>舒驰YTK6810EV1纯电动客车8米</Item>
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
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column2">
                                    <List>
                                        <Item>
                                            地区
                                        </Item>
                                        <Item>
                                            门店
                                        </Item>
                                    </List>
                                </div>
                                <div className="hr10"></div>
                                <div className="lv-pane-orderview-inner lv-pane-orderview-column2">
                                    <List>
                                        <Item>
                                            姓名
                                        </Item>
                                        <Item>
                                            电话
                                        </Item>
                                        <Item>
                                            身份证号
                                        </Item>
                                    </List>
                                </div>
                                
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lv-pane-orderview-submit">
                    <div className="lv-pane-orderview-submit-l">确认信息无误后可提交订单</div>
                    <div className="lv-pane-orderview-submit-r">提交订单</div>
                </div>
                  
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


export default ZmitiPubApp(ZmitiCarorderApp);