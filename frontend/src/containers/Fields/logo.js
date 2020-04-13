import React, { Component } from 'react';


class Logo extends Component {
    render() {
        return (
            <img 
                src = {this.props.src}
                className = {this.props.className}
            />
        );
    }
}