import { createSignal, createRoot } from "solid-js";
import { IStore } from "../types";

function formStore() {
  const [forms, setForms] = createSignal<IStore[]>([]);
  return { forms, setForms };
}

export default createRoot(formStore);
