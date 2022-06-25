export interface IForm {
  fields: IInput[];
  form_name: string;
}

export interface IInput {
  type: string;
  name: string;
  value?: any;
  attributes: Attributes;
  prefix?: IPrefix;
  rules?: string[];
  messages?: any;
  preprocess?: any; // for now
  validation?: any; // for now
}
export interface Attributes {
  id: string;
  type: string;
  label?: string;
  classes?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  autocomplete?: string;
}

export interface IPrefix {
  classes: string[];
}

export interface IStore {
  valid: boolean;
  values: any; // for now
}
