import { Component, createEffect, createSignal, For, onMount } from "solid-js";
import FormStore from "../utils/stores";
import { IForm, IInput } from "../types";
import Input from "./Input";
import { validate } from "../utils/validation";

const Field: Component<IForm> = (props: IForm) => {
  const { data, setData } = FormStore;
  const [fields, setFields] = createSignal(props.fields);

  onMount(async () => {
    let values: any = [];

    let updateFields = await Promise.all(
      props.fields.map(async (field: IInput) => {
        values = { ...values, [field.name]: field.value };
        values[`${field.name}`] = field.value ?? null;

        // Validation.
        field = await validate(field);
        console.log("field", field);
        return field;
      })
    );

    console.log("updateFields", updateFields);

    setFields(updateFields);

    setData({
      valid: true,
      values,
    });
  });

  return (
    <>
      {/* <pre>
        <code>{JSON.stringify(fields(), null, 2)}</code>
      </pre> */}
      <pre>
        <code>{JSON.stringify(data(), null, 2)}</code>
      </pre>
      <For each={props.fields}>
        {(field: IInput) => <Input field={field} />}
      </For>
    </>
  );
};

export default Field;
