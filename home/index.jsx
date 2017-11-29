import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import {createForm} from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import { Button,Picker,Flex, List, WhiteSpace } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const H5API='http://api.ev-bluesky.com/v2/';
class ZmitiHomeApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            cols: 1,
            cityid:'',//城市
            storeid:0,//门店
            cartypeid:'',//车型
            data: [],
		    sValue: ['0'],//地区
		    tValue: ['0'],//车型
		    citydata:[
			  [
			    {
			      label: '全部',
			      value: '0',
			    },
			  ]
			],
			cartypedata:[[
			    {
			      label: '全部',
			      value: '0',
			    }
			]],
		    visible: false,
        }
    }    
	
    render() {
        let tabbarProps ={
            selectedTab: 'blueTab',
        }
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-57}}>
                    <div className="scroller">
                        <div className="lv-banner">
                            <img src="./assets/images/u4.jpg"/>
                        </div>             
                        <div className="lv-pane">
                            <div className="lv-pane-index">
                                <div className="lv-pane-index-inner">
                                    <div className="lv-pane-index-form">                
                                        
                                        <div>                                        	
	                                    	<List style={{ backgroundColor: 'white' }} className="picker-list">
	                                    		<Picker
										          data={this.state.citydata}
										          title="选择地区"
										          cascade={false}
										          extra="请选择"
										          value={this.state.sValue}
										          onChange={this.selectcity.bind(this)}
										          onOk={v => this.setState({ sValue: v })}
										        >
										          <List.Item arrow="horizontal">地区</List.Item>
										        </Picker>

	                                    		<Picker
										          data={this.state.cartypedata}
                                                  cols={1}
										          title="选择车型"
										          cascade={false}
										          extra="请选择"
										          value={this.state.tValue}
										          onChange={this.selectcartype.bind(this)}
										          onOk={v => this.setState({ tValue: v })}
										        >
										          <List.Item arrow="horizontal">车型</List.Item>
										        </Picker>
									        </List>
										</div>
                                        <div className="lv-pane-index-formitem">
                                            <div className="lv-pane-btn01" onClick={this.gosearch.bind(this)}>去选车</div>
                                        </div>
                                    </div>

                                    <div className="lv-pane-index-column">
                                        <div className="lv-pane-index-list-01">
                                            <List>
                                                <List.Item arrow="horizontal" onClick={() => {window.location='./#/car/'}}><span className="lv-borderleft">车型浏览</span></List.Item>
                                                <List.Item arrow="horizontal" onClick={() => {window.location='./#/store/'}}><span className="lv-borderleft">全国门店/充电桩</span></List.Item>
                                            </List>
                                        </div>
                                    </div>
                                                                         
                                    
                                </div>
                                <div className="hr10"></div>
                                <div className="lv-pane-index-column pad-tb10">
                                    <div className="lv-pane-index-column-icon">
                                        <div className="flex-container">
                                            <Flex>
                                              <Flex.Item>
                                                <div className="lv-item-icon"><img src="./assets/images/u39.jpg"/></div>
                                                <div>节能环保</div>
                                              </Flex.Item>
                                              <Flex.Item>
                                                <div className="lv-item-icon"><img src="./assets/images/u44.jpg"/></div>
                                                <div>价格低廉</div>
                                              </Flex.Item>
                                              <Flex.Item>
                                                <div className="lv-item-icon"><img src="./assets/images/index-icon1.png"/></div>
                                                <div>服务高效</div>
                                              </Flex.Item>
                                              <Flex.Item>
                                                <div className="lv-item-icon"><img src="./assets/images/index-icon2.png"/></div>
                                                <div>快捷方便</div>
                                              </Flex.Item>
                                            </Flex>
                                        </div>
                                    </div>
                                    <div className="hr10"></div>
                                    <div className="lv-pane-index-title">                                        
                                        <a href="./#/about/" className="antm-button-small" aria-disabled="false">
                                        	<span>关于我们</span>
                                        </a>
                                    </div>
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
    selectcity(val){
    	console.log(val,'城市');
    	this.setState({
    		sValue:val,
    	})
    }
    selectcartype(val){
    	console.log(val,'车型');
    	this.setState({
    		tValue:val,
    	})
    }
    getStore(){
        var citylist = new Array();
        var arealist = new Array();
        var pdata = new Array();
        
        var ipt_city = "<option value='0'>-选择-</option>";
        $.getJSON("./assets/js/getStore.json",function(pdata){
            $.each(pdata,function(i,item){
                $.each(item.provincelist,function(v,city){                             
                    ipt_city += "<option value='" + city.city_id + "'>" + city.cityname + "</option>";  
                    $("#input_city").html(ipt_city);                                   
                })              
            });
            $("#input_city").change(function(){
                var val_city=$(this).val();
                var ipt_store = "<option value='0'>-选择-</option>"; 
                /*$.each(pdata,function(i,item){ 
                    $.each(item.provincelist,function(v,city){
                        if(val_city==city.city_id){
                            $.each(city.citylist,function(k,area){
                                $.each(area.arealist,function(m,store){
                                    ipt_store += "<option value='" + store.stoid + "'>" + store.storename + "</option>";
                                })
                                $("#input_store").html(ipt_store);
                            })                   
                        }               
                    })
                })*/
            })
        
        })

    }
    //获取车型
    getdatasource(){
    	var s = this;

		
    	$.ajax({
    		url:H5API+'h5/getcitylist',
    		type:'post',
    		success(data){
    			//console.log(data,'getdata');               
                $.each(data.cartypedata,function(index,item){
                    var ii=index+1;
                    s.state.cartypedata[0][ii]={'label':item.label , 'value':String(item.value)};
                })
                
                $.each(data.citydata,function(index,item){
                    var mm=index+1;
                    s.state.citydata[0][mm]={'label':item.label , 'value':String(item.value)};
                })
                //console.log(s.state.citydata,'s.state.citydata');
                s.forceUpdate();

    		}
    	})
    	s.forceUpdate();
    }
    /*
    getcity(e){
        var s = this;
        s.state.cityid=e.target.value;
        console.log(s.state.cityid,'s.state.cityid');
        s.forceUpdate();
    }
    getstoreid(e){
        var s = this;
        s.state.storeid=e.target.value;
        console.log(s.state.storeid,'s.state.storeid');
        s.forceUpdate();
    }
    getcartypeid(e){
        var s = this;
        s.state.cartypeid=e.target.value;
        console.log(s.state.cartypeid,'s.state.cartypeid');
        s.forceUpdate();
    }
    */
    gosearch(){//去选车
        var s = this;
        var params={
            cityid:s.state.sValue.toString(),//城市
            storeid:s.state.storeid,//门店
            cartypeid:s.state.tValue.toString(),//车型
        };
        console.log(params,'params');
    }


    componentWillMount() {

    }

    componentDidMount() {
    	var s = this;
        /*
        this.scroll = new IScroll(this.refs['wrapper'],{
            scrollbars:true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });

        setTimeout(()=>{
            this.scroll.refresh();
        },1000)
        */
        s.getdatasource();
        s.forceUpdate();

    }

}

export default ZmitiPubApp(ZmitiHomeApp);