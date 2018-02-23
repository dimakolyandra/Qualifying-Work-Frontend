import React, {Component} from 'react'
import Form from './Form'

import FormInput from './FormInput'

class LoginDataForms extends Component{
    render(){
        return (
                <div>
                    <Form id="loginData" class="form">
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Введите новый логин"
                            onChange={this.handleInputChange}
                            name="login"
                        />
                        <FormInput
                            class="general user_password"
                            type="password"
                            placeholder="Введите новый пароль"
                            onChange={this.handleInputChange}
                            name="password"
                        />
                        <p class="for-form">
                            <button class="general selectedbtn" onClick={this.submitNext}>Далее</button>
                        </p>
                        <p class="for-form">
                            <button class="general selectedbtn" onClick={this.submitBack}>Назад</button>
                        </p>
                    </Form>
                </div>
        )
    }
}

export default LoginDataForms;