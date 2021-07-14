import axios from "axios";

export default axios.create({
  baseURL: "http://52.86.154.61:5000/api/cars",
  headers: {
    "Content-type": "application/json"
  }
});