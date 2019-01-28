import React from 'react';
import "./bootstrap.min.css";
import Axios from 'axios'

const AddCard = (props) => {
    return (
        <div className="container-fluid">
            <span style={{fontWeight: "bold"}}>Add GitHub Profile</span>
            <AddCardForm onAddCard={props.onAddCard} />
        </div>
    );
}

class AddCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
        this.onFieldChange = this.onFieldChange.bind(this);
    }
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        Axios.get('https://api.github.com/users/' + this.state.userName)
             .then(resp => {
                this.props.onAddCard(resp.data);
             });
        this.setState({
            userName: ''
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-2">
                        <input type="text" className="form-control" onChange={this.onFieldChange}
                            name="userName" value={this.state.userName} required />
                    </div>
                    <div className="col">
                        <button className="btn btn-sm btn-success" 
                            style={{height: '100%'}}>Add Card</button>
                    </div>
                </div>
            </form>
        )};
}

class CardListApp extends React.Component {
    state = {
        cards : []
    };
    onAddCard = (cardInfo) => {
        this.setState((prevState) => ({
            cards: prevState.cards.concat([cardInfo])
        }));
    };

    render () {
        return (
            <div>
                <CardList cards={this.state.cards} />
                <AddCard onAddCard={this.onAddCard} />
            </div>
        );
    }
}

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    );
}

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width="75" src={props.avatar_url} />
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
}

export default CardListApp;