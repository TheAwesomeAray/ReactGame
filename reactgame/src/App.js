import React from 'react';
import './App.css';



class App extends React.Component {
  state = { counter: 0 };
  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({
      counter: prevState.counter + incrementValue
    }));
  };
  render () {
    return (
    <div>
      <Button onClick={this.incrementCounter} incrementValue={1} />
      <Button onClick={this.incrementCounter} incrementValue={5} />
      <Button onClick={this.incrementCounter} incrementValue={10} />
      <Button onClick={this.incrementCounter} incrementValue={100} />
      <Result counter={this.state.counter} />
    </div>
  )};
}

class Button extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.incrementValue)
  }
  render() {
    return (
    <button 
    onClick={this.handleClick}>
      +{this.props.incrementValue}
    </button>
    )};
}

const Result = (props) => {
  return (
    <div>{props.counter}</div>
  );
};

export default App;
