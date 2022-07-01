import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
  Show,
  Switch,
  Match,
} from "solid-js";

import Input from "./Input";
import Select from "./Select";
import { formStore, valueStore } from "./Stores";
import { preprocessField } from "./Form";
import { modifyMutable, produce } from "solid-js/store";

type Iprops = {
  form_name: string;
  fields: any;
};

const Formly: Component<Iprops> = (props: Iprops) => {
  const { forms, setForms }: any = formStore;
  const { values, setValues }: any = valueStore;

  onMount(async () => {
    let form_values = { form_name: props.form_name, values: {}, touched: null };
    let _values: any = {};

    const values = await Promise.all(
      props.fields.map(async (field: any) => {
        _values[`${field.name}`] = field.value ?? null;
        return field.value;
      })
    );

    const _fields = await Promise.all(
      props.fields.map(async (field: any) => {
        // Preprocess field.
        if (field.preprocess) {
          field = await preprocessField(field, props.fields, _values);
        }

        // Validation field.
        // field = await validate(field);

        return field;
      })
    );

    form_values.values = _values;

    const _currentForm = {
      fields: _fields,
      form_name: props.form_name,
    };

    let formsUpdated: any = [];

    if (forms.length) {
      formsUpdated = forms.map((form: any) => {
        if (form.form_name === props.form_name) {
          form = _currentForm;
        }
        console.log("form", form);
        return form;
      });
    } else {
      formsUpdated.push(_currentForm);
    }
    setForms(formsUpdated);
    setValues(_values);
  });

  const onChangeValue = async (data: any) => {
    let _values: any = {};
    setForms(
      (form: any) => form.form_name === props.form_name,
      produce((form: any) => {
        form.fields.map(async (field: any) => {
          if (field.name === data.field_name) {
            _values["touched"] = field.name;
            field.value = data.value;
          }

          _values[`${field.name}`] = field.value;

          // Preprocess field.
          if (field.preprocess) {
            field = await preprocessField(field, form.fields, _values);
            _values[`${field.name}`] = field.value;
          }

          // Validation field.
          // field = await validate(field);

          setValues(_values);
          return field;
        });
        return form;
      })
    );
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("onSubmit", values);
    console.log("values.items :>> ", values.items);
  };

  return (
    <>
      <h1>Formly</h1>
      <form onSubmit={onSubmit}>
        <Show when={forms.length}>
          <pre>
            {/* <code>{JSON.stringify(forms[0].fields, null, 2)}</code> */}
            {/* <code>{JSON.stringify(forms[0], null, 2)}</code> */}
            <code>{JSON.stringify(values, null, 2)}</code>
          </pre>
          <For each={forms[0].fields}>
            {(field: any) => (
              <div class="form-group">
                <Switch fallback={<p>type field not exist!</p>}>
                  {/* Input field */}
                  <Match when={field.type === "input"}>
                    <Input
                      form_name={props.form_name}
                      field={field}
                      changeValue={onChangeValue}
                    />
                  </Match>
                  {/* Select field */}
                  <Match when={field.type === "select"}>
                    <Select
                      form_name={props.form_name}
                      field={field}
                      changeValue={onChangeValue}
                    />
                  </Match>
                </Switch>
              </div>
            )}
          </For>
        </Show>
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Formly;
