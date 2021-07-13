import logo from './logo.svg';
import './App.css';
import React from 'react';


const { useState } = React

const Button = ({increment, onClickFunction}) => {
  const handleClick = () => {
    onClickFunction(increment);
  }
  return <button onClick={handleClick}>+{increment}</button>
}

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = increment => {
    setCount(count + increment);
  }

  return (
    <div>
      <Button increment={1} onClickFunction={incrementCount} />
      <Button increment={10} onClickFunction={incrementCount} />
      <Button increment={100} onClickFunction={incrementCount} />
      <Button increment={1000} onClickFunction={incrementCount} />
      <span>{count}</span>
      <table>
        <thead>
          <th>Year</th>
          <th>Make</th>
          <th>Model</th>
        </thead>
        <tbody>
          <tr>
            <td>1994</td>
            <td>Ford</td>
            <td>F-150</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App;
