import { IInput, IStore } from "../types";
import FormStore from "../utils/stores";
import { validate } from "./validation";

const { data, setData } = FormStore;

// Init data form
export async function onInitValues(fields: IInput[]) {
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

  setData({
    valid: isValid ? false : true,
    values,
    fields: updateFields,
  });
}

//
export async function onChangeValue(
  form_name: string,
  field_name: string,
  newValue: any
) {
  let updateValues = {
    ...data().values,
    [field_name]: newValue,
  };

  const form: any = data().find((form: IStore) => form.form_name === form_name);

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

  setData({
    valid: isValid ? false : true,
    values: updateValues,
    fields: updateFields,
  });
}
