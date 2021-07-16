import React, { Component } from "react";
import CarDataService from "../services/car.service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faEdit } from "@fortawesome/free-solid-svg-icons";

export default class CarsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCars = this.retrieveCars.bind(this);
    this.refreshList = this.refreshList.bind(this);
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
    const { cars, currentCar } = this.state;

    return (
      <div>
        <h4>Cars List</h4>
        <div className="car-container">
          {cars && cars.map(car => (
            <div className='card'>
              <Link to={"/cars/" + car.id}><FontAwesomeIcon icon={faEdit} className='fa-2x card-img-top edit' /></Link>
              <FontAwesomeIcon icon={faCar} className='fa-7x card-img-top' />
              <div className='card-body'>
                <div><span className= 'label'>Year: </span>{car.year}</div>
                <div><span className= 'label'>Make: </span>{car.make}</div>
                <div><span className= 'label'>Model: </span>{car.model}</div>
                <div><span className= 'label'>Blinker fluid level: </span><span className={'level ' + car.blinkerFluidLevel}>{car.blinkerFluidLevel}</span></div>
              </div>
            </div>
          ))}
          
          
        </div>
        <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCars}
          >
            Remove All
        </button>
      </div>
    );
  }
}