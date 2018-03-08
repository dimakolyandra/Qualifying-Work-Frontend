import React, {Component} from 'react';
import BaseControlledCarousel from '../components/common/BaseControlledCarousel';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/registration/RegistrationForm';
import Animation from '../components/common/Animation';
import ChooseBroker from '../components/common/ChooseBroker';
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
        this.state = {status: 'login'};
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(newStatus, userData){
        var user = userData || {};
        this.setState({status: newStatus, user});

    }

    render(){
        // let pageContent = null;
        // var carousel = (
        //     <BaseControlledCarousel
        //         clickable={false}
        //         interval={5000}
        //         items={items}
        //         showCarouselCaptions={true}
        //         imageClass="background"
        //     />);
        // if (this.state.status == 'login'){
        //     pageContent = <LoginForm changeAppState={this.handleStateChange}/>
        // }
        // if (this.state.status == 'logged'){
        //     pageContent = <h1>LOGGED</h1>;
        // }
        // if (this.state.status == 'registration'){
        //     pageContent = <RegistrationForm changeAppState={this.handleStateChange}/>;
        // }
        // if (this.state.status == 'chooseBroker'){
            // var pageContent = null
            // var carousel = <ChooseBroker changeAppState={this.handleStateChange}/>;
        // }
        // if (this.state.status == 'trader-cabinet'){
            var carousel = null
            var pageContent = <TraderCabinet/>;
        // // }
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
