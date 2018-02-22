import React, {Component} from 'react'
import Form from './Form'
import FormInput from './FormInput'

const stagesOfRegistration = [
    'loginData',
    'personData',
    'contactsData'
]

class RegistrationForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            stageRegistrationIndex: 0,
            login: '',
            password: '',
            firstName: '',
            secondName: '',
            bDate: '',
            phone: '',
            passportData: '',
            email: ''
        };
        this.submitNext = this.submitNext.bind(this);
        this.submitBack = this.submitBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    submitNext(event){
        event.preventDefault();
        if (this.state.stageRegistrationIndex == stagesOfRegistration.length - 1){
            this.props.changeAppState('choseBroker');
        }
        else{
            this.setState({stageRegistration: ++this.state.stageRegistrationIndex});
        }
    }

    submitBack(event){
        event.preventDefault();
        if (this.state.stageRegistrationIndex == 0){
            this.props.changeAppState('login');
        }
        else{
            this.setState({stageRegistration: --this.state.stageRegistrationIndex});
        }
    }

    handleInputChange(event){
        console.log(this.state);
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    render(){
        let form = null;
        let stateRegistration = stagesOfRegistration[this.state.stageRegistrationIndex];
        if (stateRegistration == 'loginData'){
            form = (
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
            );
        }
        if (stateRegistration == 'personData'){
            form = (
                <div>
                    <Form id="personData" class="form">
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Ваше имя"
                            onChange={this.handleInputChange}
                            name="firstName"
                        />
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Вашу фамилия"
                            onChange={this.handleInputChange}
                            firstName="secondName"
                        />
                        <FormInput
                            class="general user_data"
                            type="date"
                            placeholder="Дата рождения"
                            onChange={this.handleInputChange}
                            name="bDate"
                        />
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Пасспортные данные"
                            onChange={this.handleInputChange}
                            name="passportData"
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

        return (
            <div>
                {form}
            </div>
        )
    }
};

export default RegistrationForm;