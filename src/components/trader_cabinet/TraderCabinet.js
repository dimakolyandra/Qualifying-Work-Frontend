import React, {Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Menu from './Menu';
import Title from '../common/Title';
import Chart from './Chart';


class TraderCabinet extends Component {

  constructor(props){
    super(props);
    this.state = {workPanel: "default"}
    this.setWorkPanel = this.setWorkPanel.bind(this)
  }

  setWorkPanel(workPanel){
    console.log(workPanel);
    this.setState({
      workPanel: workPanel
    });
  }

  render() {
    var workPanel;
    console.log(this.state);
    if (this.state.workPanel == "quotations"){
      workPanel = <Chart/>;
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