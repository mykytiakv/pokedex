import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './converter.css';

class MyList extends Component {
  render() {
    return (
      <h1>Hello, My name is {this.props.name}! I'm love {this.props.action}</h1>
    )
  }
}

export default MyList;

