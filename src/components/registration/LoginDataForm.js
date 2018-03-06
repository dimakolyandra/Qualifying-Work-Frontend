import React, {Component} from 'react'
import Form from '../common/Form'
import FormInput from '../common/FormInput'


class LoginDataForm extends Component{
    render(){
        return (
                <div>
                    <Form id="loginData" class="form">
                        <FormInput
                            class="general input-image user_data"
                            type="text"
                            placeholder="Введите новый логин"
                            onChange={this.props.handleInputChange}
                            name="login"
                        />
                        <FormInput
                            class="general input-image user_password"
                            type="password"
                            placeholder="Введите новый пароль"
                            onChange={this.props.handleInputChange}
                            name="password"
                        />
                        <p class="for-form">
                            <button class="general selectedbtn" onClick={this.props.submitNext}>Далее</button>
                        </p>
                        <p class="for-form">
                            <button class="general selectedbtn" onClick={this.props.submitBack}>Назад</button>
                        </p>
                    </Form>
                </div>
        )
    }
}

export default LoginDataForm;