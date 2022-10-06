import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles.css"

ReactDOM.render(<App />, document.getElementById('root'))

// fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
// .then(res => res.json())
// .then(data => console.log(data))