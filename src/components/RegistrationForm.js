import React, {Component} from 'react'
import LoginDataForm from './LoginDataForm'
import PersonDataForm from './PersonDataForm'
import ContactsDataForm from './ContactsDataForm'

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
            form = <LoginDataForm
                        submitNext={this.submitNext}
                        submitBack={this.submitBack}
                        handleInputChange={this.handleInputChange}
                    />;
        }
        if (stateRegistration == 'personData'){
            form = <PersonDataForm
                        submitNext={this.submitNext}
                        submitBack={this.submitBack}
                        handleInputChange={this.handleInputChange}
                    />;
        }
        if (stateRegistration == 'contactsData'){
            form = <ContactsDataForm
                        submitNext={this.submitNext}
                        submitBack={this.submitBack}
                        handleInputChange={this.handleInputChange}
                    />;
        }
        return (
            <div>
                {form}
            </div>
        )
    }
};

export default RegistrationForm;