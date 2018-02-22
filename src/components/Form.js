import React, {Component} from 'react';
import Animation from './Animation';

class Form extends Component{

    render(){
        return (
            <div>
                <Animation transitionName="form-anim">
                    <form
                        id={this.props.id}
                        class={this.props.class}
                        onSubmit={this.props.onSubmit}
                    >
                        {this.props.children}
                    </form>
                </Animation>
            </div>
        );
    }
}

export default Form;