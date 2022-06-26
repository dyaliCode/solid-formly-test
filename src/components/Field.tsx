import { Component, For, onMount, Show } from "solid-js";
import FormStore from "../utils/stores";
import { IForm, IInput } from "../types";
import Input from "./Input";
import { validate } from "../utils/validation";
import { onInitValues } from "../utils/form";

const Field: Component<IForm> = (props: IForm) => {
  const { data, setData } = FormStore;

  onMount(async () => {
    await onInitValues(props.fields);
  });

  return (
    <>
      <pre>
        <code>{JSON.stringify(data().fields, null, 2)}</code>
      </pre>
      <Show when={data().fields.length}>
        <For each={props.fields}>
          {(field: IInput) => <Input field={field} />}
        </For>
      </Show>
    </>
  );
};

export default Field;
