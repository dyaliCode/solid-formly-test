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

import Input from "./Input";
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
    // console.log('_values', _values)

    const _fields = await Promise.all(
      props.fields.map(async (field: any) => {
        // _values[`${field.name}`] = field.value ?? null;

        // Preprocess field.
        if (field.preprocess) {
          field = await preprocessField(field, props.fields, _values);
        }

        // Validation field.
        // field = await validate(field);
        // console.log('field', field)
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

  const onSubmit = () => {
    console.log("onSubmit");
  };

  // const onChangeValue = async (data: any) => {
  //   let current_form_values: any;

  //   const values = await Promise.all(
  //     forms[0].fields.map(async (field: any) => {
  //       // _values[`${field.name}`] = field.value ?? null;
  //       // console.log("field.name, data.field_name", field.name, data.field_name);
  //       if (field.name === data.field_name) {
  //         // field.set(11);
  //         console.log("field::", field);
  //       }
  //       return field;
  //     })
  //   );

  //   // console.log("values", values);

  //   const _fields = await Promise.all(
  //     forms[0].fields.map(async (field: any) => {
  //       // _values[`${field.name}`] = field.value ?? null;
  //       // if (field.field_name === data.field_name) {
  //       //   field.value = data.value;
  //       // }
  //       // Preprocess field.
  //       if (field.preprocess) {
  //         field = await preprocessField(field, forms[0].fields, values);
  //         // console.log("field", field);
  //         // console.log("forms[0].fields", forms[0].fields);
  //         // console.log("values", values);
  //         // console.log("field2:", field);
  //       }

  //       // Validation field.
  //       // field = await validate(field);
  //       // console.log('field', field)
  //       return field;
  //     })
  //   );
  //   // console.log("_fields", _fields);

  //   const _currentForm = {
  //     fields: _fields,
  //     form_name: props.form_name,
  //   };
  //   let formsUpdated: any = [];

  //   if (forms.length) {
  //     formsUpdated = forms.map((form: any) => {
  //       if (form.form_name === props.form_name) {
  //         form = _currentForm;
  //       }
  //       return form;
  //     });
  //   } else {
  //     formsUpdated.push(_currentForm);
  //   }

  //   // console.log("formsUpdated", formsUpdated);
  //   setForms(formsUpdated);
  //   setValues(values);
  //   // let _values = values.map((value: any) => {
  //   //   if (value.form_name === props.form_name) {
  //   //     value.values = { ...value.values, [data.field_name]: data.value };
  //   //     value.touched = data.field_name;
  //   //     current_form_values = value;
  //   //   }
  //   //   return value;
  //   // });
  // };

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
          }
          // Validation field.
          // field = await validate(field);

          setValues(_values);
          return field;
        });
        return form;
      })
    );

    // console.log("forms", forms);
  };

  return (
    <>
      <h1>Formly</h1>
      <form onSubmit={onSubmit}>
        <Show when={forms.length}>
          <pre>
            <code>{JSON.stringify(forms[0].fields, null, 2)}</code>
            {/* <code>{JSON.stringify(forms[0], null, 2)}</code> */}
            {/* <code>{JSON.stringify(values, null, 2)}</code> */}
          </pre>
          <For each={forms[0].fields}>
            {(field: any) => (
              <div class="form-group">
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
    </>
  );
};

export default Formly;
