import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import '../../css/groupButtons.css';


class GroupButtons extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeButton: -1};
    this.setActiveButton = this.setActiveButton.bind(this);
  }

  setActiveButton(index){
    this.setState({activeButton: index});
  }

  render() {
    var items = this.props.items.map(
      (item, index) => {
        if (this.state.activeButton == index){
          return (<ListGroupItem
                    active
                    tag="button"
                    onClick={() => this.setActiveButton(index)}
                    action>
                    {item}
                  </ListGroupItem>);
        }
        else{
          return (<ListGroupItem
                    tag="button"
                    onClick={() => this.setActiveButton(index)}
                    action>
                    {item}
                  </ListGroupItem>);
        }
      });
    return (
      <div>
        <h3 className="group-title">{this.props.title}</h3>
         <div className="group smooth-scroll">
            <ListGroup>
              {items}
            </ListGroup>
          </div>
            <Button
              className="group-submit"
              onClick={() => this.props.onSubmit(this.state.activeButton)}
              color="primary">
                Подтвердить
            </Button>
      </div>
    );
  }
}

export default GroupButtons;