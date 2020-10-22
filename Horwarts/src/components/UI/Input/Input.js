import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input type={props.type} value={props.value} onChange={props.changed} />
      );
      break;
    case 'textarea':
      inputElement = <textarea value={props.value} onChange={props.changed} />;
      break;
    case 'select':
      inputElement = (
        <select value={props.value} onChange={props.changed}>
          {props.options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = null;
  }
  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
