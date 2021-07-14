import './App.css';
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddCar from './components/add-car.component';
import Car from './components/car.component';
import CarsList from './components/car-list.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/cars" className="navbar-brand">
            My Garage
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cars"} className="nav-link">
                Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/cars/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/cars" component={CarsList} />
            <Route exact path="/cars/add" component={AddCar} />
            <Route path="/cars/:id" component={Car} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
