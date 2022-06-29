import { formsStore } from "./store";

const { forms } = formsStore;

export function getForm(form_name: string): any {
  const _form = forms().find((form: any) => form.form_name === form_name);
  return _form as any;
}

export async function preprocessField(field: any, fields: any, values: any) {
  const fnc = field.preprocess;
  field = await fnc.call(null, field, fields, values);
  return field;
}
