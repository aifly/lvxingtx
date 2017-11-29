import './static/css/index.css';
import React from 'react';


import {
    ZmitiPubApp
} from '../components/public/pub.jsx'
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import { Button,Picker,Flex, List, WhiteSpace } from 'antd-mobile';

class ZmitiAboutApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }



    render() {
        let tabbarProps ={
            selectedTab: '',
        }

        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-57}}>
                    <div className="scroller">
                        <div>123</div>
                    </div>
                </div>
                <div className="lv-menu-bar">
                    <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
                </div>
            </div>
        )
    }


}

export default ZmitiPubApp(ZmitiAboutApp);