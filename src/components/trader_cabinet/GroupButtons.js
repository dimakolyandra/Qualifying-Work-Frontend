import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import ModalCustom from '../common/Modal';
import '../../css/groupButtons.css';


class GroupButtons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeButton: -1,
      showModal: false
    };
    var modalText = this.props.modalText;
    this.setActiveButton = this.setActiveButton.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  setActiveButton(key){
    this.setState({activeButton: key});
  }

  onSubmit(activeButton){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.props.url, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({
        sessionKey: this.props.sessionKey(),
        contractOrFirmId: this.props.items[activeButton]
    }));
    var resp = JSON.parse(xhr.responseText);
    if(resp.status != 'ok'){
        this.modalText = "Невозможно выполнить операцию с контрактом!";
        this.setState({showModal: !this.state.showModal})
        return;
    }
    else{
      this.modalText = this.props.modalText;
      this.setState({showModal: !this.state.showModal})
    }
  }

  closeModal(){
        this.setState({showModal: !this.state.showModal})
  }

  render() {
    var modal = null;
    var keys = Object.keys(this.props.items);
    var items = keys.map(
      (item) => {
        if (this.state.activeButton == item){
          return (<ListGroupItem
                    active
                    tag="button"
                    onClick={() => this.setActiveButton(item)}
                    action>
                    {item}
                  </ListGroupItem>);
        }
        else{
          return (<ListGroupItem
                    tag="button"
                    onClick={() => this.setActiveButton(item)}
                    action>
                    {item}
                  </ListGroupItem>);
        }
      });
    if(this.state.showModal){
        modal = <ModalCustom text={this.modalText} closeModal={this.closeModal}/>;
    }
    return (
      <div>
        {modal}
        <h3 className="group-title">{this.props.title}</h3>
         <div className="group smooth-scroll">
            <ListGroup>
              {items}
            </ListGroup>
          </div>
            <Button
              className="group-submit"
              onClick={() => this.onSubmit(this.state.activeButton)}
              color="primary">
                Подтвердить
            </Button>
        }
      </div>
    );
  }
}

export default GroupButtons;