import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createForm from 'rc-form';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {SegmentedControl,TabBar,Flex, Button,ListView, List, WhiteSpace,Drawer,NavBar, Icon } from 'antd-mobile';
import { provinceLite as province } from 'antd-mobile-demo-data';
const Item = List.Item;
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}
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
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}
class ZmitiStoreApp extends React.Component {
    constructor(args) {
        super(...args);
	    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
	    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

	    const dataSource = new ListView.DataSource({
	      getRowData,
	      getSectionHeaderData: getSectionData,
	      rowHasChanged: (row1, row2) => row1 !== row2,
	      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
	    });
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            visible: false,
		      dataSource,
		      isLoading: true,
		      height: document.documentElement.clientHeight * 3 / 4,
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
            open: true,//默认关闭左侧菜单
            selectedTab: 'greenTab',
            hidden: false,
            fullScreen: false,
        }
        this.onOpenChange = (...args) => {
          console.log(args);
          this.setState({ open: !this.state.open });
        }
        this.onEndReached = (event) => {
		    // load new data
		    // hasMore: from backend data, indicates whether it is the last page, here is false
		    if (this.state.isLoading && !this.state.hasMore) {
		      return;
		    }
		    console.log('reach end', event);
		    this.setState({ isLoading: true });
		    setTimeout(() => {
		      genData(++pageIndex);
		      this.setState({
		        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
		        isLoading: false,
		      });
		    }, 1000);
		  }
    }    
    pagelinks(pageText) {
        window.location=pageText;
    }
    render() {
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
	              fontSize: 18,
	            }}
	          >{obj.title}</div>
	          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>	            
	            <div style={{ lineHeight: 1.2,color:'#888'}}>
	              <div>营业时间：{obj.opentime}--{rowID}</div>
	              <div>联系电话：{obj.telephone}</div>
	              <div>门店地址：{obj.address}</div>
	            </div>
	          </div>
	        </div>
	      );
	    };
        const sidebar = (<List className="my-list">
          {this.state.dataLeftMenu.map((item, index) => {
            return (<List.Item key={index}
            	onClick={() => {console.log(item.cityid,'cityid')}}
            >{item.cityname}
            </List.Item>);
          })}
        </List>);
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
            	<div className="lv-store-header">
            		<div className="lv-store-channel-title">
            		附件<br/>门店/充电桩
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
                <div className="wrapper lv-page-store" ref="wrapper" style={{height:this.state.mainHeight-110}}>
                    <div className="scroller">            
                        <div className="lv-pane">
                            <div className="lv-pane-store">
                                <div className="lv-pane-store-inner">
                                	<div className="lv-pane-store-menu">
                                		<div className="lv-pane-store-menu-inner">											
											{sidebar}
                                		</div>
                                	</div>
                                    <div className="lv-pane-store-con">
                                    	
                                    	<div className="lv-pane-store-listpane">
                                    		<div className="lv-pane-store-listpane-inner">
										      <ListView
										        ref={el => this.lv = el}
										        dataSource={this.state.dataSource}										        
										        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
										          {this.state.isLoading ? 'Loading...' : 'Loaded'}
										        </div>)}
										        renderSectionHeader={sectionData => (
										          <div>{`Task ${sectionData.split(' ')[1]}`}</div>
										        )}
										        renderBodyComponent={() => <MyBody />}
										        renderRow={row}
										        renderSeparator={separator}
										        style={{
										          height: this.state.height-110,
										          overflow: 'auto',
										        }}
										        pageSize={4}
										        onScroll={() => { console.log('scroll'); }}
										        scrollRenderAheadDistance={500}
										        onEndReached={this.onEndReached}
										        onEndReachedThreshold={10}
										      />
                                    		</div>
                                    	</div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <TabBar
                  unselectedTintColor="#949494"
                  tintColor="#22ac38"
                  barTintColor="white"
                  hidden={this.state.hidden}
                >
                  <TabBar.Item
                    title="首页"
                    key="home"
                    icon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(./assets/images/menu-ico-1.png) center center /  21px 21px no-repeat' }}
                    />
                    }
                    selectedIcon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(./assets/images/menu-ico-c1.png) center center /  21px 21px no-repeat' }}
                    />
                    }
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={this.pagelinks.bind(this,'./#/')}
                    data-seed="logId"
                  >

                  </TabBar.Item>

                  <TabBar.Item
                    icon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(./assets/images/menu-ico-2.png) center center /  21px 21px no-repeat' }}
                      />
                    }
                    selectedIcon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(./assets/images/menu-ico-c2.png) center center /  21px 21px no-repeat' }}
                      />
                    }
                    title="车源"
                    key="car"
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={this.pagelinks.bind(this,'./#/car/')}
                    data-seed="logId1"
                  >

                  </TabBar.Item>

                  <TabBar.Item
                    icon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(./assets/images/menu-ico-3.png) center center /  21px 21px no-repeat' }}
                      />
                    }
                    selectedIcon={
                      <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(./assets/images/menu-ico-c3.png) center center /  21px 21px no-repeat' }}
                      />
                    }
                    title="门店"
                    key="store"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={this.pagelinks.bind(this,'./#/store/')}
                  >

                  </TabBar.Item>

                  <TabBar.Item
                    icon={{ uri: './assets/images/menu-ico-4.png' }}
                    selectedIcon={{ uri: './assets/images/menu-ico-c4.png' }}
                    title="需求"
                    key="order"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={this.pagelinks.bind(this,'./#/order/')}
                  >

                  </TabBar.Item>
                </TabBar>
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
	onstoreValueChange (value) {
	    //console.log(value);
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
	    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
	    // simulate initial Ajax
	    setTimeout(() => {
	      genData();
	      this.setState({
	        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
	        isLoading: false,
	        height: hei,
	      });
	    }, 600);
    }
    

}

export default ZmitiPubApp(ZmitiStoreApp);