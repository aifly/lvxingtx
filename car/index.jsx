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
    title: '舒驰YTK6118EV2纯电动客车11米舒驰',
    des: '6118EV2纯电动客车11米舒驰',
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
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            index = data.length - 1;
          }
          const obj = data[index--];
          return (
            <div key={rowID} className="lv-car-item">
              <div className="lv-car-item-inner">
                <a href="./#/carview/"><img src={obj.img} alt={obj.title}/></a>
                <div className="lv-car-item-inner-con">
                  <div  className="lv-car-subtitle"><a href="./#/carview/">{obj.title}</a></div>                  
                  <div className="lv-car-info">
                    <div style={{ display: 'none'}}><span>{rowID}</span></div>
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
                      onScroll={() => { console.log('scroll'); }}
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
      setTimeout(() => {
        this.rData = genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
      }, 600);

      this.getdatasource();
    }
    //获取数据
    getdatasource(){
      var s = this;

    
      $.ajax({
        url:H5API+'h5/getcarlist',
        type:'post',
        data:{
          page:0,
          pagenum:10,
          cartypeid:0,
        },
        success(data){
          if(data.getret===1004){          
            console.log(data,'getdata'); 
            var carlist=data.carlist;             
            /*$.each(data.cartypedata,function(index,item){
                var ii=index+1;
                s.state.cartypedata[0][ii]={'label':item.label , 'value':String(item.value)};
            })*/
            
            
            //console.log(s.state.citydata,'s.state.citydata');
            s.forceUpdate();
          }

        }
      })
      s.forceUpdate();
    }

}

export default ZmitiPubApp(ZmitiCarlistApp);