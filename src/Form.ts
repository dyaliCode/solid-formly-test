export async function preprocessField(field: any, fields: any, values: any) {
  const fnc = field.preprocess;
  field = await fnc.call(null, field, fields, values);
  return field;
}
