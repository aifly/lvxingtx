import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import {createForm} from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {NavBar, Icon,Carousel,Flex, Button,Picker, List, WhiteSpace } from 'antd-mobile';
const Item = List.Item;
const H5API='http://api.ev-bluesky.com/v2/';
const WebSite='http://www.ev-bluesky.com/';
class ZmitiCarviewApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            carid:'',//车辆id
            dataSource:[],
            dataImgs: [],
            initialHeight: 176,
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
        }
    }    
    orderview(){//提交订单
        window.location="./#/carorder/"+this.props.params.id;
    }
    render() {
        const CurrentId=this.props.params.id;
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="lv-top-navbar">
                    <NavBar
                      mode="light"
                      icon={<Icon type="left" />}
                      onLeftClick={this.goback.bind(this)}
                    >车源详情</NavBar>
                </div>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-122}}>
                    <div className="scroller">
                        <div className="lv-carview-banner">
                            <Carousel
                              className="my-carousel"
                              autoplay={false}
                              infinite
                              selectedIndex={1}
                              swipeSpeed={35}
                              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                              afterChange={index => console.log('slide to', index)}
                            >
                              {this.state.dataImgs.map((item,index) => (
                                <a href="javascript:void(0)" key={index}>
                                  <img
                                    src={item}
                                    alt={index}
                                    onLoad={() => {
                                      window.dispatchEvent(new Event('resize'));
                                      this.setState({
                                        initialHeight: null,
                                      });
                                    }}
                                  />
                                </a>
                              ))}
                            </Carousel>
                        </div>             
                        <div className="lv-pane">
                            <div className="lv-pane-carview">
                                <div className="lv-pane-carview-inner">
                                    <div className="lv-h2">{this.state.detial.carname}</div>
                                    <div className="lv-pane-carview-col-1">
                                        <Flex>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-01.png"/>
                                                <div className="lv-pane-carview-f1">电动机型</div>
                                                <div className="lv-pane-carview-f2">{this.state.detial.motortype}</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-02.png"/>
                                                <div className="lv-pane-carview-f1">电池总储电量</div>
                                                <div className="lv-pane-carview-f2">{this.state.detial.electricity+'kwh'}</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-03.png"/>
                                                <div className="lv-pane-carview-f1">续航里程</div>
                                                <div className="lv-pane-carview-f2">{this.state.detial.life+'km'}</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-04.png"/>
                                                <div className="lv-pane-carview-f1">可乘人数</div>
                                                <div className="lv-pane-carview-f2">{this.state.detial.maxpassenger}</div>
                                            </Flex.Item>
                                        </Flex>
                                    </div>                                   
                                    
                                </div>
                                <div className="lv-pane-carview-inner2">
                                    <div className="lv-pane-carview-col-2">
                                        <List renderHeader={() => <span className="lv-carview-borlft">基本信息</span>} 
                                            className="my-list">
                                            <Item extra={this.state.detial.brandname}>品牌</Item>
                                            <Item extra={this.state.detial.typename}>类型</Item>
                                            <Item extra={this.state.detial.maxpassenger}>可乘人数</Item>
                                            <Item extra={this.state.detial.life+'km'}>里程</Item>
                                        </List>
                                        <List renderHeader={() => <span className="lv-carview-borlft">技术参数</span>} 
                                            className="my-list">
                                            <Item extra={this.state.detial.electricity+'kwh'}>电池总储电量</Item>
                                            <Item extra={this.state.detial.batterytype}>电池种类</Item>
                                            <Item extra={this.state.detial.overhang}>前悬/后悬</Item>
                                            <Item extra={this.state.detial.suspension+'mm'}>悬架</Item>

                                            <Item extra={this.state.detial.tyresize}>轮胎规格</Item>
                                            <Item extra={this.state.detial.motortype}>电动机型</Item>
                                            <Item extra={this.state.detial.powerrate+'kw'}>额定功率</Item>
                                            <Item extra={this.state.detial.wheelbase+'mm'}>轴距</Item>

                                            <Item extra={this.state.detial.weight+'kg'}>整车质量</Item>
                                            <Item extra={this.state.detial.maxspeed+'km/h'}>最高车速</Item>
                                        </List>
                                    </div>
                                </div>
                                                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lv-carview-btn">
                    <Button onClick={this.orderview.bind(this)}>我要订车</Button>
                </div>            

            </div>
        )
    }


    goback(){
        history.go(-1);
    }
    getDetail(carid){
        var s = this;
        carid=this.props.params.id;
        $.ajax({
            url:H5API+'h5/gecardetial',
            type:'post',
            data:{
              carid:carid,
            },
            success(result){
              if(result.getret===1004){
                console.log(result,result.detial.path[0]);
                var dataImgs=result.detial.path;
                $.each(dataImgs,function(index,item){
                    s.state.dataImgs.push(WebSite+item);
                    //console.log(item,'picindex');
                })
                s.setState({
                  detial:result.detial,                  
                })
                //console.log(result.detial,'detial');
                s.forceUpdate();
              }

            }
        })
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
        this.getDetail();

    }

}

export default ZmitiPubApp(ZmitiCarviewApp);