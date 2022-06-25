import type { Component } from "solid-js";
import Field from "./components/Field";
import { IInput } from "./types";

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
    rules: ["required", "min:20"],
    messages: {
      min: "minim 20",
    },
  },
];

const App: Component = () => {
  return (
    <>
      <form>
        <Field fields={fields} form_name={form_name} />
        <button type="button">submit</button>
      </form>
    </>
  );
};

export default App;
