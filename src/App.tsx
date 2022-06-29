import type { Component } from "solid-js";
import Formly from "./components/Formly";

const form_name1 = "form1";
const fields1 = [
  {
    type: "input",
    name: "first-name",
    value: "my-first-name",
    attributes: {
      type: "text",
      label: "First name",
      id: "firstname",
      classes: "form-control",
      placeholder: "First name",
    },
    prefix: {
      classes: ["form-group", "col-4"],
    },
    rules: ["required", "min:6"],
    messages: {
      min: "min is 6",
    },
  },
  {
    type: "input",
    name: "last-name",
    value: "",
    attributes: {
      type: "text",
      label: "last name",
      id: "lastname",
      classes: "form-control",
      placeholder: "last name",
    },
    prefix: {
      classes: ["form-group", "col-4"],
    },
    rules: ["required", "min:6"],
    messages: {
      min: "min is 6",
    },
  },
  {
    type: "input",
    name: "age",
    value: "",
    attributes: {
      type: "number",
      label: "Age",
      id: "age",
      classes: "form-control",
      placeholder: "Age",
    },
    prefix: {
      classes: ["form-group", "col-4"],
    },
    rules: ["required", "min:6"],
    messages: {
      min: "min is 6",
    },
  },
];

const form_name2 = "form2";
const fields2 = [
  {
    type: "input",
    name: "x",
    attributes: {
      type: "number",
      classes: ["form-control"],
      label: "X",
    },
    rules: ["required"],
  },
  {
    type: "input",
    name: "y",
    attributes: {
      type: "number",
      classes: ["form-control"],
      label: "Y",
    },
  },
  {
    type: "input",
    name: "total",
    attributes: {
      type: "number",
      classes: ["form-control"],
      label: "X + Y",
    },
    preprocess: (field: any, fields: any, values: any) => {
      console.log("values", values);
      field.value = parseInt(values.x) + parseInt(values.y);
      // if (values.touched === "x" || values.touched === "y") {
      // }
      return field;
    },
  },
];

const App: Component = () => {
  const onSubmit = async (data: any) => {
    console.log("data", data);
  };

  return (
    <div class="container">
      <div class="row">
        {/* <div class="col-md-6">
          <Formly fields={fields1} form_name={form_name1} onSubmit={onSubmit} />
        </div> */}
        <div class="col-md-12">
          <Formly fields={fields2} form_name={form_name2} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default App;
