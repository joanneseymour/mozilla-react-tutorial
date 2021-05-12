import React, {useState} from "react";

function Form(props) {
  const [name, setName] = useState(''); 
  // We are setting the initial name value as "Use hooks!".
  // We are defining a function whose job is to modify name, called setName().
  // useState() returns these two things, so we are using array destructuring to capture them both in separate variables.

  function handleSubmit(e){
    e.preventDefault();
    props.addTask("Say hello");
  }
    return (
        <form onSubmit = {handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value = {name}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }

  export default Form;