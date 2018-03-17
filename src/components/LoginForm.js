import React, {Component} from 'react'
import Form from './common/Form'
import FormInput from './common/FormInput'

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.submitEnter = this.submitEnter.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    submitEnter(e){
        e.preventDefault();
        this.props.changeAppState('trader-cabinet');
    }

    submitRegistration(e){
        e.preventDefault();
        this.props.changeAppState('registration');
    }

    render(){
        return (
            <div>
                <Form id="enter" class="form" onSubmit={this.submitForm}>
                    <FormInput class="general input-image user_data" type="text" placeholder=" Ваш логин"/>
                    <FormInput class="general input-image user_password" type="password" placeholder=" Ваш пароль"/>
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