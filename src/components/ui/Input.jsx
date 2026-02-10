import { useEffect, useReducer } from "react";
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
      <div className="flex items-center w-96 md:w-60 my-3 gap-9">
        <label htmlFor={props.name} className="flex w-6 text-left">
          {props.lable}: {props.required && (<span className="text-red-700 px-1">*</span>)}
        </label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          className={`flex-1 min-w-56 grow text-sm h-8 rounded-md shadow shadow-brand-500  ps-2 bg-brand-200 dark:bg-brand-300 focus:outline-none focus:ring-2 ${props.className} ${
            mainInput.isValid
              ? "focus:border-green-600 focus:ring-green-300"
              : "focus:border-red-600 focus:ring-red-400"
          }`}
          value={mainInput.value}
          onChange={onChangeHandler}
        />
      </div>
    ) : (
      <div className="flex items-center w-70 md:w-60 my-3 gap-6">
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
