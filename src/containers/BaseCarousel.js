import '../css/carousel.css'
import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

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

class BaseCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    console.log(this.props.children);
    const { activeIndex } = this.state;
    const screen = window.screen;
    const imgWidth = screen.width;
    const imgHeight = screen.height - screen.height * 0.1;
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} width={imgWidth} height={imgHeight}/>
          <CarouselCaption captionHeader={item.caption} />
          {this.props.children}
        </CarouselItem>
      );
    });

    return (
      <Carousel
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

export default BaseCarousel;