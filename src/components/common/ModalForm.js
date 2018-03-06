import React, {Component} from 'react';

class Modal extends Component {

  constructor(props){
    super(props);
    this.state = {toClass: "showing"};
    this.onClose = this.onClose.bind(this);
  }

  onClose(){
    document.getElementById("chose-broker").classList.remove("showing");
    document.getElementById("chose-broker").classList.add("not-showing");
    console.log(document.getElementById("chose-broker"));
    this.setState({toClass: "not-showing"});
    this.props.parentOnClose();
  }

  render() {
    let modalClass = "mymodal " + this.state.toClass;
    return (
      <div  className="backdrop">
        <div id="chose-broker" className={modalClass}>
          <div class="modal-header">
            {this.props.children}
          </div>
          <div className="footer">
            <button className="close" onClick={this.onClose}>
              Ок
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;