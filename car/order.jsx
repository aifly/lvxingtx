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
                                <div className="lv-pane-orderview-inner">
                                  
                                  

                                  
                                  
                                </div>
                               
                            </div>
                        </div>
                    </div>
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