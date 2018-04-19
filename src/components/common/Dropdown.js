import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


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
    var currComponents = this.props.data.map(
      (item) => {
        console.log(this.props.keyState);
        return (
          <DropdownItem
            id={item.id}
            onClick={() => this.props.setWorkPanel(this.props.keyState + ":" + item.id)}>
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