import React, {Component} from 'react'
import Form from '../common/Form'
import FormInput from '../common/FormInput'
import ModalCustom from '../common/Modal';


class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            "login": "",
            "password": "",
            "showModal": false
        }
        this.submitEnter = this.submitEnter.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
          this.setState({showModal: !this.state.showModal})
    }

    submitEnter(e){
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/users/login', false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
            login: this.state.login,
            password: this.state.password,
            sessionKey: this.props.getSessionKey()
        }));
        var resp = JSON.parse(xhr.responseText);
        if(resp.status != 'ok'){
            this.setState({showModal: true});
            // alert(resp.status);
            // return;
        }
        else{
            this.props.changeAppState("trader-cabinet", {firstName: resp.firstName, secondName: resp.secondName});
        }
    }

    submitRegistration(e){
        e.preventDefault();
        this.props.changeAppState('registration');
    }

    handleInputChange(event){
        console.log(this.state);
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render(){
        var modal = null;
        if (this.state.showModal){
            modal = <ModalCustom text="Данные введены неверно!" closeModal={this.closeModal}/>;
        }
        return (
            <div>
                {modal}
                <Form id="enter" class="form" onSubmit={this.submitForm}>
                    <FormInput
                        name="login"
                        class="general input-image user_data"
                        type="text"
                        placeholder=" Ваш логин"
                        onChange={this.handleInputChange}/>
                    <FormInput
                        name="password"
                        class="general input-image user_password"
                        type="password"
                        placeholder=" Ваш пароль"
                        onChange={this.handleInputChange}/>
                    <p class="for-form">
                        <button class="general selectedbtn" onClick={this.submitEnter}>Войти</button>
                    </p>
                    <p class="for-form">
                        <button class="general selectedbtn" onClick={this.submitRegistration}>Регистрация</button>
                    </p>
                </Form>
            </div>
        )
    }
};

export default LoginForm;