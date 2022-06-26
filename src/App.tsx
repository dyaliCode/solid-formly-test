import type { Component } from "solid-js";
import Field from "./components/Field";
import { IInput } from "./types";
import FormStore from "./utils/stores";

const form_name1 = "form1";
const form_name2 = "form2";
const fields: IInput[] = [
  {
    type: "input",
    name: "first-name",
    value: "",
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
        <div class="col">
          <form>
            <Field fields={fields} form_name={form_name1} />
            <button type="button">submit1</button>
          </form>
        </div>
        <div class="col">
          <form>
            <Field fields={fields} form_name={form_name2} />
            <button type="button">submit2</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
