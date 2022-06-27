import { IInput, IStore } from "../types";
import FormStore from "../utils/stores";
import { validate } from "./validation";

const { forms, setForms } = FormStore;

// Init data form
export async function onInitValues(form_name: string, fields: IInput[]) {
  let values: any = [];

  let updateFields = await Promise.all(
    fields.map(async (field: IInput) => {
      values = { ...values, [field.name]: field.value };
      values[`${field.name}`] = field.value ?? null;

      // Preprocess.
      if (field.preprocess) {
        field = await preprocessField(field, fields, values);
      }

      // Validation.
      field = await validate(field);
      // console.log("field", field);
      return field;
    })
  );

  const isValid = updateFields.find((field: IInput) => {
    if (field.validation) {
      return field.validation.dirty === true;
    }
  });

  let new_form: IStore = {
    form_name,
    valid: isValid ? false : true,
    values,
    fields: updateFields,
  };

  setForms((old_forms: IStore[]) => [...old_forms, new_form]);
}

//
export async function onChangeValue(
  form_name: string,
  field_name: string,
  newValue: any
) {
  let updateValues = {
    ...forms().values,
    [field_name]: newValue,
  };

  const form: any = forms().find(
    (form: IStore) => form.form_name === form_name
  );

  let updateFields: IInput[] = await Promise.all(
    form.fields.map(async (field: IInput) => {
      if (field.name === field_name) {
        field.value = newValue;
      }

      // Preprocess.
      if (field.preprocess) {
        field = await preprocessField(field, form.fields, updateValues);
      }

      // Validation.
      field = await validate(field);
      return field;
    })
  );

  console.log("updateFields", updateFields);

  const isValid = updateFields.find((field: IInput) => {
    if (field.validation) {
      return field.validation.dirty === true;
    }
  });

  let new_form: IStore = {
    form_name,
    valid: isValid ? false : true,
    values: updateValues,
    fields: updateFields,
  };

  const formIndex = forms().findIndex(
    (form: IStore) => form.form_name == form_name
  );

  let _forms: IStore[] = forms().filter(
    (item: IStore) => item.form_name != form_name
  );
  _forms = [..._forms, new_form];
  setForms(_forms);
}

export function getForm(form_name: string): IStore {
  const _form = forms().find((form: IStore) => form.form_name === form_name);
  return _form as IStore;
}

export function getFormName(form_name: string): string {
  const _form = forms().find((form: IStore) => form.form_name === form_name);
  return _form ? _form.form_name : "default";
}

export async function preprocessField(field: any, fields: any, values: any) {
  const fnc = field.preprocess;
  field = await fnc.call(null, field, fields, values);
  return field;
}
