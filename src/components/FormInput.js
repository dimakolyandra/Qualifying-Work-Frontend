import React, {Component} from 'react'

class FormInput extends Component{

    render(){
        return (
            <p class="for-form">
                <input class={this.props.class}
                       type={this.props.type}
                       placeholder={this.props.placeholder}
                       value={this.props.value}
                       name={this.props.name}
                       onChange={this.props.onChange}
                />
            </p>
        )
    }
}

export default FormInput;