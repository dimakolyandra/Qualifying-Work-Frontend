import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';
import Dropdown from './Dropdown';

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
    var menuItems = menuData.map(
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
              <Dropdown setWorkPanel={this.props.setWorkPanel}/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Menu;