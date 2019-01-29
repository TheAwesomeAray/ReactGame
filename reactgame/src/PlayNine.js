import React from 'react';
import "./bootstrap.min.css";
import "./font-awesome/css/font-awesome.min.css";
import "./App.css";
import _ from 'lodash'

function possibleCombinationSum(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
     if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
     for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }

    return false;
};

const Stars = (props) => {
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    );
}

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = 
                <button className="btn btn-success" onClick={props.acceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>;
            break;
        case false:
            button = 
                <button className="btn btn-danger" onClick={props.checkAnswer}>
                    <i className="fa fa-times"></i>
                </button>;
            break;
        default: 
            button =
                <button className="btn btn-secondary" disabled={props.selectedNumbers.length === 0} 
                    onClick={props.checkAnswer}>
                    =
                </button>;
            break;
    }
    return (
        <div className ="col-2 text-center">
            {button}
                <br/>
                <br/>
                <button onClick={props.redraw} className="btn btn-sm btn-warning"
                    disabled={props.redraws === 0} >
                    <i className="fa fa-refresh"></i> {props.redraws}
                </button>
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
        console.log(props.usedNumbers.indexOf(number));
        if (props.usedNumbers.indexOf(number) >= 0)
            return 'used';
        if (props.selectedNumbers.indexOf(number) >= 0)
            return 'selected';
    }
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => 
                <span onClick={() => props.onNumberSelected(number)} 
                    key={i} className={numberClassName(number)}>{number}</span>)}
            </div>
        </div>
    );
}

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
        </div>
    );
}

Numbers.list = _.range(1, 10);

class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random()*9);
    static initialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        redraws: 10,
        doneStatus: null
    });
    state = Game.initialState();
    resetGame = () => this.setState(Game.initialState());
    removeNumber = (numberToRemove) => {
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== numberToRemove),
            answerIsCorrect: null
        }));
    };
    selectNumber = (number) => {
        if (this.state.selectedNumbers.indexOf(number) >= 0) { return; }
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.concat([number]),
            answerIsCorrect: null
        }));
    };
    checkAnswer = () => {
        this.setState((prevState) => ({
            answerIsCorrect: prevState.numberOfStars ===
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };
    acceptAnswer = () => {
        this.setState((prevState) => ({
            numberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: []
        }), this.updateDoneStatus);
    };
    redraw = () => {
        if (this.state.redraws === 0) { return; }
        this.setState((prevState) => ({
            redraws: prevState.redraws - 1,
            numberOfStars: Game.randomNumber(),
            selectedNumbers: []
        }), this.updateDoneStatus);
    };
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' };
            }
        });
    };
    possibleSolutions({numberOfStars, usedNumbers}) {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1);

        return possibleCombinationSum(possibleNumbers, numberOfStars);
    };
    render() {
        const { 
            selectedNumbers, 
            usedNumbers,
            numberOfStars, 
            answerIsCorrect,
            redraws,
            doneStatus } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={numberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer} 
                            acceptAnswer={this.acceptAnswer}
                            answerIsCorrect={answerIsCorrect}
                            redraw={this.redraw}
                            redraws={redraws} />
                    <Answer selectedNumbers={selectedNumbers} onAnswerChanged={this.removeNumber} />
                </div>
                <br />
                { doneStatus ?
                    <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/> :
                    <Numbers selectedNumbers={selectedNumbers} 
                         usedNumbers={usedNumbers} 
                         onNumberSelected={this.selectNumber} />
                }
                
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