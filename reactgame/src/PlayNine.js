import React from 'react';
import "./bootstrap.min.css";
import "./font-awesome/css/font-awesome.min.css";
import "./App.css";
import _ from 'lodash'

const Stars = (props) => {
    console.log(props);
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    );
}

const Button = (props) => {
    return (
        <div className ="col-2">
            <button className="btn btn-secondary" disabled={props.selectedNumbers.length === 0}>=</button>
        </div>
    );
}

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, i) => 
            <span onClick={() => props.onAnswerChanged(number)} key={i}>{number}</span>)}
        </div>
    );
}

const Numbers = (props) => {
    const numberClassName = (number) => {
        return props.selectedNumbers.indexOf(number) >= 0 ? 'selected' : '';
    }
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => 
                <span onClick={() => props.onNumberSelected(number)} key={i} className={numberClassName(number)}>{number}</span>)}
            </div>
        </div>
    );
}

Numbers.list = _.range(1, 10);

class Game extends React.Component {
    state = {
        selectedNumbers: [],
        numberOfStars: 1 + Math.floor(Math.random()*9)
    };
    removeNumber = (numberToRemove) => {
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== numberToRemove)
        }));
    };
    selectNumber = (number) => {
        if (this.state.selectedNumbers.indexOf(number) >= 0) { return; }
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.concat([number])
        }));
    };
    render() {
        const { selectedNumbers, numberOfStars } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={numberOfStars} />
                    <Button selectedNumbers={selectedNumbers} />
                    <Answer selectedNumbers={selectedNumbers} onAnswerChanged={this.removeNumber} />
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers} onNumberSelected={this.selectNumber} />
            </div>
        );
    };
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    };
}

export default App;