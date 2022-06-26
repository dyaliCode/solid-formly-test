import { Component, createSignal, For, onMount, Show } from "solid-js";
import FormStore from "../utils/stores";
import { IForm, IInput, IStore } from "../types";
import Input from "./Input";
import { validate } from "../utils/validation";
import { onInitValues } from "../utils/form";

const Field: Component<IForm> = (props: IForm) => {
  const { forms, setForms } = FormStore;
  const [currentForm, setCurrentForm] = createSignal<IStore>();
  // const [fields, setFields] = createSignal();

  onMount(async () => {
    await onInitValues(props.form_name, props.fields);

    const _form: any = forms().find(
      (form: IStore) => form.form_name === props.form_name
    );

    setCurrentForm(_form);
    // setFields(form.fields);

    // data().map((form: IStore) => {
    //   if (form.form_name === props.form_name) {
    //     setFields(form);
    //   }
    // });

    // console.log("data()", data());
  });

  return (
    <>
      <pre>
        <code>{JSON.stringify(currentForm(), null, 2)}</code>
      </pre>
      <Show when={currentForm()?.fields.length}>
        <For each={currentForm()?.fields}>
          {(field: IInput) => <Input field={field} />}
        </For>
      </Show>
    </>
  );
};

export default Field;
