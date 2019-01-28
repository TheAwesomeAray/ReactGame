import React from 'react';
import "./bootstrap.min.css";
import "./font-awesome/css/font-awesome.min.css";
import "./App.css";
import _ from 'lodash'

const Stars = (props) => {
    const numberofStars = 1 + Math.floor(Math.random()*9);
    let stars = []
    for (let i = 0; i < numberofStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>);
    }


    return (
        <div className="col-5">
            {stars}
        </div>
    );
}

const Button = (props) => {
    return (
        <div className ="col-2">
            <button>=</button>
        </div>
    );
}

const Answer = (props) => {
    return (
        <div className="col-5">
            <span>5</span>
        </div>
    );
}

const Numbers = (props) => {
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => <span key={i}>{number}</span>)}
            </div>
        </div>
    );
}

Numbers.list = _.range(1, 10);

class Game extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars />
                    <Button />
                    <Answer />
                </div>
                <br />
                <Numbers />
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