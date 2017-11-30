import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createForm from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {SegmentedControl,TabBar,Flex, Button,ListView, List, WhiteSpace,Drawer,NavBar, Icon } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const Item = List.Item;

const data = [
  {
    title: '河北江富新能源汽车销售有限公司新能源汽车',
    opentime:'09:00--17:00',
    telephone:'0311-66031159',
    address:'河北石家庄桥西区裕华路66号金正海悦天地E座1019',
  },
  {
    title: '河北江富新能源汽车销售有限公司新能源汽车',
    opentime:'09:00--17:00',
    telephone:'0311-66031159',
    address:'河北石家庄桥西区裕华路66号金正海悦天地E座1019',
  },
  {
    title: '河北江富新能源汽车销售有限公司新能源汽车',
    opentime:'09:00--17:00',
    telephone:'0311-66031159',
    address:'河北石家庄桥西区裕华路66号金正海悦天地E座1019',
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
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
            visible: false,
            dataLeftMenu:[{
            	'cityname':'石家庄',
            	'cityid':180,
            },{
            	'cityname':'武汉',
            	'cityid':181,
            },{
            	'cityname':'南京',
            	'cityid':182,
            },{
            	'cityname':'成都',
            	'cityid':180,
            },{
            	'cityname':'贵阳',
            	'cityid':180,
            },{
            	'cityname':'广州',
            	'cityid':180,
            },{
            	'cityname':'海口',
            	'cityid':180,
            },{
            	'cityname':'长沙',
            	'cityid':180,
            },{
            	'cityname':'太原',
            	'cityid':180,
            }],
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
        const sidebar = (<List className="my-list">
          {this.state.dataLeftMenu.map((item, index) => {
            return (<List.Item key={index}
            	onClick={() => {console.log(item.cityid,'cityid');}}
              
            >{item.cityname}
            </List.Item>);
          })}
        </List>);
        const separator = (sectionID, rowID) => (
          <div
            key={`${sectionID}-${rowID}`}
            style={{
              height: 10,
              borderTop: '1px solid #ECECED',
            }}
          />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            index = data.length - 1;
          }
          const obj = data[index--];
          return (
            <div key={rowID} style={{ padding: '0 15px' }}>
              <div
                style={{
                  lineHeight: '1.2',
                  color: '#000',
                  fontSize: 15,
                }}
              >{obj.title}</div>
              <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>              
                <div style={{ lineHeight: 1.2,fontSize:'14px',color:'#888'}}>
                  <div>营业时间：{obj.opentime}--{rowID}</div>
                  <div>联系电话：{obj.telephone}</div>
                  <div>门店地址：{obj.address}</div>
                </div>
              </div>
            </div>
          );
        };
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
            	<div className="lv-store-header">
            		<div className="lv-store-channel-title">
            		附近<br/>门店/充电桩
            		</div>
            		<div className="lv-pane-store-tabs">
            			<div className="lv-pane-store-tabs-inner">
            				<div className={"lv-ico-store-imga lv-ico-store-imga"+this.state.valuetypea}></div>
            				<div className={"lv-ico-store-imgb lv-ico-store-imgb"+this.state.valuetypeb}></div>
                    		<SegmentedControl
                    			className="lv-ico-store"
    				        	values={['门店','电桩']}
    				        	tintColor={'#1AAD19'}
    				        	style={{height:36}}
    				        	onChange={this.onstoreChange.bind(this)}
    				        	onValueChange={this.onstoreValueChange.bind(this)}
    				        />
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
                                  {this.state.isLoading ? 'Loading...' : 'Loaded'}
                                </div>)}
                                renderRow={row}
                                renderSeparator={separator}
                                className="am-list"
                                pageSize={4}
                                useBodyScroll
                                onScroll={() => { console.log('scroll'); }}
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
	}

    //ListView
    onEndReached (event) {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.rData = { ...this.rData, ...genData(++pageIndex) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 1000);
    }
    componentWillMount() {

    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // simulate initial Ajax
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 600);

    }
    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }    

}

export default ZmitiPubApp(ZmitiStoreApp);