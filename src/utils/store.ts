import { createSignal, createRoot } from "solid-js";
import { createStore } from "solid-js/store";

type IFormStore = {
  name: string;
  fields: any[];
};

// Forms
function _formsStore() {
  // const [forms, setForms] = createSignal<IFormStore[]>([]);
  const [forms, setForms] = createStore([]);
  return { forms, setForms };
}
export const formsStore: any = _formsStore; //createRoot(_formsStore);

// Current form
function _curentFormStore() {
  // const [currentForm, setCurrentForm] = createSignal<any>([]);
  const [currentForm, setCurrentForm] = createStore([]);
  return { currentForm, setCurrentForm };
}
export const curentFormStore: any = createRoot(_curentFormStore);

// Values.
function _valuesStore() {
  const [values, setValues] = createSignal<any>([]);
  return { values, setValues };
}
export const valuesStore: any = createRoot(_valuesStore);
