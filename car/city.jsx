import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {NavBar,Icon,Tabs,ListView, Button,Picker, List, Flex, WhiteSpace,SegmentedControl } from 'antd-mobile';
const H5API='http://api.ev-bluesky.com/v2/';
const WebSite='http://www.ev-bluesky.com/';

class ZmitiCarcityApp extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            mainHeight: document.documentElement.clientHeight,
            isLoading: true,
            pageIndex:0,//开始页码，从0开始
            page:1,//当前第*页，从1开始
            countPageNum:1,//共*页
            residueNum:0,//最后一页里有*条
            data: [],//车辆数据源
            cartypelabel:['全部'],
            cartypedata:[
                {
                  label: '全部',
                  value: '0',
                }
            ],
            tabs: [
              { title: '全部',value: '0', },
            ],
            currTabCartype:'' || 0,//当前第*个车型
            totalnum:0,//统计条数
            currId:0,
            citydata:[],
            cityname:'',
        };

    }    

    render() {

        let tabbarProps ={
            selectedTab: 'redTab',
        }
        var s = this;
        const nodataTabs=<div>
          <div className="nodataTabs" style={{ alignItems: 'center', justifyContent: 'center', height:s.state.mainHeight-90 }}>...</div>
        </div>
        const tabListContent=<div>
          {
            s.state.data.map((item, index) => {
              return <div key={index}>
                  <div
                    style={{
                      backgroundColor: '#F5F5F9',
                      height: 8,
                      borderTop: '1px solid #ECECED',
                      borderBottom: '1px solid #ECECED',
                    }}
                  ></div>
                  <div className="lv-car-item">
                    <div className="lv-car-item-inner">
                      <Link to={{pathname:'/carview/'+item.carid}}><img src={WebSite+item.path} alt={index}/></Link>
                      
                      <div className="lv-car-item-inner-con">
                        <div className="lv-car-subtitle"><Link to={{pathname:'/carview/'+item.carid}}>{item.carname}</Link></div>                  
                        <div className="lv-car-info">
                          <div style={{ display: 'none'}}><span>{index}</span></div>
                          <Flex>
                              <Flex.Item>品牌：{item.brandname}</Flex.Item>
                              <Flex.Item>类型：{item.typename}</Flex.Item>
                          </Flex>
                          <Flex>
                              <Flex.Item>续航：{item.life}KM</Flex.Item>
                              <Flex.Item><span className="lv-font-c2">可乘：{item.maxpassenger}人</span></Flex.Item>
                          </Flex>
                        </div>
                      </div>
                    </div>
                  </div>
                  
              </div>
              
            })
          }
        </div>
        const navbarType=this.state.cartypelabel[this.props.params.id];
        const navbarCity=this.state.cityname;
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="lv-top-navbar lv-top-fixed">
                      <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.goback.bind(this)}
                      >{this.props.params.city==0 ? navbarType : navbarCity}</NavBar>
                  </div>
                <div className="lv-car-pane-page2" style={{height:this.state.mainHeight-95}}>

                  <div className="lv-pane-carlist">
                    <div className="am-list">
                      <div className="am-list-body">
                        <div className="list-view-section-body">
                          {this.state.totalnum===0 ? nodataTabs : tabListContent}
                        </div>
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
    currTabIndex(){
      this.state.currId=this.props.params.id;
      console.log(this.state.currId,'this.state.currId');
      this.forceUpdate();
    }

    
    //获取车型
    getcitydata(){
      var s = this;    
      $.ajax({
        url:H5API+'h5/getcitylist',
        type:'post',
        success(result){
          //console.log(result,'result');
          $.each(result.citydata,function(idx,ele){
            if(s.props.params.city==ele.value){
              s.state.cityname=ele.label;
            }
          })
          $.each(result.cartypedata,function(index,item){
              var ii=index+1;
              s.state.cartypedata[ii]={'label':item.label , 'value':String(item.value)};
              s.state.cartypelabel[ii]=item.label;
              s.state.tabs[ii]={'title':item.label, 'value':String(item.value)};
          })
          //console.log(s.state.cartypedata,'s.state.cartypedata');
          //console.log(s.state.cartypelabel,'s.state.cartypelabel');  
          s.forceUpdate();
        }
      })
    }
    pagelinks(pageText) {
        window.location=pageText;
    }
    
    navOnChange(e) {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    }
    navOnValueChange(value){
        console.log(value);
    } 

    /*获取数据*/
    getdatasource(typeid){
      var s = this;  
      typeid=s.props.params.id;  
      $.ajax({
        url:H5API+'h5/getcarlist',
        type:'post',
        data:{
          page:1,
          pagenum:20,
          cartypeid:typeid,
          cityid:s.props.params.city,
        },
        success(result){
          //console.log(result,'result');
          s.state.totalnum=result.totalnum;
          if(result.totalnum>0){          
            //console.log(result.carlist,'getdata'); 
            s.setState({
              data:result.carlist,
              //countPageNum:Math.ceil(result.totalnum/5),//共*页
              //residueNum:result.totalnum % 5,//最后一页共*条
            })
            //console.log('总共'+s.state.countPageNum+'页');
            //console.log('最后一页有'+s.state.residueNum+'条');
          }else{
            s.setState({
              data:[],
            })            
          }
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
      //setTimeout(() => this.lv.scrollTo(0, 120), 800);

      this.getdatasource();//默认获取第1页数据
      let typeid=this.props.params.id || 0;
      console.log(typeid,'this.props.params.id');
      this.getcitydata(typeid);
      this.currTabIndex();
      this.forceUpdate();

    }


}

export default ZmitiPubApp(ZmitiCarcityApp);