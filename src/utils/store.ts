import { createSignal, createRoot } from "solid-js";

type IFormStore = {
  name: string;
  fields: any[];
};

// Forms
function _formsStore() {
  const [forms, setForms] = createSignal<IFormStore[]>([]);
  return { forms, setForms };
}
export const formsStore: any = createRoot(_formsStore);

// Current form
function _curentFormStore() {
  const [currentForm, setCurrentForm] = createSignal<any>([]);
  return { currentForm, setCurrentForm };
}
export const curentFormStore: any = createRoot(_curentFormStore);

// Values.
function _valuesStore() {
  const [values, setValues] = createSignal<any>([]);
  return { values, setValues };
}
export const valuesStore: any = createRoot(_valuesStore);
