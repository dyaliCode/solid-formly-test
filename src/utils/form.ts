import { IField } from "./types";

export async function preprocessField(
  field: IField,
  fields: IField[],
  values: any
): Promise<IField> {
  const fnc = field.preprocess;
  field = await fnc?.call(null, field, fields, values);
  return field;
}
