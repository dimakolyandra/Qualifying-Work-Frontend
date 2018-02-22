import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Animation extends Component{

    render(){
        return (
            <ReactCSSTransitionGroup
                    transitionName={this.props.transitionName}
                    transitionAppear={true}
                    transitionAppearTimeout={5000}
                    transitionEnter={false}
                    transitionLeave={false}
            >
            {this.props.children}
            </ReactCSSTransitionGroup>

        )
    }
}

export default Animation;