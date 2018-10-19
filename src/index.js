import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import Button from '@material-ui/core/Button';


// Orig
//ReactDOM.render(<App />, document.getElementById('root'));



function Age(props) {
    return <i>Age: {props.age}</i>
}

function Welcome(props) {
    return <h1>Hello, {props.name} <Age age={props.age}/></h1>;
}
  
function App() {
    return (
        <div>

            <div class="grid-container">
                <div class="grid-item">Menu Bar</div>
                <div class="grid-item" style={{width: '900px'}}>
                
                 
                
                </div>          
            </div>

            <Welcome name="Sara" age="12" />
            <Welcome name="Cahal" age="32" />
            <Welcome name="Edite" age="33"/>

            <Button variant="contained" color="primary" style={{marginLeft: '20px'}}>
                Hello World
            </Button>
        </div>
    );
}
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
