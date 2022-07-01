import { formStore, valueStore } from "./stores";
import { IField, IForm, IValue } from "./types";

const { forms }: any = formStore;
const { values }: any = valueStore;

export async function preprocessField(
  field: IField,
  fields: IField[],
  values: any
): Promise<IField> {
  const fnc = field.preprocess;
  field = await fnc?.call(null, field, fields, values);
  return field;
}

export function getForm(form_name: string): IForm {
  const _form: IForm = forms.find(
    (form: IForm) => form.form_name === form_name
  );
  return _form;
}

export function getValue(form_name: string): IForm {
  const _form: IForm = forms.find(
    (form: IForm) => form.form_name === form_name
  );
  return _form;
}
