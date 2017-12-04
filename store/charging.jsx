import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {createForm} from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {SegmentedControl,TabBar,Flex, Button,ListView, List, WhiteSpace,Drawer,NavBar, Icon,Tabs } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const Item = List.Item;
const H5API='http://api.ev-bluesky.com/v2/';
const WebSite='http://www.ev-bluesky.com/';


class ZmitiStoreChargingApp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            mainHeight: document.documentElement.clientHeight,
            tabconHeight: document.documentElement.clientHeight-110,

            isLoading: true,
            pageIndex:0,//开始页码，从0开始
            page:1,//当前第*页，从1开始
            countPageNum:1,//共*页
            residueNum:0,//最后一页里有*条
            data: [],//门店数据源
            visible: false,
            dataLeftMenu:[],
            valuetypea:'curr',//默认选中门店
            valuetypeb:'',
            hidden: false,
            fullScreen: false,
            tabs: [
              { title: '全部',value: '0', },
            ],
            totalnum:0,
            citydata:[],
        }

    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    render() {
        let tabbarProps ={
          selectedTab: 'greenTab',
        }     
        

        return (
            <div className="lv-container">
                <div className="lv-store-header">
                  <div className="lv-store-channel-title">
                  附近<br/>门店/充电桩
                  </div>

                      <div className="lv-pane-store-tabs">
                          <div className="lv-pane-store-tabs-inner">
                              <div className="lv-ico-store-imga lv-ico-store-imgacurr"></div>
                              <div className="lv-ico-store-imgb lv-ico-store-imgb"></div>
                              <div className="lv-ico-store am-segment">
                                  <div className="am-segment-item am-segment-item-selected" >
                                      <div className="am-segment-item-inner"><Link to='/store/'>门店</Link></div>                                    
                                  </div>
                                  <div className="am-segment-item " >
                                      <div className="am-segment-item-inner"><Link to='/storecharging/'>电桩</Link></div>                                    
                                  </div>
                              </div>
                          </div>
                      </div>
                </div>
                
                <div className=" lv-page-store" >
                    <div className="lv-page-store-tabs">
                      <div style={{height:this.state.tabconHeight}}>
                          <Tabs tabs={this.state.tabs}
                            initalPage={'t2'}
                            tabBarPosition="left"
                            tabDirection="vertical"
                            onTabClick={this.tabchange.bind(this)}
                          >
                            {this.renderTabContent.bind(this)}
                          </Tabs>
                      </div>
                    </div>

                    
                </div>
                <div className="lv-menu-bar">
                  <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
                </div>
            </div>
        )
    }
    tabchange(tab,index){
      var s = this;
      s.getdatasource(tab.value);//根据城市id获取数据
      s.forceUpdate();
    }
    renderTabContent(tab){
      const nodataTabs=<div>
        <div className="nodataTabs" style={{ alignItems: 'center', justifyContent: 'center', height:this.state.mainHeight-90 }}>无数据</div>
      </div>
      const tabListContent=<div>
        {
          this.state.data.map((item, index) => {
            return <div key={index} className="lv-page-store-list-items">

                <div style={{ padding: '0 15px' }}>
                  <div
                    style={{
                      lineHeight: '1.35',
                      color: '#000',
                      fontSize: 15,
                    }}
                  >{item.stationname}</div>
                  <div className="lv-page-store-list-items-inner" style={{ display: '-webkit-box', display: 'flex'}}>              
                    <div>
                      <div>营业时间：{item.workingtime}</div>
                      <div>联系电话：{item.contactphone}</div>
                      <div>门店地址：{item.stationaddress}</div>
                    </div>
                  </div>
                </div>
                
              </div>
            
          })
        }
      </div>
      return (
        <div className="lv-pane-store-listpane-inner" style={{height:this.state.tabconHeight}}>
          <div className="am-list">
            <div className="am-list-body">
              <div className="list-view-section-body">
                {this.state.totalnum===0 ? nodataTabs : tabListContent}
              </div>
            </div>
          </div>
        </div>
      )
    }
  /*选择门店-充电桩*/
    onstoreChange(e){
      if(e.nativeEvent.selectedSegmentIndex==0){
        this.state.valuetypea="curr";
        this.state.valuetypeb="";
        console.log(e.nativeEvent.selectedSegmentIndex,'门店');
      }else if(e.nativeEvent.selectedSegmentIndex==1){
        this.state.valuetypea="";
        this.state.valuetypeb="curr";
        console.log(e.nativeEvent.selectedSegmentIndex,'充电桩');
      }
      this.forceUpdate();
  }
  //回调
  onstoreValueChange (value) {
      //console.log(value);
        this.forceUpdate();
  }




    /*获取数据*/
    getdatasource(cityid){
      var s = this;    
      $.ajax({
        url:H5API+'h5/getchargstationlist',
        type:'post',
        data:{
          page:1,
          pagenum:20,
          cityid:cityid,
        },
        success(result){
          //console.log(result,'getdata-result'); 
          s.state.totalnum=result.totalnum;
          if(result.totalnum>0){          
            console.log(result.list,'getdata'); 
            s.setState({
              data:result.list,
            })            
          }else{
            s.setState({
              data:[],
            })            
          }
          s.forceUpdate();

        }
      })

    }
    //获取城市
    getcityListsource(){
      var s = this;    
      $.ajax({
        url:H5API+'h5/getcitylist',
        type:'post',
        success(data){
          //console.log(data,'getcitylist'); 
          s.setState({
            dataLeftMenu:data.citydata,
            citydata:data.citydata,
          })
          $.each(data.citydata,function(index,item){
              var nn=index+1;
              s.state.tabs[nn]={'title':item.label, 'value':String(item.value)};
          })
          s.forceUpdate();
        }
      })
    }

    componentWillMount() {

    }

    componentDidMount() {

        this.getcityListsource();
        this.getdatasource(0);

    }

}

export default ZmitiPubApp(ZmitiStoreChargingApp);