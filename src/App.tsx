import type { Component } from "solid-js";
import Field from "./components/Field";
import { IInput } from "./types";

const form_name1 = "form1";
const form_name2 = "form2";

const fields1: IInput[] = [
  {
    type: "input",
    name: "first-name",
    value: "",
    attributes: {
      type: "text",
      label: "First name",
      id: "firstname",
      classes: "form-control",
      placeholder: "First name 111",
    },
    prefix: {
      classes: ["form-group", "col-4"],
    },
    rules: ["required", "min:6"],
    messages: {
      min: "minim 20",
    },
  },
];

const fields2: IInput[] = [
  {
    type: "input",
    name: "first-name",
    value: "",
    attributes: {
      type: "text",
      label: "First name",
      id: "firstname",
      classes: "form-control",
      placeholder: "First name 222",
    },
    prefix: {
      classes: ["form-group", "col-4"],
    },
    rules: ["required", "min:6"],
    messages: {
      min: "minim 20",
    },
  },
];

const App: Component = () => {
  return (
    <div class="container">
      <div class="grid">
        <div class="col">
          <form>
            <Field fields={fields1} form_name={form_name1} />
            <button type="button">submit1</button>
          </form>
        </div>
        <div class="col">
          <form>
            <Field fields={fields2} form_name={form_name2} />
            <button type="button">submit2</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
