import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { preprocessField } from "../utils/form";
import { isRequired } from "../utils/helper";
import { formsStore, valuesStore } from "../utils/store";
import { validate } from "../utils/validation";
import Message from "./Message";

type IProps = {
  form_name: any;
  field: any;
  changeValue: any;
};

const Input: Component<IProps> = ({
  form_name,
  field,
  changeValue,
}: IProps) => {
  const [data, setData] = createSignal<any>(field);
  const { forms, setForms } = formsStore;
  const { values, setValues } = valuesStore;

  // const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = async (
  //   event
  // ) => {
  //   const newValue = event.currentTarget.value;
  //   let _field = data();

  //   // Set value.
  //   _field.value = newValue;
  //   let current_form_values: any;
  //   let _values = values().map((value: any) => {
  //     if (value.form_name === form_name) {
  //       value.values = { ...value.values, [field.name]: newValue };
  //       value.touched = field.name;
  //       current_form_values = value;
  //     }
  //     return value;
  //   });
  //   setValues(_values);

  //   // Preprocess field.
  //   if (_field.preprocess) {
  //     _field = await preprocessField(
  //       _field,
  //       forms(),
  //       current_form_values.values
  //     );
  //   }

  //   // Set field.
  //   _field = await validate(_field);
  //   setData(_field);
  // };

  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = async (
    event: any
  ) => {
    const data = {
      form_name,
      field_name: field.name,
      value: event.currentTarget.value,
    };
    changeValue(data);
  };

  // createEffect(async (prev) => {
  //   console.log("prev", prev);
  //   // console.log("values()", values());
  //   // console.log("data().name", data().name);
  //   // const current_form_values: any = values().find(
  //   //   (value: any) => value.form_name === form_name
  //   // );
  //   // console.log("current_form_values", current_form_values);
  //   // if (current_form_values) {
  //   //   let _field = data();
  //   //   if (_field.preprocess) {
  //   //     _field = await preprocessField(
  //   //       _field,
  //   //       forms(),
  //   //       current_form_values.values
  //   //     );
  //   //   }

  //   //   // Set field.
  //   //   _field = await validate(_field);
  //   //   console.log(_field.name, _field);
  //   //   // setData(_field)
  //   // }
  // });

  return (
    <>
      {/* <pre>
        <code>{JSON.stringify(values(), null, 2)}</code>
      </pre> */}
      <label for={field.id}>{field.attributes.label ?? ""}</label>
      <input
        type={data().attributes.type}
        name={data().name}
        value={data().value ?? "null"}
        id={data().attributes.id ? data().attributes.id : data().name}
        class={data().attributes.classes}
        placeholder={data().attributes.placeholder}
        required={isRequired(field)}
        disabled={data().attributes.disabled}
        readonly={data().attributes.readonly}
        min={data().attributes.min}
        max={data().attributes.max}
        step={data().attributes.step}
        autocomplete={data().attributes.autocomplete}
        onInput={onInput}
      />
      <Show when={data().validation && data().validation.errors.length}>
        <For each={data().validation.errors}>
          {(error: any) => (
            <Message
              error={error}
              messages={data().messages ? data().messages : []}
            />
          )}
        </For>
      </Show>
    </>
  );
};

export default Input;
