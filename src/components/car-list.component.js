import React, { Component } from "react";
import CarDataService from "../services/car.service";
import { Link } from "react-router-dom";

export default class CarsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCars = this.retrieveCars.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCar = this.setActiveCar.bind(this);
    this.removeAllCars = this.removeAllCars.bind(this);

    this.state = {
      cars: [],
      currentCar: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveCars();
  }

  retrieveCars() {
    CarDataService.getAll()
      .then(response => {
        this.setState({
          cars: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCars();
    this.setState({
      currentCar: null,
      currentIndex: -1
    });
  }

  setActiveCar(car, index) {
    this.setState({
      currentCar: car,
      currentIndex: index
    });
  }

  removeAllCars() {
    CarDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { cars, currentCar, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Cars List</h4>

          <ul className="list-group">
            {cars &&
              cars.map((car, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCar(car, index)}
                  key={index}
                >
                  {car.make}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCars}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCar ? (
            <div>
              <h4>Car</h4>
              <div>
                <label>
                  <strong>Make:</strong>
                </label>{" "}
                {currentCar.make}
              </div>
              <div>
                <label>
                  <strong>Model:</strong>
                </label>{" "}
                {currentCar.model}
              </div>

              <Link
                to={"/cars/" + currentCar.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Car...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}