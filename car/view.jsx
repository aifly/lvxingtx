import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import {createForm} from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {Carousel,Flex, Button,Picker, List, WhiteSpace } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const Item = List.Item;
class ZmitiCarviewApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
            data: [
                './assets/images/58abb79645954.jpg',
                './assets/images/58ae580bbe166.jpg', 
                './assets/images/58ae580c2b2aa.jpg',
            ],
            initialHeight: 176,
        }
    }    
    orderview(){//提交订单
        window.location="./#/carorder/";
    }
    render() {
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-77}}>
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
                              {this.state.data.map((item,index) => (
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
                                    <div className="lv-h2">舒驰YTK6810EV1纯电动客车8米 </div>
                                    <div className="lv-pane-carview-col-1">
                                        <Flex>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-01.png"/>
                                                <div className="lv-pane-carview-f1">电动机型</div>
                                                <div className="lv-pane-carview-f2">WTEM60-40-2</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-02.png"/>
                                                <div className="lv-pane-carview-f1">电池总储电量</div>
                                                <div className="lv-pane-carview-f2">122kwh</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-03.png"/>
                                                <div className="lv-pane-carview-f1">续航里程</div>
                                                <div className="lv-pane-carview-f2">260km</div>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <img src="./assets/images/carview-04.png"/>
                                                <div className="lv-pane-carview-f1">可乘人数</div>
                                                <div className="lv-pane-carview-f2">26</div>
                                            </Flex.Item>
                                        </Flex>
                                    </div>                                   
                                    
                                </div>
                                <div className="lv-pane-carview-inner2">
                                    <div className="lv-pane-carview-col-2">
                                        <List renderHeader={() => <span className="lv-carview-borlft">基本信息</span>} 
                                            className="my-list">
                                            <Item extra={'舒驰'}>品牌</Item>
                                            <Item extra={'商务车'}>类型</Item>
                                            <Item extra={'26'}>可乘人数</Item>
                                            <Item extra={'260km'}>里程</Item>
                                        </List>
                                        <List renderHeader={() => <span className="lv-carview-borlft">技术参数</span>} 
                                            className="my-list">
                                            <Item extra={'122kwh'}>电池总储电量</Item>
                                            <Item extra={'磷酸铁锂'}>电池种类</Item>
                                            <Item extra={'1720/1605mm'}>前悬/后悬</Item>
                                            <Item extra={'0mm'}>悬架</Item>

                                            <Item extra={'235/75R17.5'}>轮胎规格</Item>
                                            <Item extra={'WTEM60-40-2'}>电动机型</Item>
                                            <Item extra={'60kw'}>额定功率</Item>
                                            <Item extra={'3980mm'}>轴距</Item>

                                            <Item extra={'9650kg'}>整车质量</Item>
                                            <Item extra={'100km/h'}>最高车速</Item>
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

export default ZmitiPubApp(ZmitiCarviewApp);