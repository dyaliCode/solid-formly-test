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

  let newForm: IStore = {
    form_name,
    valid: isValid ? false : true,
    values,
    fields: updateFields,
  };
  // newData.push({
  //   valid: isValid ? false : true,
  //   values,
  //   fields: updateFields,
  // })

  setForms((d) => [...d, newForm]);

  console.log("forms()", forms());
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

  let updateFields = await Promise.all(
    form.fields.map(async (field: IInput) => {
      if (field.name === field_name) {
        field.value = newValue;
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

  const _form: IStore = {
    form_name: "form_name",
    valid: isValid ? false : true,
    values: updateValues,
    fields: updateFields,
  };
  setForms([_form]);
}
