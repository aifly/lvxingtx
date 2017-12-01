import './static/css/index.css';
import React from 'react';


import {
    ZmitiPubApp
} from '../components/public/pub.jsx'
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {NavBar, Icon,Carousel,Flex, Button,Picker, List, WhiteSpace } from 'antd-mobile';

class ZmitiAboutApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
        }
    }





    render() {
        let tabbarProps ={
            selectedTab: '',
        }

        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
            	<div className="lv-top-navbar">
                    <NavBar
                      mode="light"
                      onLeftClick={this.goback.bind(this)}
                    >关于我们</NavBar>
                </div>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-95}}>
                    <div className="scroller">
                        <div className="lv-pane-about">
                        	<div className="lv-pane-about-a1">
                        		<List renderHeader={() => <span className="lv-aboutview-borlft">企业简介</span>}>
                        			<List.Item
                        			wrap
                        			>
                        				<p>国泰蓝天（北京）新能源投资管理有限公司（以下简称“国泰蓝天”）成立于2014年，是一家专注于新能源汽车销售、租赁运营，充换电站、加氢站建设运营于一体的公司。</p>
<p>目前，公司实现近50家子公司在全国落地布局，以东风、九龙、福田等主流车厂为合作伙伴，通过各地子公司在全国范围内开展销售租赁运营，已初具全面蓄势待发的态势。同时，公司还涉足燃料电池、物流集散中心及交通枢纽中心等领域的投资运营。</p>
<p>目前公司可投入运营新能源客车、物流车近700辆，遍布全国18个省市区。</p>
                        			</List.Item>
                        		</List>
                        		<div className="hr10"></div>
                        		<List renderHeader={() => <span className="lv-aboutview-borlft">企业文化</span>}>
                        			<List.Item
                        			wrap
                        			>
                        				<div className="lv-pane-about-text">
	                        				<div>经营理念：标准服务，规范管理，诚信经营，创新发展</div>
											<div>经营策略：租赁为主，销售为辅，租销结合，实现双赢</div>
											<div>企业信仰：把任务当使命，把使命当荣誉</div>
											<div>企业愿景：打造中国新能源汽车产业链一流企业</div>
										</div>
                        			</List.Item>
                        		</List>
                        		<div className="hr10"></div>                        		
                        	</div>
                        	<div className="lv-pane-about-a2">
                        		<List renderHeader={() => <span className="lv-aboutview-borlft">公司记事</span>}>
                        			<List.Item
                        			wrap
                        			>
                        				<div className="lv-pane-about-img">
	                        				<img src="./assets/images/about-06.png"/>
										</div>
                        			</List.Item>
                        		</List>
                        		<div className="hr10"></div>
                        	</div>
                        	<div className="lv-pane-about-a1">
                        		<List renderHeader={() => <span className="lv-aboutview-borlft">战略规划</span>}>
                        			<List.Item
                        			wrap
                        			>
                        				<div className="lv-pane-about-text">
	                        				<div>——全新的共享模式，非传统意义租车</div>
											<p>绿行天下租车与国内现有租车平台最大的不同点在于其租车模式。传统租车企业的车辆都需要企业购买并维护，但绿行天下的车辆全部来自企业。买卖双方坦诚以待，精打细算共同获益。绿行天下租车承接着买卖双方，不忽略任何细节，用心服务提升双方的体验，让彼此的心靠得更近。
											</p>
										</div>
                        			</List.Item>
                        		</List>
                        		<div className="hr10"></div>
                        	</div>
                        	<div className="lv-pane-about-a2">
                        		<List renderHeader={() => <span className="lv-aboutview-borlft">合作伙伴</span>}>
                        			<List.Item
                        			wrap
                        			>
                        				<div className="lv-pane-about-img2">
	                        				<img src="./assets/images/about-07.png"/>
										</div>
                        			</List.Item>
                        		</List>
                        		<div className="hr10"></div>
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
    goback(){
        history.go(-1);
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

export default ZmitiPubApp(ZmitiAboutApp);