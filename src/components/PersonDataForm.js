import React, {Component} from 'react'
import Form from './Form'
import FormInput from './FormInput'


class PersonDataForm extends Component{
    render(){
        return (
                <div>
                    <Form id="personData" class="form">
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Ваше имя"
                            onChange={this.props.handleInputChange}
                            name="firstName"
                        />
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Вашу фамилия"
                            onChange={this.props.handleInputChange}
                            firstName="secondName"
                        />
                        <FormInput
                            class="general user_data"
                            type="date"
                            placeholder="Дата рождения"
                            onChange={this.props.handleInputChange}
                            name="bDate"
                        />
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Пасспортные данные"
                            onChange={this.props.handleInputChange}
                            name="passportData"
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

export default PersonDataForm;