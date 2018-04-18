import React, {Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Title from '../common/Title';
import TableData from '../common/Table';
import NewDealForm from './NewDealForm';
import WithdrawalOfFunds from './WithdrawalOfFunds';
import GroupButtons from './GroupButtons';
import Animation from '../common/Animation';
import Chart from './Chart';
import PaginationDisplaying from './PaginationDisplaying';
import Menu from './Menu';
import Chat from './Chat';
import {eur, usd, gbr, cny} from '../../mockedData/currencyData';
import {openedDeal} from '../../mockedData/openedDealData';
import {archieveDealData} from '../../mockedData/archieveDealData';
import {msgs} from '../../mockedData/messagesData';
import {brokersList} from '../../mockedData/brokersList';
import {accountData} from '../../mockedData/balanceAccounts';


class TraderCabinet extends Component {

  constructor(props){
    super(props);
    this.sizeOfPage = 5;
    this.pagesCount = 3;
    this.pagesBorder = {
      rightOpenedDealBorder: this.pagesCount,
      leftOpenedDealBorder: 0,
      rightArchieveDealBorder: this.pagesCount,
      leftArchieveDealBorder:  0,
    };

    this.state = {
      workPanel: "default",
      currentOpenedDealPage: 0,
      currentArchieveDealPage:  0,
    };

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

    this.getDialogs = this.getDialogs.bind(this);
    this.getListOfBrokers = this.getListOfBrokers.bind(this);
    this.addNewBrokerToUser = this.addNewBrokerToUser.bind(this);

    this.getAccounts = this.getAccounts.bind(this);
  }

  getAccounts(){
    return accountData;
  }

  getListOfBrokers(){
    // Здесь будет запрос, для получения списка брокеров,
    // не связанных с данным пользователем
    return brokersList;
  }

  addNewBrokerToUser(newBrokerId){
    // Здесь будет запрос, обновляющий список брокеров
    console.log("ADDED NEW BROKER: " + newBrokerId);
  }

  getDialogs(){
    return msgs;
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
    console.log(this.state.currentOpenedDealPage);
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
    this.setState({currentArchieveDealPage: index});
  }

  getArchieveDealCount(){
    // Здесь будет запрос к бэку, количество записей в таблице для данного пользователя
    return archieveDealData.length;
  }

  getPagesItems(currPage, countData, leftBorderProp, rightBorderProp){
    let pagesItem = Array();
    let countPage = Math.ceil(countData / this.sizeOfPage);

    if(countPage <= this.pagesCount){
      this.pagesBorder[leftBorderProp] = 0;
      this.pagesBorder[rightBorderProp] = countPage;
    }
    else if(currPage >= this.pagesBorder[rightBorderProp]){
      this.pagesBorder[leftBorderProp] = currPage;
      this.pagesBorder[rightBorderProp] = Math.min(currPage + this.pagesCount, countPage);
    }
    else if(currPage < this.pagesBorder[leftBorderProp]){
      let length = this.pagesBorder[rightBorderProp] - this.pagesBorder[leftBorderProp];
      this.pagesBorder[leftBorderProp] = Math.max(currPage - this.pagesCount + 1, 0);
      this.pagesBorder[rightBorderProp] = this.pagesBorder[rightBorderProp] - length;
    }
    for (let i = this.pagesBorder[leftBorderProp]; i < this.pagesBorder[rightBorderProp]; i++){
      pagesItem.push(i + 1);
    }
    return pagesItem;
  }

  render() {
    var workPanel = null;
    var dataPagination = null;

    if(this.state.workPanel.includes("account-balance")){
      var headData = this.getAccounts();
      workPanel = <TableData data={headData}/>
    }

    if(this.state.workPanel.includes("withdrawal-of-funds")){
      var headData = this.getAccounts();
      workPanel = <WithdrawalOfFunds accounts={headData}/>;
    }

    if(this.state.workPanel.includes("dissolve-broker")){
      var brokersList = this.getListOfBrokers();
      workPanel = <GroupButtons items={brokersList} title="Выберите брокера для расторжения договора" onSubmit={this.addNewBrokerToUser}/>;
    }

    if(this.state.workPanel.includes("new-deal")){
      var brokersList = this.getListOfBrokers();
      workPanel = <NewDealForm userBrokers={brokersList}/>;
    }

    if(this.state.workPanel.includes("chose-broker")){
      var brokersList = this.getListOfBrokers();
      workPanel = <GroupButtons items={brokersList} title="Выберите нового брокера" onSubmit={this.addNewBrokerToUser}/>;
    }

    if (this.state.workPanel.includes("chat")){
      var dialogs = this.getDialogs();
      workPanel = <Chat dataSource={dialogs}/>;
    }

    if (this.state.workPanel.includes("quotations")){
      const currId = this.state.workPanel.split(":")[1];
      var data = this.getChartsData(currId);
      workPanel = <Chart title={currId.toUpperCase()} data={data}/>;
    }

    if(this.state.workPanel.includes("opened-deal")){
      var headData = this.getOpenedDeal();
      workPanel = <TableData data={headData}/>;

      dataPagination = (<PaginationDisplaying
                          getDealCount={this.getOpenedDealCount}
                          getPagesItems={this.getPagesItems}
                          currentOpenedPage={this.state.currentOpenedDealPage}
                          sizeOfPage={this.sizeOfPage}
                          reducePage={this.reduceOpenedDealPage}
                          increasePage={this.increaseOpenedDealPage}
                          setPage={this.setOpenedDealPage}
                          currentPage={this.state.currentOpenedDealPage}
                          leftBorder="leftOpenedDealBorder"
                          rightBorder="rightOpenedDealBorder"
                        />);
    }

    if (this.state.workPanel.includes("archieve-deal")){
      var headData = this.getOpenedDeal();
      workPanel = <TableData data={headData}/>;

      dataPagination = (<PaginationDisplaying
                          getDealCount={this.getArchieveDealCount}
                          getPagesItems={this.getPagesItems}
                          currentOpenedPage={this.state.currentArchieveDealPage}
                          sizeOfPage={this.sizeOfPage}
                          reducePage={this.reduceArchieveDealPage}
                          increasePage={this.increaseArchieveDealPage}
                          setPage={this.setArchieveDealPage}
                          currentPage={this.state.currentArchieveDealPage}
                          leftBorder="leftArchieveDealBorder"
                          rightBorder="rightArchieveDealBorder"
                        />);

    }
    return (
      <Animation transitionName="carousel-anim">
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
      </Animation>
    );
  }
}

export default TraderCabinet;