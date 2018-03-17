import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../css/newDealForm.css';

export default class Example extends Component {
  render() {
  const brokers = this.props.userBrokers.map((item) => {return <option>{item}</option>});
    return (
      <div className="new-deal-form">
      <Form>
        <FormGroup>
          <Label for="sellCurr">Валюта продажи</Label>
          <Input type="select" name="select" id="sellCurr">
            <option>RUB</option>
            <option>EUR</option>
            <option>USD</option>
            <option>GBP</option>
            <option>CNY</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="buyCurr">Валюта покупки</Label>
          <Input type="select" name="selectMulti" id="buyCurr">
            <option>RUB</option>
            <option>EUR</option>
            <option>USD</option>
            <option>GBP</option>
            <option>CNY</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="chooseBroker">Выберите брокера</Label>
          <Input type="select" name="selectMulti" id="chooseBroker">
          {brokers}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="value">Выберите брокера</Label>
          <Input type="text" name="email" id="exampleEmail" placeholder="Сумма сделки"/>
        </FormGroup>
        <Button className="submit-deal" color="primary">Подтвердить</Button>
      </Form>
      </div>
    );
  }
}