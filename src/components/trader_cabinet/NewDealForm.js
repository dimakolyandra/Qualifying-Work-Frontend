import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ModalCustom from '../common/Modal';
import '../../css/newDealForm.css';


export default class newDealForm extends Component {
  constructor(props){
    super(props);
    const brokers = this.props.userBrokers.map((item) => {
      var key = Object.keys(item)[0];
      return <option>{key}</option>;
    });
    var brokersForMapp = {};
    for(var i = 0; i < this.props.userBrokers.length; i++){
      var obj = this.props.userBrokers[i];
      var key = Object.keys(obj)[0];
      brokersForMapp[key] = obj[key];
    }
    this.state = {
      showModal: false,
      sellIso: "RUB",
      buyIso: "USD",
      choosenBroker: Object.keys(this.props.userBrokers[0])[0],
      value: ""
    }
    this.brokersForMapp = brokersForMapp
    this.brokers = brokers;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
        this.setState({showModal: !this.state.showModal})
  }

  handleInputChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit(event){
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/deals/new', false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({
        sessionKey: this.props.sessionKey(),
        sellIso: this.state.sellIso,
        buyIso: this.state.buyIso,
        contractId: this.brokersForMapp[this.state.choosenBroker],
        value: this.state.value
    }));
    var resp = JSON.parse(xhr.responseText);
    if(resp.status != 'ok'){
        alert(resp.status);
        return;
    }
    this.setState({showModal: !this.state.showModal})
    console.log(resp)
  }

  render() {
    let modal = null;
    if (this.state.showModal){
        modal = <ModalCustom text="Сделка успешно открыта!" closeModal={this.closeModal}/>;
    }

    return (
      <div className="trader-cabinet-form">
      {modal}
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="sellIso">Валюта продажи</Label>
          <Input
              type="select"
              name="sellIso"
              value={this.state.sellIso}
              id="sellIso"
              onChange={this.handleInputChange}>
            <option>RUB</option>
            <option>EUR</option>
            <option>USD</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="buyIso">Валюта покупки</Label>
          <Input
            type="select"
            name="buyIso"
            value={this.state.buyIso}
            id="buyIso"
            onChange={this.handleInputChange}>
            <option>RUB</option>
            <option>EUR</option>
            <option>USD</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="chooseBroker">Выберите брокера</Label>
          <Input
            type="select"
            name="choosenBroker"
            value={this.state.choosenBroker}
            id="choosenBroker"
            onChange={this.handleInputChange}>
          {this.brokers}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="value">Сумма сделки</Label>
          <Input
            type="text"
            name="value"
            value={this.state.value}
            id="exampleEmail"
            placeholder="Сумма сделки"
            onChange={this.handleInputChange}/>
        </FormGroup>
        <Button className="submit-deal" color="primary">Подтвердить</Button>
      </Form>
      </div>
    );
  }
}