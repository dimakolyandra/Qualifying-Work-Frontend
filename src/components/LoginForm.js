import React, {Component} from 'react'
import '../css/loginform.css'

class LoginForm extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <form id="enter" class="form" action="enter-system" method="POST" commandName="user">
                    <p class="for-form"><input class="user_data" type="text" path="login" placeholder="Ваш логин" /></p>
                    <p class="for-form"><input class="user_data" type="password" path="password" placeholder="Ваш пароль"/></p>
                    <p class="for-form"><input class="enter" type="submit" value="Войти"/></p>
                </form>
                <form id="registration" action="registration" method="GET">
                    <p class="for-form"><input class="registration" type="submit" value="Регистрация"/></p>
                </form>
            </div>
        )
    }
};

export default LoginForm;