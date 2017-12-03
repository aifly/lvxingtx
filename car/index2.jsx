import 'antd-mobile/dist/antd-mobile.css';
import './static/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {ZmitiPubApp} from '../components/public/pub.jsx';
import Zmitimenubar from '../components/public/tabbar.jsx';
import $ from 'jquery';
import IScroll from 'iscroll';
import {TabBar,Tabs,ListView, Button,Picker, List, Flex, WhiteSpace,SegmentedControl } from 'antd-mobile';
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
        };
        /*this.renderTabContent = tab =>
        (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          <p>Content of {tab.value}</p>
        </div>);*/
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
                <a href={'./#/carview/'+obj.carid}><img src={WebSite+obj.path} alt={rowID}/></a>
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
                        <Flex.Item><span className="lv-font-c2">可乘：{obj.maxpassenger}人</span></Flex.Item>
                    </Flex>
                  </div>
                </div>
              </div>
            </div>
          );
        };
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                {
                  /*
<div className="lv-car-nav">
                    <SegmentedControl
                      values={this.state.cartypelabel}
                      onChange={this.navOnChange.bind(this)}
                      onValueChange={this.navOnValueChange.bind(this)}
                    />
                </div>
                  */
                }
                
                <Tabs tabs={this.state.tabs}
                  onChange={this.tabchange.bind(this)}
                >
                  {this.renderTabContent.bind(this)}
                </Tabs>
                <div className="lv-pane-carlist">
                    
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
                <div className="lv-menu-bar">
                  <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
                </div>
            </div>
        )
    }
    tabchange(tab,index){
      console.log(index,"tabindex");
    }
    renderTabContent(tab){
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          <p>Content of {tab.value}</p>
        </div>
      )
    }
    //获取车型
    getcitydata(){
      var s = this;    
      $.ajax({
        url:H5API+'h5/getcitylist',
        type:'post',
        success(result){
          //console.log(result,'result-city');               
          $.each(result.cartypedata,function(index,item){
              var ii=index+1;
              s.state.cartypedata[ii]={'label':item.label , 'value':String(item.value)};
              s.state.cartypelabel[ii]=item.label;
              s.state.tabs[ii]={'title':item.label, 'value':String(item.value)};
          })
          console.log(s.state.cartypedata,'s.state.cartypedata');
          console.log(s.state.cartypelabel,'s.state.cartypelabel');  
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
    //Listview
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
        url:H5API+'h5/getcarlist',
        type:'post',
        data:{
          page:pageid,
          //page:1,
          pagenum:NUM_ROWS,
          cartypeid:0,
        },
        success(result){
          //console.log(result,'result');
        	console.log('加载第'+pageid+'页');

    			if(result.getret===1004){          
    				console.log(result.carlist,'getdata'); 
    				s.setState({
    				  data:result.carlist,
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

      this.getdatasource(1);//默认获取第1页数据
      this.onEndReached();
      this.getcitydata();
    }


}

export default ZmitiPubApp(ZmitiCarlistApp);