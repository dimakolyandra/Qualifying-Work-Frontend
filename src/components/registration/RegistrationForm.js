import React, {Component} from 'react'
import LoginDataForm from './LoginDataForm'
import PersonDataForm from './PersonDataForm'
import ContactsDataForm from './ContactsDataForm'
import ModalCustom from '../common/Modal';
import ChooseBroker from './ChooseBroker';


const stagesOfRegistration = [
    'loginData',
    'personData',
    'contactsData',
    'brokersList'
]

class RegistrationForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            stageRegistrationIndex: 0,
            user: {
                login: '',
                password: '',
                firstName: '',
                secondName: '',
                birthday: '',
                phoneNumber: '',
                passportData: '',
                userType:  0
            }
        };
        this.submitNext = this.submitNext.bind(this);
        this.submitBack = this.submitBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.finishRegistration = this.finishRegistration.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.setState({showModal: !this.state.showModal})
    }

    finishRegistration(brokerId){
        var xhr = new XMLHttpRequest();
        console.log(brokerId);
        xhr.open('POST', '/users/register', false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
            newUser: this.state.user,
            brokerId: brokerId,
            sessionKey: this.props.getSessionKey()})
        );
        var resp = JSON.parse(xhr.responseText);
        if(resp.status != 'ok'){
            alert(resp.status);
            return;
        }
        else{
            this.props.changeAppState("trader-cabinet", this.state.user);
        }
    }

    submitNext(event){
        event.preventDefault();

        if (this.state.stageRegistrationIndex == 0){
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/users/count', false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify({
                "login": this.state.user.login,
                "sessionKey": this.props.getSessionKey()})
            );
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);
            if(resp.status != 'ok'){
                alert(resp.status)
                return;
            }
            else if (resp.userCount > 0){
                this.setState({showModal: true});
                return;
            }
            else{
                this.setState({showModal: false});
            }
        }
        else if (this.state.stageRegistrationIndex == 2){
            this.props.changeAppState('chooseBroker');
        }
        this.setState({stageRegistration: ++this.state.stageRegistrationIndex});
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
        const name = event.target.name;
        const value = event.target.value;
        if (name != 'email'){
            this.state.user[name] = value;
        }
    }

    render(){
        let form = null;
        let modal = null;
        if (this.state.showModal){
           modal = <ModalCustom text="Логин уже занят, введите другой!" closeModal={this.closeModal}/>;
        }
        let stateRegistration = stagesOfRegistration[this.state.stageRegistrationIndex];
        console.log("STATE_REG: " + stateRegistration);
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
        if (stateRegistration == 'brokersList'){
            form = <ChooseBroker finishRegistration={this.finishRegistration}/>;
        }
        return (
            <div>
                {modal}
                {form}
            </div>
        )
    }
};

export default RegistrationForm;