import React, {Component} from 'react';

class Title extends Component{
    render(){
        return  (
            <div className="four">
                <h1>{this.props.text}</h1>
            </div>
        );
    }
}

export default Title;