import './App.css';
import {Users} from "./components/Users";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {CreateForm} from "./components/CreateForm";
import {UpdateForm} from "./components/UpdateForm";


function App() {
    return (
        <Router>
            <div className='App'>
                <div className='container'>
                    <div>
                        <Link to='/create'>
                            <button className='button-create'>Create</button>
                        </Link>
                        <Users/>
                    </div>
                    <div className='form'>
                        <Switch>
                            <Route path='/create'><CreateForm/></Route>
                            <Route path='/update' component={UpdateForm}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
