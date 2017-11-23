import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import {createForm} from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import {ZmitiPicker} from '../components/public/picker.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import { Button,Picker, List, WhiteSpace } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
class ZmitiHomeApp extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            cityid:'',//城市
            storeid:0,//门店
            cartypeid:'',//车型
            data: [],
		    cols: 1,
		    pickerValue: [],
		    asyncValue: [],
		    sValue: ['138'],//地区
		    tValue: ['tongqin'],//车型
		    citydata:[
			  [
			    {
			      label: '石家庄',
			      value: '138',
			    },
			    {
			      label: '武汉',
			      value: '180',
			    },
			    {
			      label: '南京',
			      value: '220',
			    },
			    {
			      label: '成都',
			      value: '322',
			    },
			    {
			      label: '贵阳',
			      value: '111',
			    },
			    {
			      label: '广州',
			      value: '76',
			    },
			    {
			      label: '海口',
			      value: '120',
			    },
			    {
			      label: '长沙',
			      value: '197',
			    },
			    {
			      label: '太原',
			      value: '300',
			    },
			  ]
			],
			cartypedata:[
			  [
			    {
			      label: '通勤车',
			      value: 'tongqin',
			    },
			    {
			      label: '旅游车',
			      value: 'lvyou',
			    },
			    {
			      label: '商务车',
			      value: 'shangwu',
			    },
			    {
			      label: '公交客车',
			      value: 'gongjiao',
			    },
			  ]
			],
		    visible: false,
        }
    }
    onClick () {
	    setTimeout(() => {
	      this.setState({
	        data: province,
	      });
	    }, 120);
	};
	onPickerChange(val){
	    console.log(val);
	    let colNum = 1;
	    const d = [...this.state.data];
	    const asyncValue = [...val];
	    if (val[0] === 'zj') {
	      d.forEach((i) => {
	        if (i.value === 'zj') {
	          colNum = 2;
	          if (!i.children) {
	            i.children = [{
	              value: 'zj-nb',
	              label: '宁波',
	            }, {
	              value: 'zj-hz',
	              label: '杭州',
	            }];
	            asyncValue.push('zj-nb');
	          } else if (val[1] === 'zj-hz') {
	            i.children.forEach((j) => {
	              if (j.value === 'zj-hz') {
	                j.children = [{
	                  value: 'zj-hz-xh',
	                  label: '西湖区',
	                }];
	                asyncValue.push('zj-hz-xh');
	              }
	            });
	            colNum = 3;
	          }
	        }
	      });
	    } else {
	      colNum = 1;
	    }
	    this.setState({
	      data: d,
	      cols: colNum,
	      asyncValue,
	    });
	};
    render() {
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="wrapper" ref="wrapper" style={{height:this.state.mainHeight-57}}>
                    <div className="scroller">
                        <div className="lv-banner">
                            <img src="./assets/images/u4.jpg"/>
                        </div>             
                        <div className="lv-pane">
                            <div className="lv-pane-index">
                                <div className="lv-pane-inner">
                                    <div className="lv-pane-index-form">
                                                                                
                                        {
                                           /*
                                           <div className="lv-pane-index-formitem">
                                            <div className="lv-form-label">地区：
                                            </div>
                                            <div className="lv-form-input">
                                                <select name="cityid" id="input_city"
                                                    onChange={this.getcity.bind(this)}
                                                >
                                                    <option value={0}>-选择-</option>
                                                </select>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                           <div className="lv-pane-index-formitem">
                                            <div className="lv-form-label">门店：
                                            </div>
                                            <div className="lv-form-input">
                                                <select name="storeid" id="input_store"
                                                    onChange={this.getstoreid.bind(this)}
                                                >
                                                    <option value={0}>-选择-</option>
                                                </select>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="lv-pane-index-formitem">
                                            <div className="lv-form-label">车型：
                                            </div>
                                            <div className="lv-form-input">
                                                <select name="cartypeid" id="typeid"
                                                    onChange={this.getcartypeid.bind(this)}
                                                >
                                                    <option value={0}>全部</option>
                                                    <option value={1} >通勤车</option>
                                                    <option value={2} >旅游车</option>
                                                    <option value={3} >商务车</option>
                                                    <option value={4} >公交客车</option>
                                                </select>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                           */ 
                                        }                                        
                                        
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
                                    <div className="hr10"></div>
                                    <div className="lv-pane-index-li">
                                        <div className="lv-pane-index-li-inner">
                                            <span className="lv-borderleft">车型浏览</span>
                                            <span className="lv-icon-arrow"></span>
                                        </div>
                                    </div>
                                    <div className="lv-pane-index-li">
                                        <div className="lv-pane-index-li-inner">
                                            <span className="lv-borderleft">全国门店/充电桩</span>
                                            <span className="lv-icon-arrow"></span>
                                        </div>
                                    </div>
                                    <div className="lv-h3">绿行天下，全国领先租车平台</div>
                                    <div className="lv-pane-index-column">
                                        <div className="lv-pane-index-column-icon">
                                            <div className="lv-item-icon">
                                                <img src="./assets/images/u39.jpg"/>
                                                <div>节能环保</div>
                                            </div>
                                            <div className="lv-item-icon">
                                                <img src="./assets/images/u44.jpg"/>
                                                <div>价格低廉</div>
                                            </div>
                                            <div className="lv-item-icon">
                                                <img src="./assets/images/u39.jpg"/>
                                                <div>服务高效</div>
                                            </div>
                                            <div className="lv-item-icon">
                                                <img src="./assets/images/u44.jpg"/>
                                                <div>快捷方便</div>
                                            </div>
                                        </div>
                                    </div>
                                     
                                    <div className="lv-pane-index-title"><span>关于我们</span>
                                        <div className="lv-pane-index-title-borbot"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                               
                <div className="lv-menus">
                    <ul>
                        <li>
                            <img src="./assets/images/u61.png"/>
                            <div className="lv-menus-font lv-menus-cur">首页</div>
                        </li>
                        <li>
                            <img src="./assets/images/u66.png"/>
                            <div className="lv-menus-font">车源</div>
                        </li>
                        <li>
                            <img src="./assets/images/u73.png"/>
                            <div className="lv-menus-font">门店</div>
                        </li>
                        <li>
                            <img src="./assets/images/u76.png"/>
                            <div className="lv-menus-font">需求</div>
                        </li>
                    </ul>
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
    gosearch(){
        var s = this;
        var params={
            cityid:s.state.cityid,
            storeid:s.state.storeid,
            cartypeid:s.state.cartypeid,
        };
        console.log(params,'params');
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
        },1000)
        this.getStore();

    }

}

export default ZmitiPubApp(ZmitiHomeApp);