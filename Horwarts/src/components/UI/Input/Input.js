import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      if (props.type === 'file') {
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            type={props.type}
            onChange={props.changed}
            onBlur={props.blured}
            accept='image/png, image/jpeg, image/jpg'
          />
        );
      } else {
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            type={props.type}
            value={props.value}
            onChange={props.changed}
            onBlur={props.blured}
          />
        );
      }
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blured}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
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
