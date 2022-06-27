import {
  Component,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import FormStore from "../utils/stores";
import { IForm, IInput, IStore } from "../types";
import Input from "./Input";
import { validate } from "../utils/validation";
import {
  getForm,
  getFormName,
  onInitValues,
  preprocessField,
} from "../utils/form";

const Field: Component<IForm> = (props: IForm) => {
  const { forms, setForms } = FormStore;
  const [currentForm, setCurrentForm] = createSignal<IStore>();

  onMount(async () => {
    await onInitValues(props.form_name, props.fields);
    const _form: any = forms().find(
      (form: IStore) => form.form_name === props.form_name
    );
    setCurrentForm(_form);
  });

  const onChangeValue = async (data: any) => {
    const _form: any = forms().find(
      (form: IStore) => form.form_name === props.form_name
    );

    const values = {
      ..._form.values,
      [data.field_name]: data.value,
    };

    let updateFields: IInput[] = await Promise.all(
      _form.fields.map(async (field: IInput) => {
        if (field.name === data.field_name) {
          field.value = data.value;
        }
        // Preprocess.
        if (field.preprocess) {
          field = await preprocessField(field, _form.fields, values);
        }
        // Validation.
        field = await validate(field);
        return field;
      })
    );

    const isValid = updateFields.find((field: IInput) => {
      if (field.validation) {
        return field.validation.dirty === true;
      }
    });

    let new_form: IStore = {
      form_name: props.form_name,
      valid: isValid ? false : true,
      values: values,
      fields: updateFields,
    };

    let _forms: IStore[] = forms().filter(
      (item: IStore) => item.form_name != props.form_name
    );
    _forms = [..._forms, new_form];

    setCurrentForm(new_form);
    setForms(_forms);
  };

  return (
    <>
      {/* <Show when={getForm(props.form_name)?.fields.length}> */}
      <pre>
        <code>{JSON.stringify(getForm(props.form_name)?.fields, null, 2)}</code>
      </pre>
      <For each={getForm(props.form_name)?.fields}>
        {(field: IInput) => (
          <Input
            form_name={getFormName(props.form_name)}
            field={field}
            changeValue={onChangeValue}
          />
        )}
      </For>
      {/* </Show> */}
    </>
  );
};

export default Field;
