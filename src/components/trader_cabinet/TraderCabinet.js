import React, {Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Title from '../common/Title';
import TableData from '../common/Table';
import  DataPagination from '../common/DataPagination';
import Chart from './Chart';
import Menu from './Menu';
import {eur, usd, gbr, cny} from '../../mockedData/currencyData'
import {openedDeal} from '../../mockedData/openedDealData'

class TraderCabinet extends Component {

  constructor(props){
    super(props);
    this.state = {
      workPanel: "default",
      currentPage: 0
    };
    this.setWorkPanel = this.setWorkPanel.bind(this);
    this.getChartsData = this.getChartsData.bind(this);
    this.getOpenedDeal = this.getOpenedDeal.bind(this);
    this.increasePage = this.increasePage.bind(this);
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

  getOpenedDeal(currentPage){
    // Здесь будет запрос к бэку, получающий порцию данных
    const indBegin = currentPage * 5;
    const indEnd = (currentPage + 1) * 5;
    console.log(indBegin);
    console.log(indEnd);
    return openedDeal.slice(indBegin, indEnd);
  }

  increasePage(){
    this.setState({currentPage: this.state.currentPage++});
  }

  redusePage(){
    this.setState({currentPage: this.state.currentPage--});
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
      var headData = this.getOpenedDeal(this.state.currentPage);
      workPanel = <TableData data={headData}/>
      dataPagination = (<DataPagination
                          pages={new Array()}
                          redusePage={this.redusePage}
                          increasePage={this.increasePage}
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