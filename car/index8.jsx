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
            totalnum:0,
            currId:0,
            tabs: [
              { title: '全部',value: '0', },
            ],
            currTabCartype:'' || 0,//当前第*个车型
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
        const diylist = <ListView
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? '加载中...' : '没有了'}
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
        />;
        const nodata=<div className="lv-nodata">无数据</div>;     
        
        return (
            <div className="lv-container" style={{height:this.state.mainHeight}}>
                <div className="lv-car-nav">
                    <SegmentedControl
                      values={this.state.cartypelabel}
                      onChange={this.navOnChange.bind(this)}
                      onValueChange={this.navOnValueChange.bind(this)}
                      selectedIndex={this.setcartype.bind(this)}
                    />
                </div>
                {
                  /*
<Tabs tabs={this.state.tabs}
                  swipeable={true}                  
                  prerenderingSiblingsNumber={true}
                  page={this.props.params.id}
                  onClick={this.tabchange.bind(this)}
                >
                </Tabs>
                  */
                }
                
                <div className="lv-pane-carlist">{this.state.totalnum===0 ? nodata : diylist}</div>              
                <div className="lv-menu-bar">
                  <Zmitimenubar {...tabbarProps} ></Zmitimenubar>
                </div>
            </div>
        )
    }
    tabchange(tab,index){
      var s = this;
      var cartypeid=s.props.params.id;
      console.log(index,cartypeid,"tabindex");

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
      var val=e.nativeEvent.selectedSegmentIndex;
      console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
      window.location="./#/car/"+val;
    }
    navOnValueChange(value){
      console.log(value);
      var s = this;
      var cid=0;
      $.each(this.state.cartypelabel,function(index,item){
        if(index=cid){          
          setTimeout(() => {
            window.location="./#/car/"+cid;
          }, 600);
        }
      })
      window.location.reload();
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
    /*设置当前车型*/
    setcartype(){
      var s = this;
      var cid=0;
      if(s.props.params.id>0){ 
        cid=s.props.params.id;     
        s.state.currId=s.props.params.id;
        console.log(s.state.currId,"我是第"+s.props.params.id+"分类");
      }else{
        s.state.currId=0;
        cid=0;
        console.log("我是全部");
      }
      s.forceUpdate();
      return cid;      
    }
    /*获取数据*/
    getdatasource(pageid){
      var s = this;
      $.ajax({
        url:H5API+'h5/getcarlist',
        type:'post',
        cache:false,
        async:false,
        data:{
          page:pageid,
          //page:1,
          pagenum:NUM_ROWS,
          cartypeid:s.props.params.id,
        },
        success(result){
          //console.log(result,'result');
        	console.log('加载第'+pageid+'页');
          s.state.totalnum=result.totalnum;          
    			if(result.totalnum!=0){          
    				console.log(result.carlist,'getdata');
    				s.setState({
    				  data:result.carlist,
    				  countPageNum:Math.ceil(result.totalnum/NUM_ROWS),//共*页
    				  residueNum:result.totalnum % NUM_ROWS,//最后一页共*条
    				})
    				console.log('总共'+s.state.countPageNum+'页');
    				console.log('最后一页有'+s.state.residueNum+'条');    				
    			}
          s.forceUpdate();

        }
      })
      s.forceUpdate();
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
      this.setcartype();
    }


}

export default ZmitiPubApp(ZmitiCarlistApp);