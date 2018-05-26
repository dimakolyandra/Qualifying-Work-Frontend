import React, {Component} from 'react';
import  BaseControlledCarousel from '../common/BaseControlledCarousel'
import Animation from '../common/Animation';
import Title from '../common/Title';


class ChooseBroker extends Component {

  constructor(props){
    super(props);
    this.changeDescription = this.changeDescription.bind(this);
    this.onChosen = this.onChosen.bind(this);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/brokers/list', false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    var resp = JSON.parse(xhr.responseText);
    if(resp.status != 'ok'){
        alert(resp.status)
        return;
    }
    else{
      var items = resp.firms.map( (item) => {return {src: item.avatarUrl, altText: '', caption: item.description}})
      this.state = {
        items: items,
        currDescr: items[0].caption
      };
    }
  }


  changeDescription(indexActiveItem){
    this.setState({currDescr: this.state.items[indexActiveItem].caption})
  }

  onChosen(indexOfChosen){
    this.props.finishRegistration(indexOfChosen + 1);
  }

  render() {
    return (
      <Animation transitionName="carousel-anim">
        <div>
          <Title position="middle" text="Выберите начального брокера"/>
          <div className="chose-broker-carousel">
            <BaseControlledCarousel
                clickable={true}
                interval={false}
                imageClass="broker"
                items={this.state.items}
                changeDescription={this.changeDescription}
                showCarouselCaptions={false}
                onChosen={this.onChosen}/>
          </div>
          <div className="broker-info">
            <span class="before"></span>
            <p className="broker-info-text">
              {this.state.currDescr}
             </p>
          </div>
        </div>
      </Animation>
    );
  }
}

export default ChooseBroker;