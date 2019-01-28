import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CardListApp from './CardList'
import * as serviceWorker from './serviceWorker';

let data = [
    { name: "Andrew Ray",
      avatar_url: "https://avatars0.githubusercontent.com/u/16260138?v=4",
      company: "CGI" 
    },
    {
        name: 'Satori Komeiji',
        avatar_url: "https://avatars2.githubusercontent.com/u/18225919?v=4",
        company: 'moe'
    }
];

ReactDOM.render(<CardListApp cards={data} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
