import { createSignal, createRoot } from "solid-js";
import { IStore } from "../types";

function formStore() {
  const [data, setData] = createSignal<IStore[]>([
    { form_name: "", valid: true, values: {}, fields: [] },
  ]);
  return { data, setData };
}

export default createRoot(formStore);
