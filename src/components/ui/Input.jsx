import React, { useEffect, useReducer } from "react";
import validator from "./../../Validators/validator"
import Icons from "./../Icons/Icons";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
      };
    }
    default: {
      return state;
    }
  }
};

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { value, isValid } = mainInput;
  const { id, onInputHandler } = props;

  useEffect(() => {
    onInputHandler(id, value, isValid);
  }, [value]);

  const onChangeHandler = (event) => {
    console.log(event.target.value);
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validations: props.validations,
      isValid: true,
    });
  };

  const element =
    props.element === "input" ? (
      <div className="w-full flex justify-between items-baseline  my-3 gap-2">
        <label htmlFor={props.name} className="flex w-fit text-left">
          {props.label}:
          {props.required && <span className="text-red-700 px-1">*</span>}
        </label>
        <div
          className={`flex items-center justify-between min-w-50 text-sm h-8 rounded-md px-2  bg-brand-200 dark:bg-brand-300 
        ${
          mainInput.isValid
            ? "border border-green-500 dark:border-green-500/50"
            : "border border-red-500 dark:border-red-500/50 "
        }`}>
          <input
            type={props.type}
            placeholder={props.placeholder}
            className={`flex-1  grow  ps-2 focus:outline-none ${props.className}`}
            value={mainInput.value}
            onChange={onChangeHandler}
          />
          {mainInput.isValid ? (
            <Icons name="check" color="success" />
          ) : (
            <Icons name="wrong" color="danger" />
          )}
        </div>
      </div>
    ) : (
      <div className="flex justify-between items-center w-70 md:w-60 my-3 gap-3">
        <label htmlFor={props.name} className="w-6 text-left">
          {props.label}:
        </label>
        <textarea
          placeholder={props.placeholder}
          className={`flex-1 min-w-56 grow text-sm h-8 rounded-md shadow shadow-brand-500  ps-2 bg-brand-200 dark:bg-brand-300 focus:outline-none focus:ring-2 ${props.className} ${
            mainInput.isValid
              ? "focus:border-green-600 focus:ring-green-300"
              : "focus:border-red-600 focus:ring-red-400"
          }`}
          onChange={onChangeHandler}
          value={mainInput.value}
        />
      </div>
    );

  return <div>{element}</div>;
}
