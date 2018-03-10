import React, {Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Title from '../common/Title';
import TableData from '../common/Table';
import  DataPagination from '../common/DataPagination';
import Chart from './Chart';
import Menu from './Menu';
import {eur, usd, gbr, cny} from '../../mockedData/currencyData';
import {openedDeal} from '../../mockedData/openedDealData';
import {archieveDealData} from '../../mockedData/archieveDealData';


class TraderCabinet extends Component {

  constructor(props){
    super(props);
    this.state = {
      workPanel: "default",
      currentOpenedDealPage: 0,
      currentArchieveDealPage: 0
    };
    this.sizeOfPage = 5;
    this.pagesCount = 3;
    this.setWorkPanel = this.setWorkPanel.bind(this);
    this.getChartsData = this.getChartsData.bind(this);
    this.getPagesItems = this.getPagesItems.bind(this);

    this.getOpenedDeal = this.getOpenedDeal.bind(this);
    this.getOpenedDealCount = this.getOpenedDealCount.bind(this);
    this.increaseOpenedDealPage = this.increaseOpenedDealPage.bind(this);
    this.reduceOpenedDealPage = this.reduceOpenedDealPage.bind(this);
    this.setOpenedDealPage = this.setOpenedDealPage.bind(this);

    this.getArchieveDeal = this.getArchieveDeal.bind(this);
    this.getArchieveDealCount = this.getArchieveDealCount.bind(this);
    this.increaseArchieveDealPage = this.increaseArchieveDealPage.bind(this);
    this.reduceArchieveDealPage = this.reduceArchieveDealPage.bind(this);
    this.setArchieveDealPage = this.setArchieveDealPage.bind(this);

  }

  setWorkPanel(workPanel){
    this.setState({
      workPanel: workPanel
    });
  }

  getChartsData(currId){
    console.log(currId);
    var data = null;
    switch(currId){
      case 'eur':
        data = eur;
        break;
      case 'usd':
        data = usd;
        break;
      case 'gbr':
        data = gbr;
        break;
      case 'cny':
        data = cny;
        break;
    }
    return data;
  }

  increaseOpenedDealPage(){
    console.log("INCREASE")
    this.setState({currentOpenedDealPage: ++this.state.currentOpenedDealPage});
  }

  reduceOpenedDealPage(){
    this.setState({currentOpenedDealPage: --this.state.currentOpenedDealPage});
  }

  getOpenedDeal(){
    // Здесь будет запрос к бэку, получающий порцию данных,
    let indBegin = this.state.currentOpenedDealPage * this.sizeOfPage;
    let indEnd = (this.state.currentOpenedDealPage + 1) * this.sizeOfPage;
    return openedDeal.slice(indBegin, indEnd);
  }

  setOpenedDealPage(index){
    console.log("SET PAGE");
    this.setState({currentOpenedDealPage: index});
  }

  getOpenedDealCount(){
    // Здесь будет запрос к бэку, количество записей в таблице для данного пользователя
    return openedDeal.length;
  }

  increaseArchieveDealPage(){
    this.setState({currentArchieveDealPage: ++this.state.currentArchieveDealPage});
  }

  reduceArchieveDealPage(){
    this.setState({currentArchieveDealPage: --this.state.currentArchieveDealPage});
  }

  getArchieveDeal(){
    // Здесь будет запрос к бэку, получающий порцию данных,
    let indBegin = this.state.currentArchieveDealPage * this.sizeOfPage;
    let indEnd = (this.state.currentArchieveDealPage + 1) * this.sizeOfPage;
    return archieveDealData.slice(indBegin, indEnd);
  }

  setArchieveDealPage(index){
    console.log("SET PAGE");
    this.setState({currentArchieveDealPage: index});
  }

  getArchieveDealCount(){
    // Здесь будет запрос к бэку, количество записей в таблице для данного пользователя
    return archieveDealData.length;
  }

  getPagesItems(currPage, countData){
    let pagesItem = Array();
    let countPage = Math.ceil(countData / this.sizeOfPage);
    let startIndex;
    let endIndex;

    if(countPage <= this.pagesCount){
      startIndex = 0;
      endIndex = countPage;
    }
    else if (currPage == 0){
      startIndex = 0;
      endIndex = this.pagesCount;
    }
    else if( currPage > countPage - this.pagesCount){
      startIndex = countPage - this.pagesCount;
      endIndex = countPage;
    }
    else{
        startIndex = currPage;
        endIndex = currPage + this.pagesCount;
    }
    for (let i = startIndex; i < endIndex; i++){
      pagesItem.push(i + 1);
    }
    return pagesItem;
  }

  render() {
    var workPanel = null;
    var dataPagination = null;

    if (this.state.workPanel.includes("quotations")){
      const currId = this.state.workPanel.split(":")[1];
      var data = this.getChartsData(currId);
      workPanel = <Chart title={currId.toUpperCase()} data={data}/>;
    }

    if(this.state.workPanel.includes("opened-deal")){
      var headData = this.getOpenedDeal();
      var countOpenDealData = this.getOpenedDealCount();
      var pagesItems = this.getPagesItems(this.state.currentOpenedDealPage, countOpenDealData);

      var isPrevDisabl = true ? this.state.currentOpenedDealPage == 0 : false;
      var isNextDisabl = true ? (this.state.currentOpenedDealPage * this.sizeOfPage + this.sizeOfPage >= countOpenDealData): false;

      workPanel = <TableData data={headData}/>
      dataPagination = (<DataPagination
                          pages={pagesItems}
                          isPrevDisabl={isPrevDisabl}
                          isNextDisabl={isNextDisabl}
                          reducePage={this.reduceOpenedDealPage}
                          increasePage={this.increaseOpenedDealPage}
                          setPage={this.setOpenedDealPage}
                          active={this.state.currentOpenedDealPage}
                        />);
    }
    if (this.state.workPanel.includes("archieve-deal")){
      var headData = this.getArchieveDeal();
      var countArchieveDealData = this.getArchieveDealCount();
      var pagesItems = this.getPagesItems(this.state.currentArchieveDealPage, countArchieveDealData);

      var isPrevDisabl = true ? this.state.currentArchieveDealPage == 0 : false;
      var isNextDisabl = true ? (this.state.currentArchieveDealPage * this.sizeOfPage + this.sizeOfPage >= countArchieveDealData): false;

      workPanel = <TableData data={headData}/>
      dataPagination = (<DataPagination
                          pages={pagesItems}
                          isPrevDisabl={isPrevDisabl}
                          isNextDisabl={isNextDisabl}
                          reducePage={this.reduceArchieveDealPage}
                          increasePage={this.increaseArchieveDealPage}
                          setPage={this.setArchieveDealPage}
                          active={this.state.currentArchieveDealPage}
                        />);
    }
    return (
        <div id="peson-cabinet">
          <Title text="Личный кабинет трейдера"/>
          <div id="menu">
            <Menu setWorkPanel={this.setWorkPanel}/>
          </div>
          <div id="workPanel">
            {workPanel}
            {dataPagination}
          </div>
        </div>
    );
  }
}
export default TraderCabinet;