import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,ListView, Button,Picker, List, Flex, WhiteSpace,SegmentedControl } from 'antd-mobile';
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
    img: './assets/images/car-01.png',
    title: '1舒驰YTK6118EV2纯电动客车11米舒驰',
    des: 'YTK6118EV2纯电动客车11米舒驰',
  },
  {
    img: './assets/images/car-01.png',
    title: '2纯电动客车11米舒驰',
    des: '舒驰YTK6118EV2纯电动客车11米舒驰',
  },
  {
    img: './assets/images/car-01.png',
    title: '3YTK6118EV2纯电动客车11米舒驰',
    des: '6118EV2纯电动客车11米舒驰',
  },
];
const NUM_SECTIONS = 5;//第*组后加载
const NUM_ROWS_PER_SECTION = 3;//每组个数
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
class ZmitiCarlistApp extends React.Component {
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
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            selectedTab: 'redTab',
        };
    }    
  onEndReached(event){
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
    render() {
        const separator = (sectionID, rowID) => (
          <div
            key={`${sectionID}-${rowID}`}
            style={{
              backgroundColor: '#F5F5F9',
              height: 8,
              borderTop: '1px solid #ECECED',
              borderBottom: '1px solid #ECECED',
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
            <div key={rowID} className="lv-car-item">              
              <div className="lv-car-item-inner">
                <a href="/#/carview/"><img src={obj.img} alt="" /></a>
                <div className="lv-car-item-inner-con">
                  <div  className="lv-car-subtitle"><a href="/#/carview/">{obj.title}</a></div>
                    <div className="lv-car-info">
                        <Flex>
                            <Flex.Item>品牌：舒驰</Flex.Item>
                            <Flex.Item>类型：通勤车</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>续航：260KM</Flex.Item>
                            <Flex.Item><span className="lv-font-c2">可乘：46人</span></Flex.Item>
                        </Flex>
                    </div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          );
        };
        let tabbarProps ={
            selectedTab: 'redTab',
        }
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="lv-pane-carlist">
                    <div className="lv-car-nav">
                        <SegmentedControl
                          values={['全部', '通勤车', '旅游车', '商务车', '物流车']}
                          onChange={this.navOnChange.bind(this)}
                          onValueChange={this.navOnValueChange.bind(this)}
                        />
                    </div>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                          {this.state.isLoading ? '加载中...' : '加载完成'}
                        </div>)}
                        renderSectionHeader={sectionData => (
                          <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                        )}
                        renderBodyComponent={() => <MyBody />}
                        renderRow={row}
                        renderSeparator={separator}
                        style={{
                          height: this.state.height-97,
                          overflow: 'auto',
                        }}
                        pageSize={4}
                        onScroll={() => { console.log('scroll'); }}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={10}
                    />
                </div>              
                <div className="lv-menu-bar">
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
            </div>
        )
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


    componentWillMount() {

    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        setTimeout(() => {
          genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
            isLoading: false,
            height: hei,
          });
        }, 1000);
        

    }

}

export default ZmitiPubApp(ZmitiCarlistApp);