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
import {SegmentedControl,TabBar,Flex, Button,ListView, List, WhiteSpace,Drawer,NavBar, Icon } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const Item = List.Item;
const H5API='http://api.ev-bluesky.com/v2/';
const WebSite='http://www.ev-bluesky.com/';
const NUM_ROWS = 4;//一屏显示条数
//let pageIndex = 0;//开始页码，从0开始

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  //console.log(pIndex,'pIndex');//pageNum
  return dataBlob;
}

class ZmitiStoreApp extends React.Component {
    constructor(args) {
        super(...args);
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            dataSource,
            isLoading: true,
            pageIndex:0,//开始页码，从0开始
            page:1,//当前第*页，从1开始
            countPageNum:1,//共*页
            residueNum:0,//最后一页里有*条
            data: [],//车辆数据源
            visible: false,
            dataLeftMenu:[],
            valuetypea:'curr',//默认选中门店
            valuetypeb:'',
            hidden: false,
            fullScreen: false,
        }

    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    render() {
        let tabbarProps ={
          selectedTab: 'greenTab',
        }	    
        
        const separator = (sectionID, rowID) => (
          <div
            key={`${sectionID}-${rowID}`}
            style={{
              height: 10,
              borderTop: '1px solid #ECECED',
            }}
          />
        );
        let index = this.state.data.length - 1;
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            index = this.state.data.length - 1;
          }
          const obj = this.state.data[index--];
          return (
            <div key={rowID} style={{ padding: '0 15px' }}>
              <div
                style={{
                  lineHeight: '1.2',
                  color: '#000',
                  fontSize: 15,
                }}
              >{obj.storename}</div>
              <div style={{ display: '-webkit-box', display: 'flex', padding: '12px 0' }}>              
                <div style={{ lineHeight: 1.2,fontSize:'14px',color:'#888'}}>
                  <div>营业时间：{obj.workingtime}--{rowID}</div>
                  <div>联系电话：{obj.contactphone}</div>
                  <div>门店地址：{obj.storeaddress}</div>
                </div>
              </div>
            </div>
          );
        };

        const sidebar = (<List className="my-list">
          {this.state.dataLeftMenu.map((item, index) => {
            return (<List.Item key={index}
              onClick={() => {console.log(item.value,'cityid');}}
              
            >{item.label}
            </List.Item>);
          })}
        </List>);
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
            	<div className="lv-store-header">
            		<div className="lv-store-channel-title">
            		附近<br/>门店/充电桩
            		</div>

                    <div className="lv-pane-store-tabs">
                        <div className="lv-pane-store-tabs-inner">
                            <div className="lv-ico-store-imga lv-ico-store-imga"></div>
                            <div className="lv-ico-store-imgb lv-ico-store-imgbcurr"></div>
                            <div className="lv-ico-store am-segment">
                                <div className="am-segment-item" >
                                    <div className="am-segment-item-inner"><Link to='/store/'>门店</Link></div>                                    
                                </div>
                                <div className="am-segment-item am-segment-item-selected" >
                                    <div className="am-segment-item-inner"><Link to='/storecharging/'>电桩</Link></div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
            	</div>
                <div className=" lv-page-store" >
                    <div className="lv-pane-store-menu">
                        <div className="lv-pane-store-menu-inner">                                          
                            {sidebar}
                        </div>
                    </div>
                    <div className="lv-pane-store-con">
                        <div className="lv-pane-store-listpane-inner">
                            <ListView
                              ref={el => this.lv = el}
                              dataSource={this.state.dataSource}
                              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                {this.state.isLoading ? '加载中...' : '没有更多了'}
                              </div>)}
                              renderRow={row}
                              renderSeparator={separator}
                              className="am-list"
                              pageSize={4}
                              useBodyScroll
                              onScroll={this.getscrollpage.bind(this)}
                              scrollRenderAheadDistance={500}
                              onEndReached={this.onEndReached.bind(this)}
                              onEndReachedThreshold={10}
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="lv-menu-bar">
                  <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
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



    onEndReached(event){
      var s = this;
      var countPageNum=s.state.countPageNum-1;//总页数
      var residueNum=s.state.residueNum;//最后一页条数
      s.forceUpdate();
      if(s.state.pageIndex<countPageNum){     
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
        this.rData = { ...this.rData, ...genData(++s.state.pageIndex) };

          s.getdatasource(s.state.pageIndex+1);//加载当前页数据
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
          

        }, 1000);
      }
      console.log(s.state.pageIndex,'pageIndex');
    }

    /*获取数据*/
    getdatasource(pageid){
      var s = this;    
      $.ajax({
        url:H5API+'h5/gestorelist',
        type:'post',
        data:{
          page:pageid,
          //page:1,
          pagenum:NUM_ROWS,
          cartypeid:0,
        },
        success(result){
          console.log('加载第'+pageid+'页');

          if(result.getret===1004){          
            console.log(result.list,'getdata'); 
            s.setState({
              data:result.list,
              countPageNum:Math.ceil(result.totalnum/NUM_ROWS),//共*页
              residueNum:result.totalnum % NUM_ROWS,//最后一页共*条
            })
            console.log('总共'+s.state.countPageNum+'页');
            console.log('最后一页有'+s.state.residueNum+'条');
            s.forceUpdate();
          }

        }
      })
      return pageid;
    }
    //获取城市
    getcityListsource(){
      var s = this;    
      $.ajax({
        url:H5API+'h5/getcitylist',
        type:'post',
        success(data){
          console.log(data,'getdata'); 
          s.setState({
            dataLeftMenu:data.citydata,
          })
          s.forceUpdate();
        }
      })
    }
    //滚动
    getscrollpage(){
      var s = this;
      //console.log('scroll');
    }
    componentWillMount() {

    }

    componentDidMount() {
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 600);
        this.getcityListsource();

        this.getdatasource(1);//默认获取第1页数据
        this.onEndReached();

    }

}

export default ZmitiPubApp(ZmitiStoreApp);