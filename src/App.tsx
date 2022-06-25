import type { Component } from "solid-js";
import Field from "./components/Field";
import { IInput } from "./types";
import FormStore from "./utils/stores";

const form_name = "form1";
const fields: IInput[] = [
  {
    type: "input",
    name: "first-name",
    value: "first-name",
    attributes: {
      type: "text",
      label: "First name",
      id: "firstname",
      classes: "form-control",
    },
    prefix: {
      classes: ["form-group", "col-4"],
    },
    rules: ["required", "min:6"],
    messages: {
      min: "minim 20",
    },
  },
  // {
  //   type: "input",
  //   name: "last-name",
  //   value: "last-name",
  //   attributes: {
  //     type: "text",
  //     label: "last name",
  //     id: "lastname",
  //     classes: "form-control",
  //   },
  //   prefix: {
  //     classes: ["form-group", "col-4"],
  //   },
  //   rules: ["required", "min:20"],
  //   messages: {
  //     min: "minim 20",
  //   },
  // },
];

const App: Component = () => {
  const { data } = FormStore;

  return (
    <div class="container">
      <div class="grid">
        <form>
          <Field fields={fields} form_name={form_name} />
          <button type="button">submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;
