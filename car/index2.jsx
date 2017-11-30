import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,ListView, Button,Picker, List, Flex, WhiteSpace,SegmentedControl } from 'antd-mobile';
const H5API='http://api.ev-bluesky.com/v2/';
const WebSite='http://www.ev-bluesky.com/';
const NUM_ROWS = 5;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  //console.log(pIndex,'pIndex');//pageNum
  return dataBlob;
}
class ZmitiCarlistApp extends React.Component {
    constructor(args) {
        super(...args);
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            mainHeight: document.documentElement.clientHeight,
            dataSource,
            isLoading: true,
            page:1,
            data: [
              {
                path: './assets/images/car-01.png',
                carname: '7舒驰YTK6118EV2纯电动客车11米舒驰',
              },
              {
                path: './assets/images/car-01.png',
                carname: '8纯电动客车11米舒驰',
              },
              {
                path: './assets/images/car-01.png',
                carname: '9舒驰YTK6118EV2纯电动客车11米舒驰',
              },
            ],
        };
    }    

    render() {

        
        let tabbarProps ={
            selectedTab: 'redTab',
        }
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
        let index = this.state.data.length - 1;
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            index = this.state.data.length - 1;
          }
          const obj = this.state.data[index--];
          return (
            <div key={rowID} className="lv-car-item">
              <div className="lv-car-item-inner">
                <a href={'./#/carview/'+obj.carid}><img src={WebSite+obj.path} alt={obj.carname}/></a>
                <div className="lv-car-item-inner-con">
                  <div  className="lv-car-subtitle"><a href={'./#/carview/'+obj.carid}>{obj.carname}</a></div>                  
                  <div className="lv-car-info">
                    <div style={{ display: 'none'}}><span>{rowID}</span></div>
                    <Flex>
                        <Flex.Item>品牌：{obj.brandname}</Flex.Item>
                        <Flex.Item>类型：{obj.typename}</Flex.Item>
                    </Flex>
                    <Flex>
                        <Flex.Item>续航：{obj.life}KM</Flex.Item>
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
                <div className="lv-car-nav">
                    <SegmentedControl
                      values={['全部', '通勤车', '旅游车', '商务车', '物流车']}
                      onChange={this.navOnChange.bind(this)}
                      onValueChange={this.navOnValueChange.bind(this)}
                    />
                </div>
                <div className="lv-pane-carlist">
                    
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
                      onScroll={this.getscrollpage.bind(this)}
                      scrollRenderAheadDistance={500}
                      onEndReached={this.onEndReached.bind(this)}
                      onEndReachedThreshold={10}
                    />
                </div>              
                <div className="lv-menu-bar">
                  <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
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
    //Listview
    onEndReached(event){
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading && !this.state.hasMore) {
        return false;
      }
      console.log('reach end', event);
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.rData = { ...this.rData, ...genData(++pageIndex) };
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
        console.log(pageIndex,'pageIndex');
      }, 1000);
    }
    //获取数据
    getdatasource(){
      var s = this;    
      $.ajax({
        url:H5API+'h5/getcarlist',
        type:'post',
        data:{
          page:s.state.page,
          pagenum:5,
          cartypeid:0,
        },
        success(result){
          if(result.getret===1004){          
            console.log(result,'getdata'); 
            s.setState({
              data:result.carlist,
            })
            s.forceUpdate();
          }

        }
      })
      s.forceUpdate();
    }
    //滚动
    getscrollpage(){
      var s = this;
      console.log('scroll');

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

      this.getdatasource();
    }


}

export default ZmitiPubApp(ZmitiCarlistApp);