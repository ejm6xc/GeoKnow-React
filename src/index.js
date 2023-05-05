import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TopNavBar from "./components/TopNavBar";
import * as serviceWorker from './serviceWorker';
import {Grid} from "@mui/material";
import About from "./components/About";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


ReactDOM.render(
    <React.StrictMode>
        <Router>
        <TopNavBar/>
            <Grid container direction="row">
                <Grid container direction="column">

                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/about" component={About} />
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
