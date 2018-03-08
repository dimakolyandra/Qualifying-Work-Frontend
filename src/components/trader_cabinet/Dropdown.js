import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const currency = [
  {
    "id": "eur",
    "label": "EUR/RUB"
  },
  {
    "id": "usd",
    "label": "USD/RUB"
  },
  {
    "id": "gbr",
    "label": "GBP/RUB"
  },
  {
    "id": "cny",
    "label": "CNY/RUB"
  }
]

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    var currComponents = currency.map(
      (item) => {
        return (
          <DropdownItem
            id={item.id}
            onClick={() => this.props.setWorkPanel("quotations:" + item.id)}>
              {item.label}
          </DropdownItem>
        );
      }
    );
    return (
      <ButtonDropdown id="quotations" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Котировки валют
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Тип валюты</DropdownItem>
          {currComponents}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default Dropdown;