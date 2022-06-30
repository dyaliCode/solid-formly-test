import { createStore } from "solid-js/store";

function _formStore() {
  const [forms, setForms] = createStore([]);
  return { forms, setForms };
}
export const formStore = _formStore();

function _valueStore() {
  const [values, setValues] = createStore({});
  return { values, setValues };
}
export const valueStore = _valueStore();
