import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {ListView, Button,Picker, List, Flex, WhiteSpace,SegmentedControl } from 'antd-mobile';
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
    title: '舒驰YTK6118EV2纯电动客车11米舒驰',
    des: 'YTK6118EV2纯电动客车11米舒驰',
  },
  {
    img: './assets/images/car-01.png',
    title: '纯电动客车11米舒驰',
    des: '舒驰YTK6118EV2纯电动客车11米舒驰',
  },
  {
    img: './assets/images/car-01.png',
    title: 'YTK6118EV2纯电动客车11米舒驰',
    des: '6118EV2纯电动客车11米舒驰',
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
        };
        this.onEndReached = (event) => {
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
                <img src={obj.img} alt="" />
                <div className="lv-car-item-inner-con">
                  <div  className="lv-car-subtitle">{obj.title}</div>
                    <div className="lv-car-info">
                        <Flex>
                            <Flex.Item>品牌：舒驰</Flex.Item>
                            <Flex.Item>类型：通勤车车</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>续航：260KM</Flex.Item>
                            <Flex.Item><span className="lv-font-c2">可乘：46人</span></Flex.Item>
                        </Flex>
                    </div>
                </div>
              </div>
            </div>
          );
        };

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
                          {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderSectionHeader={sectionData => (
                          <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                        )}
                        renderBodyComponent={() => <MyBody />}
                        renderRow={row}
                        renderSeparator={separator}
                        style={{
                          height: this.state.height-84,
                          overflow: 'auto',
                        }}
                        pageSize={4}
                        onScroll={() => { console.log('scroll'); }}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
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
        }, 600);
        

    }

}

export default ZmitiPubApp(ZmitiCarlistApp);