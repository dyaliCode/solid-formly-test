import { createSignal, createMemo, createRoot } from "solid-js";
import { IStore } from "../types";

function formStore() {
  const [data, setData] = createSignal<IStore>({
    valid: true,
    values: {},
  });
  return { data, setData };
}

export default createRoot(formStore);
