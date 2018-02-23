import React, {Component} from 'react'
import Form from './Form'
import FormInput from './FormInput'


class ContactsDataForm extends Component{
    render(){
        return (
                <div>
                    <Form id="contactsData" class="form">
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Телефон"
                            onChange={this.props.handleInputChange}
                            name="phone"
                        />
                        <FormInput
                            class="general user_data"
                            type="text"
                            placeholder="Электр. почта"
                            onChange={this.props.handleInputChange}
                            name="email"
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

export default ContactsDataForm;