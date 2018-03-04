import React, {Component} from 'react';
import  BaseControlledCarousel from './BaseControlledCarousel'

const items = [
  {
    src: "http://www.donnews.ru/static/images/2017/05/24/sberbank_cib_eng.png",
    altText: 'Slide 1',
    caption: 'Способность к переменам и движению вперед — признак отличной «спортивной» формы, в которой находится сегодня Сбербанк. Титул старейшего и крупнейшего банка России не мешает ему открыто и добросовестно конкурировать на банковском рынке и держать руку на пульсе финансовых и технологических перемен.'
  },
  {
    src: "http://fx-binar.ru/wp-content/uploads/2017/10/2-4.png",
    altText: 'Slide 2',
    caption: 'С 1997 года, клиентами FOREX CLUB стали десятки тысяч абсолютно разных людей, с образованием и без. Всех их объединяет только одно – стремление к успеху и понимание финансовой свободы.'
  },
  {
    src: "http://coolstuff.com.ua/image/data/alfabank.png",
    altText: 'Slide 3',
    caption: 'Альфа-Банк, основанный в 1990 году, является универсальным банком, осуществляющим все основные виды банковских операций, представленных на рынке финансовых услуг, включая обслуживание частных и корпоративных клиентов, инвестиционный банковский бизнес, торговое финансирование и т.д.'
  }
];


class ChooseBroker extends Component {

  constructor(props){
    super(props);
    this.state = {currDescr: items[0].caption}
    this.changeDescription = this.changeDescription.bind(this)
    this.onChosen = this.onChosen.bind(this)
  }

  changeDescription(indexActiveItem){
    this.setState({currDescr: items[indexActiveItem].caption})
  }

  onChosen(indexOfChosen){
    console.log("INDEX" + indexOfChosen);
    this.props.changeAppState("finish-registration");
  }

  render() {
    return (
      <div>
        <div class="four"><h1>Меню выбора брокера</h1></div>
        <div className="chose-broker-carousel">
          <BaseControlledCarousel
              clickable={true}
              interval={false}
              imageClass="broker"
              items={items}
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

    );
  }
}

export default ChooseBroker;