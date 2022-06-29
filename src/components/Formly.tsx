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
import { getForm, preprocessField } from "../utils/form";
import { formsStore, valuesStore } from "../utils/store";
import { validate } from "../utils/validation";
import Input from "./Input";
import Message from "./Message";

type IProps = {
  fields: any;
  form_name: string;
  onSubmit: Function;
};

const Formly: Component<IProps> = (props) => {
  const { forms, setForms } = formsStore;
  const { values, setValues } = valuesStore;
  const [fields, setFields] = createSignal<any>([]);
  const [__fields, __setFields] = createSignal<any>([]);

  const onSubmit: JSX.EventHandler<HTMLFormElement, Event> = (e) => {
    e.preventDefault();

    const _values = values().find(
      (values: any) => values.form_name === props.form_name
    );
    props.onSubmit(_values);
  };

  const onChangeValue = async (data: any) => {
    let current_form_values: any;
    let _values = values().map((value: any) => {
      if (value.form_name === props.form_name) {
        value.values = { ...value.values, [data.field_name]: data.value };
        value.touched = data.field_name;
        current_form_values = value;
      }
      return value;
    });

    const _cForm = getForm(props.form_name);

    const _fields = await Promise.all(
      _cForm.fields.map(async (field: any) => {
        if (field.name === data.field_name) {
          field.value = data.value;
        }

        if (field.preprocess) {
          field = await preprocessField(
            field,
            forms(),
            current_form_values.values
          );
        }

        // Validation field
        field = await validate(field);
        return field;
      })
    );

    const _currentForm = {
      fields: _fields,
      form_name: props.form_name,
    };

    const forms_updated = forms().map((form: any) => {
      if (form.form_name === props.form_name) {
        form = _currentForm;
      }
      return form;
    });

    console.log("_fields", _fields);

    setFields(_fields);
    setForms(forms_updated);
    setValues(_values);
  };

  onMount(async () => {
    let form_values = { form_name: props.form_name, values: {}, touched: null };
    let _values: any = {};

    const _fields = await Promise.all(
      props.fields.map(async (field: any) => {
        _values[`${field.name}`] = field.value ?? null;

        // Preprocess field.
        if (field.preprocess) {
          // field = await preprocessField(field, fields, values);
        }

        // Validation field.
        field = await validate(field);
        return field;
      })
    );
    form_values.values = _values;
    const _currentForm = {
      fields: _fields,
      form_name: props.form_name,
    };
    setFields(_fields);
    setForms([...forms(), _currentForm]);
    setValues([...values(), form_values]);
  });

  createEffect(() => {
    console.log("11", fields());
    __setFields(fields());
  });

  return (
    <form onSubmit={onSubmit}>
      <pre>
        <code>{JSON.stringify(__fields(), null, 2)}</code>
      </pre>
      <Show when={__fields().length}>
        <For each={__fields()}>
          {(field: any) => (
            <div class="form-groupd">
              <Input
                form_name={props.form_name}
                field={field}
                changeValue={onChangeValue}
              />
            </div>
          )}
        </For>
      </Show>
      <button class="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Formly;
