import React, { Component } from 'react';
import Animation from './Animation';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

class BaseControlledCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  onClick(){
    if (this.props.onChosen != undefined)
      this.props.onChosen(this.state.activeIndex);
  }

  next() {
    var items = this.props.items
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    if (this.props.changeDescription != undefined) this.props.changeDescription(nextIndex);
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    var items = this.props.items
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    if (this.props.changeDescription != undefined) this.props.changeDescription(nextIndex);
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    var items = this.props.items
    const { activeIndex } = this.state;
    const screen = window.screen;
    const imgWidth = screen.width;
    const imgHeight = screen.height - screen.height * 0.1;
    const slides = items.map((item) => {
      var caption = null;
      if (this.props.showCarouselCaptions){
        var caption =   <CarouselCaption captionHeader={item.caption} />
      }
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img
            className={this.props.imageClass}
            src={item.src}
            alt={item.altText}
            width={imgWidth}
            height={imgHeight}
            onClick={this.onClick}
          />
          {caption}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        interval={this.props.interval}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }

};

export default BaseControlledCarousel;