import React,{Component} from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from './Home'
import Dashboard from './Dashboard'

const customHistory = createBrowserHistory();

export default class router extends Component {
    render() {
        return (
            <Router history={customHistory}>
                <Route path="/" exact component={Home} />
                <Route path="/Dashboard/" component={Dashboard} />
            </Router>
        )
    }
}
