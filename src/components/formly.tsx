import { Component, For, onMount, Show, Switch, Match } from "solid-js";
import Input from "./input";
import Select from "./Select";
import { formStore, valueStore } from "../utils/stores";
import { getForm, preprocessField } from "../utils/form";
import { produce } from "solid-js/store";
import { validate } from "../utils/validation";
import Message from "./message";
import { IForm, IValue } from "../utils/types";
import Tag from "./tag";

const Formly: Component<IForm> = (props: IForm) => {
  const { forms, setForms }: any = formStore;
  const { values, setValues }: any = valueStore;

  // Init
  onMount(async () => {
    let form_values = { form_name: props.form_name, values: {}, touched: null };
    let _values: any = {};

    await Promise.all(
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
        field = await validate(field);

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

        return form;
      });
    } else {
      formsUpdated.push(_currentForm);
    }
    setForms([...forms, _currentForm]);

    setValues([...values, { form_name: props.form_name, values: _values }]);
  });

  // On change value
  const onChangeValue = async (data: any) => {
    let _values: any = {};
    // Set forms.
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
          field = await validate(field);

          // setValues(_values);
          return field;
        });
        return form;
      })
    );
    // Set Values.
    setValues(
      (value: any) => value.form_name === props.form_name,
      produce((value: any) => {
        value.values[`${data.field_name}`] = data.value;
        return value;
      })
    );
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const _v = values.find((v: IValue) => v.form_name === props.form_name);
    props.onSubmit(_v);
  };

  return (
    <>
      <h1>Form: {props.form_name}</h1>
      <form onSubmit={onSubmit}>
        <Show when={getForm(props.form_name)}>
          {/* <pre>
            <code>{JSON.stringify(getForm(props.form_name), null, 2)}</code>
          </pre> */}
          <For each={getForm(props.form_name).fields}>
            {(field: any) => (
              <>
                <Switch fallback={<p>type field not exist!</p>}>
                  <Match when={field.type === "input"}>
                    <Input
                      form_name={props.form_name}
                      field={field}
                      changeValue={onChangeValue}
                    />
                  </Match>

                  <Match when={field.type === "select"}>
                    <Select
                      form_name={props.form_name}
                      field={field}
                      changeValue={onChangeValue}
                    />
                  </Match>
                </Switch>
                <Show when={field.validation && field.validation.errors.length}>
                  <For each={field.validation.errors}>
                    {(error: any) => (
                      <Message
                        error={error}
                        messages={field.messages ? field.messages : []}
                      />
                    )}
                  </For>
                </Show>
              </>
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
