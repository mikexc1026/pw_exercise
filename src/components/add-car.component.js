import React, { Component } from 'react';
import CarDataService from '../services/car.service';

export default class AddCar extends Component {
  constructor(props) {
    super(props);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeBlinkerFluidLevel = this.onChangeBlinkerFluidLevel.bind(this);
    this.saveCar = this.saveCar.bind(this);
    this.newCar = this.newCar.bind(this);

    this.state = {
      id: null,
      make: "",
      model: "", 
      year: "",
      blinkerFluidLevel: 'FULL',

      submitted: false
    };
  }

  onChangeMake(e) {
    this.setState({
      make: e.target.value
    });
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value
    });
  }

  onChangeBlinkerFluidLevel(e) {
    this.setState({
      blinkerFluidLevel: e.target.value
    });
  }

  saveCar() {
    var data = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      blinkerFluidLevel: this.state.blinkerFluidLevel
    };

    CarDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          make: response.data.make,
          model: response.data.model,
          year: response.data.year,
          blinkerFluidLevel: response.data.blinkerFluidLevel,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCar() {
    this.setState({
      id: null,
      make: "",
      model: "",
      year: "",
      blinkerFluidLevel: "",

      submitted: false
    });
  }

  render() {
    
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCar}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <input
                type="text"
                className="form-control"
                id="make"
                required
                value={this.state.make}
                onChange={this.onChangeMake}
                name="make"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                className="form-control"
                id="year"
                required
                value={this.state.year}
                onChange={this.onChangeYear}
                name="year"
              />
            </div>

            <div className="form-group">
              <label htmlFor="blinkerFluidLevel">Blinker Fluid Level</label>
              <select
                className="form-control"
                id="blinkerFluidLevel"
                required
                value={this.state.blinkerFluidLevel}
                onChange={this.onChangeBlinkerFluidLevel}
                name="blinkerFluidLevel"
              >
                <option value="FULL">FULL</option>
                <option value="LOW">LOW</option>
                <option value="EMPTY">EMPTY</option>
              </select>
            </div>
            <div className='container-btn'>
              <button onClick={this.saveCar} className="btn btn-success">
                Submit
              </button>
            </div>
            
          </div>
        )}
      </div>
    );
  }
}
