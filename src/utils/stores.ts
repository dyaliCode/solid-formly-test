import { createStore } from "solid-js/store";
import { IForm } from "./types";

function _formStore() {
  const [forms, setForms] = createStore<IForm[]>([]);
  return { forms, setForms };
}
export const formStore = _formStore();

function _valueStore() {
  const [values, setValues] = createStore({});
  return { values, setValues };
}
export const valueStore = _valueStore();
