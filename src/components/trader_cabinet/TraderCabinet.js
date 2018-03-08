import React, {Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Menu from './Menu';
import Title from '../common/Title';
import Chart from './Chart';
import Filter from './Filter';

const eur = [
  {x: 1, y: 13000},
  {x: 2, y: 16500},
  {x: 3, y: 14250},
  {x: 4, y: 10000},
  {x: 5, y: 13000},
  {x: 6, y: 16500},
  {x: 7, y: 14250},
  {x: 8, y: 11000},
  {x: 9, y: 13000},
  {x: 10,y: 16500},
];

const usd = [
  {x: 1, y: 1300},
  {x: 2, y: 2650},
  {x: 3, y: 1125},
  {x: 4, y: 1001},
  {x: 5, y: 1102},
  {x: 6, y: 1123},
  {x: 7, y: 1425},
  {x: 8, y: 1567},
  {x: 9, y: 1872},
  {x: 10,y: 1873},
];

const gbr = [
  {x: 1, y: 1003000},
  {x: 2, y: 1002650},
  {x: 3, y: 1001125},
  {x: 4, y: 1001001},
  {x: 5, y: 1102000},
  {x: 6, y: 1123000},
  {x: 7, y: 1425000},
  {x: 8, y: 1567000},
  {x: 9, y: 1872000},
  {x: 10,y: 1873000},
];

const cny = [
  {x: 1, y: 1},
  {x: 2, y: 1},
  {x: 3, y: 1},
  {x: 4, y: 1},
  {x: 5, y: 1},
  {x: 6, y: 1},
  {x: 7, y: 1},
  {x: 8, y: 1},
  {x: 9, y: 1},
  {x: 10,y: 1},
];

class TraderCabinet extends Component {

  constructor(props){
    super(props);
    this.state = {workPanel: "default"};
    this.setWorkPanel = this.setWorkPanel.bind(this);
    this.getChartsData = this.getChartsData.bind(this);
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

  render() {
    var workPanel = null;

    if (this.state.workPanel.includes("quotations")){
      const currId = this.state.workPanel.split(":")[1];
      var data = this.getChartsData(currId);
      console.log(data);
      workPanel = <Chart data={data}/>;
    }
    return (
        <div id="peson-cabinet">
          <Title text="Личный кабинет трейдера"/>
          <div id="menu">
            <Menu setWorkPanel={this.setWorkPanel}/>
          </div>
          <div id="workPanel">
            {workPanel}
          </div>
        </div>
    );
  }
}
export default TraderCabinet;