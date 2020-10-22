import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

/*  when the user enter in the page, he will be greated with the Join component
    where he is going to pass his data in the login form and though query string,
    it will pass the data through to the chat. 
    Once the data is received, it will render the chat component 
*/

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
    </Router>
);

export default App;

// to start run: npm start