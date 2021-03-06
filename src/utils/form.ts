import Input from "../components/input";
import Select from "../components/select";
import { formStore, valueStore } from "./stores";
import { IField, IForm, IValue } from "./types";

const { forms }: any = formStore;
const { values }: any = valueStore;

export const FieldsTypes: any = {
  input: Input,
  select: Select,
};

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

export function getValue(form_name: string): IValue {
  const _value: IValue = values.find(
    (value: IValue) => value.form_name === form_name
  );
  return _value;
}

export function addClasses(classes: string[]):
  | {
      [k: string]: boolean | undefined;
    }
  | undefined {
  if (!classes.length) return;
  let lst: any = {};
  classes.map((cls: string) => (lst[cls] = true));
  return lst;
}
