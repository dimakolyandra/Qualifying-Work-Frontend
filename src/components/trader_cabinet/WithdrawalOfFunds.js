import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../css/newDealForm.css';

export default class WithdrawalOfFunds extends Component {
  render() {
  const accounts = this.props.accounts.map((item) => {return <option>{item["Номер счёта"] + "(" + item["Валюта (ISO)"] + ")"}</option>});
    return (
      <div className="trader-cabinet-form">
      <Form>
        <FormGroup>
          <Label for="sellCurr">Выберите счёт списания</Label>
          <Input type="select" name="select" id="sellAccount">
          {accounts}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="buyCurr">Введите номер счёта зачисления</Label>
          <Input type="text" name="selectMulti" id="buyAccount"/>
        </FormGroup>
        <FormGroup>
          <Label for="value">Сумма перевода</Label>
          <Input type="text" name="email" id="exampleEmail" placeholder="Сумма перевода"/>
        </FormGroup>
        <Button className="submit-deal" color="primary">Подтвердить</Button>
      </Form>
      </div>
    );
  }
}