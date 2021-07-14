import React, { Component } from 'react';
import CarDataService from '../services/car.service';

export default class AddCar extends Component {
  constructor(props) {
    super(props);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.saveCar = this.saveCar.bind(this);
    this.newCar = this.newCar.bind(this);

    this.state = {
      id: null,
      make: "",
      model: "", 
      published: false,

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

  saveCar() {
    var data = {
      make: this.state.make,
      model: this.state.model
    };

    CarDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          make: response.data.make,
          model: response.data.model,
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

            <button onClick={this.saveCar} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
