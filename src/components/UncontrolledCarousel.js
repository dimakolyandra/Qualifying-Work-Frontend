import React, {Component} from 'react';
import { UncontrolledCarousel } from 'reactstrap';

class Example extends Component{

    render(){
        return <UncontrolledCarousel items={this.props.items} />;
    }
}

export default Example;