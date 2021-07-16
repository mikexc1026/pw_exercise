import React, { Component } from "react";
import CarDataService from "../services/car.service";

export default class Car extends Component {
  constructor(props) {
    super(props);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeBlinkerFluidLevel = this.onChangeBlinkerFluidLevel.bind(this);
    this.getCar = this.getCar.bind(this);
    this.updateCar = this.updateCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);

    this.state = {
      currentCar: {
        id: null,
        make: "",
        model: "",
        year: "",
        blinkerFluidLevel: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCar(this.props.match.params.id);
  }

  onChangeMake(e) {
    const make = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          make: make
        }
      };
    });
  }

  onChangeModel(e) {
    const model = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        model: model
      }
    }));
  }

  onChangeYear(e) {
    const year = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        year: year
      }
    }));
  }

  onChangeBlinkerFluidLevel(e) {
    const blinkerFluidLevel = e.target.value;
    
    this.setState(prevState => ({
      currentCar: {
        ...prevState.currentCar,
        blinkerFluidLevel: blinkerFluidLevel
      }
    }));
  }

  getCar(id) {
    CarDataService.get(id)
      .then(response => {
        this.setState({
          currentCar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateCar() {
    CarDataService.update(
      this.state.currentCar.id,
      this.state.currentCar
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The car was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCar() {    
    CarDataService.delete(this.state.currentCar.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cars')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCar } = this.state;

    return (
      <div>
        <div className="edit-form">
          <h4>Car</h4>
          <form>
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <input
                type="text"
                className="form-control"
                id="make"
                value={currentCar.make}
                onChange={this.onChangeMake}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                value={currentCar.model}
                onChange={this.onChangeModel}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                className="form-control"
                id="year"
                value={currentCar.year}
                onChange={this.onChangeYear}
                name="year"
              />
            </div>

            <div className="form-group">
              <label htmlFor="blinkerFluidLevel">Blinker Fluid Level</label>
              <select
                className="form-control"
                id="blinkerFluidLevel"
                value={currentCar.blinkerFluidLevel}
                onChange={this.onChangeBlinkerFluidLevel}
                name="blinkerFluidLevel"
              >
                <option value="FULL">FULL</option>
                <option value="LOW">LOW</option>
                <option value="EMPTY">EMPTY</option>
              </select>
            </div>
          </form>
          <div className='container-btn'>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.updateCar}
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={this.deleteCar}
          >
            Delete
          </button>
          </div>
          
          
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}