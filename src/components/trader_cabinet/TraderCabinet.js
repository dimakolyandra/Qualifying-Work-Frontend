import React, {Component} from 'react';
import Title from '../common/Title';
import TableData from '../common/Table';
import NewDealForm from './NewDealForm';
import WithdrawalOfFunds from './WithdrawalOfFunds';
import GroupButtons from './GroupButtons';
import Animation from '../common/Animation';
import Chart from './Chart';
import PaginationDisplaying from './PaginationDisplaying';
import Menu from '../common/Menu';
import Chat from '../common/Chat';
import {eur, usd, gbr, cny} from '../../mockedData/currencyData';
// import {openedDeal} from '../../mockedData/openedDealData';
import {archieveDealData} from '../../mockedData/archieveDealData';
import {msgs} from '../../mockedData/messagesData';
import {brokersList} from '../../mockedData/brokersList';
import {accountData} from '../../mockedData/balanceAccounts';


const currency = [
  {
    "id": "eur",
    "label": "EUR/RUB"
  },
  {
    "id": "usd",
    "label": "USD/RUB"
  }
]


const menuData = [
  {
    "id": "opened-deal",
    "label": "Открытые сделки"
  },
  {
    "id": "archieve-deal",
    "label": "Архив сделок"
  },
  {
    "id": "chose-broker",
    "label": "Заключить договор"
  },
  {
    "id": "new-deal",
    "label": "Новая сделка"
  },
  {
    "id": "chat",
    "label": "Чат с брокером"
  },
  {
    "id": "dissolve-broker",
    "label": "Расторгнуть договор"
  },
  {
    "id": "account-balance",
    "label": "Баланс счетов"
  },
  {
    "id": "withdrawal-of-funds",
    "label": "Вывод средств"
  },

]


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
    this.openNewDeal = this.openNewDeal.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
  }

  openNewDeal(){}

  getAccounts(){
    return accountData;
  }

  getListOfBrokers(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contracts/list', false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({
        sessionKey: this.props.getSessionKey()
    }));
    var resp = JSON.parse(xhr.responseText);
    if(resp.status != 'ok'){
        alert(resp.status);
        return;
    }
    var listBrokers = resp.contracts.map( (item)=> {
      var dict = {};
      var name = item.firmName;
      var val = item.contractId;
      return {[name]: val}
    })
    return listBrokers;
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
    let indBegin = this.state.currentOpenedDealPage * this.sizeOfPage;
    let indEnd = (this.state.currentOpenedDealPage + 1) * this.sizeOfPage;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/deals/open', false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({
        sessionKey: this.props.getSessionKey(),
        startInd: indBegin,
        endInd: indEnd
    }));
    var resp = JSON.parse(xhr.responseText);
    if(resp.status != 'ok'){
        alert("Unable to see opened deals");
        return;
    }
    var openedDeals = resp.deals.map((item) => {
      var newItem = {
        "ID": item.id,
        "Дата открытия": item.dateOpen,
        "Сумма": item.value,
        "Счёт списания": item.sellAccount,
        "Счёт зачисления": item.buyAccount,
        "Валюта продажи": item.sellIso,
        "Валюта покупки": item.buyIso,
        "Данные брокера": item.brokersData
      }

      return newItem;
    });
    return {deals: openedDeals, count: resp.dealsCount};
  }

  setOpenedDealPage(index){
    this.setState({currentOpenedDealPage: index});
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
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/deals/archieve', false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({
        sessionKey: this.props.getSessionKey(),
        startInd: indBegin,
        endInd: indEnd
    }));
    var resp = JSON.parse(xhr.responseText);
    if(resp.status != 'ok'){
        alert("Unable to see opened deals");
        return;
    }
    var openedDeals = resp.deals.map((item) => {
      var newItem = {
        "ID": item.id,
        "Дата открытия": item.dateOpen,
        "Сумма": item.value,
        "Счёт списания": item.sellAccount,
        "Счёт зачисления": item.buyAccount,
        "Валюта продажи": item.sellIso,
        "Валюта покупки": item.buyIso,
        "Данные брокера": item.brokersData
      }

      return newItem;
    });
    return {deals: openedDeals, count: resp.dealsCount};
    // return archieveDealData.slice(indBegin, indEnd);
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
      workPanel = <GroupButtons
                    items={brokersList}
                    title="Выберите брокера для расторжения договора"
                    onSubmit={this.addNewBrokerToUser}
                  />;
    }

    if(this.state.workPanel.includes("new-deal")){
      var brokersList = this.getListOfBrokers();
      workPanel = <NewDealForm
                      sessionKey={this.props.getSessionKey}
                      onSubmit={this.props.openNewDeal}
                      userBrokers={brokersList}
                      traderContracts={this.state.traderContracts}/>;
    }

    if(this.state.workPanel.includes("chose-broker")){
      var brokersList = this.getListOfBrokers();
      workPanel = <GroupButtons
                    items={brokersList}
                    title="Выберите нового брокера"
                    onSubmit={this.addNewBrokerToUser}
                  />;
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
      if (headData.count != 0){
        workPanel = <TableData data={headData.deals}/>;
        dataPagination = (<PaginationDisplaying
                          countData={headData.count}
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
      else{
        this.setState({workPanel: ""});
      }
    }

    if (this.state.workPanel.includes("archieve-deal")){
      var headData = this.getArchieveDeal();
      if (headData.count != 0){
        workPanel = <TableData data={headData.deals}/>;
        dataPagination = (<PaginationDisplaying
                            countData={headData.count}
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
      else{
        this.setState({workPanel: ""});
        // workPanel = null;
        // dataPagination = null;
      }
    }
    var title = "Личный кабинет трейдера: " + this.props.userData.firstName + " " + this.props.userData.secondName;
    return (
      <Animation transitionName="carousel-anim">
        <div id="peson-cabinet">
          <Title text={title}/>
          <div id="menu">
            <Menu
              setWorkPanel={this.setWorkPanel}
              menuData={menuData}
              hasDropdown={true}
              dropdownData={currency}
              dropdownKey="quotations"/>
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