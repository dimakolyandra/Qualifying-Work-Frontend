import React, {Component} from 'react';
import BaseControlledCarousel from '../components/common/BaseControlledCarousel';
import LoginForm from '../components/login/LoginForm';
import RegistrationForm from '../components/registration/RegistrationForm';
import Animation from '../components/common/Animation';
import TraderCabinet from '../components/trader_cabinet/TraderCabinet';

import imgSrc1 from '../images/2.jpg'
import imgSrc2 from '../images/3.jpg'
import imgSrc3 from '../images/4.jpg'

const items = [
  {
    src: imgSrc1,
    altText: 'Slide 1',
    caption: 'Удобство работы!'
  },
  {
    src: imgSrc2,
    altText: 'Slide 2',
    caption: 'Множество партнёров!'
  },
  {
    src: imgSrc3,
    altText: 'Slide 3',
    caption: 'Возможность работы с несколькими брокерами!'
  }
];

class MainContainer extends Component{
    constructor(props){
        super(props);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.getSessionKey = this.getSessionKey.bind(this);
        this.getAesKey = this.getAesKey.bind(this);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/getsessionkey', false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
        if (xhr.status != 200){
            alert(xhr.status + ": " + xhr.statusText)
            return;
        }
        else{
            var resp = JSON.parse(xhr.responseText);
            var uuid = resp.sessionKey.split(":")[0];
            var aesKey = resp.sessionKey.split(":")[1];
            this.state = {status: 'login', sessionKey: uuid, aesKey: aesKey};
        }
    }

    getAesKey(){
        return this.state.aesKey;
    }

    getSessionKey(){
        return this.state.sessionKey;
    }

    handleStateChange(newStatus, userData){
        var user = userData || {};
        this.setState({status: newStatus, user});

    }

    render(){
        let pageContent = null;
        var carousel = (
            <BaseControlledCarousel
                clickable={false}
                interval={5000}
                items={items}
                showCarouselCaptions={true}
                imageClass="background"
            />);
        if (this.state.status == 'login'){
            pageContent = <LoginForm
                            changeAppState={this.handleStateChange}
                            getSessionKey={this.getSessionKey}
                            getAesKey={this.getAesKey}/>
        }
        if (this.state.status == 'registration'){
            pageContent = <RegistrationForm
                            changeAppState={this.handleStateChange}
                            getSessionKey={this.getSessionKey}
                            getAesKey={this.getAesKey}/>;
        }
        if (this.state.status == 'chooseBroker'){
            carousel = null;
            pageContent = <RegistrationForm
                            changeAppState={this.handleStateChange}
                            getSessionKey={this.getSessionKey}
                            getAesKey={this.getAesKey}/>;
        }
        if (this.state.status == 'trader-cabinet'){
            carousel = null;
            pageContent = <TraderCabinet
                            getSessionKey={this.getSessionKey}
                            getAesKey={this.getAesKey}/>;
        }
        console.log(carousel)
        return (
            <div className="MainContainer">
                <Animation transitionName="carousel-anim">
                    {carousel}
                </Animation>
            {pageContent}
         </div>
        )
    }
}

export default MainContainer;
