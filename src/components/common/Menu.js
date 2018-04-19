import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';
import Dropdown from './Dropdown';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    var dropDown;
    if (this.props.hasDropdown){
      dropDown = <Dropdown
                    setWorkPanel={this.props.setWorkPanel}
                    data={this.props.dropdownData}
                    keyState={this.props.dropdownKey}
                  />
    }
    var menuItems = this.props.menuData.map(
      (item) => {
        return (
          <NavItem>
            <Button id={item.id} onClick={() => this.props.setWorkPanel(item.id)}>{item.label}</Button>
          </NavItem>
        );
      }
    )
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Меню</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {menuItems}
              {dropDown}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Menu;