import React, {Component} from 'react';
import  BaseControlledCarousel from './BaseControlledCarousel'
import Modal from './ModalForm'
import Animation from './Animation';
import Title from './Title';


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
    this.state = {
      currDescr: items[0].caption,
      showModal: false
    };
    this.changeDescription = this.changeDescription.bind(this);
    this.onChosen = this.onChosen.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    this.setState({showModal: false});
    this.props.changeAppState("trader-cabinet");
  }

  changeDescription(indexActiveItem){
    this.setState({currDescr: items[indexActiveItem].caption})
  }

  onChosen(indexOfChosen){
    // Здесь будет ajax запрос к бэку для того, чтобы
    // узнать фамилию работника
    console.log("INDEX" + indexOfChosen);
    this.setState({showModal: true});
    //this.props.changeAppState("finish-registration");
  }

  render() {
    if (this.state.showModal){
      return <Modal parentOnClose={this.closeModal}>Вас будет обслуживать Иван Иванов</Modal>;
    }
    return (
      <Animation transitionName="carousel-anim">
        <div>
          <Title text="Выберите начального брокера"/>
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
      </Animation>
    );
  }
}

export default ChooseBroker;