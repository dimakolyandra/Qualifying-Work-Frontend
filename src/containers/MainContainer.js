import React, {Component} from 'react';
import BaseCarousel from '../components/BaseCarousel';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Animation from '../components/Animation';


class MainContainer extends Component{
    constructor(props){
        super(props);
        this.state = {status: 'login'};
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(newStatus){
        this.setState({status: newStatus});
    }

    render(){
        let pageContent = null;
        if (this.state.status == 'login'){
            pageContent = <LoginForm changeAppState={this.handleStateChange}/>
        }
        if (this.state.status == 'logged'){
            pageContent = <h1>LOGGED</h1>;
        }
        if (this.state.status == 'registration'){
            pageContent = <RegistrationForm changeAppState={this.handleStateChange}/>;
        }
        return (
            <div class="MainContainer">
                <Animation transitionName="carousel-anim">
                    <BaseCarousel/>
                </Animation>
                {pageContent}
            </div>
        )
    }
}

export default MainContainer;
