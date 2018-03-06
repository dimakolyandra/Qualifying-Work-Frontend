import React, {Component} from 'react'
import Form from '../common/Form'
import FormInput from '../common/FormInput'


class ContactsDataForm extends Component{
    render(){
        return (
                <div>
                    <Form id="contactsData" class="form">
                        <FormInput
                            class="general input-image phone"
                            type="text"
                            placeholder="Телефон"
                            onChange={this.props.handleInputChange}
                            name="phone"
                        />
                        <FormInput
                            class="general input-image email"
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