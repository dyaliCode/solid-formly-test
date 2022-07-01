export interface IForm {
  form_name: string;
  fields: IField[];
}

export interface IField {
  type: string;
  name: string;
  value?: any;
  attributes: Attributes;
  prefix?: IPrefix;
  rules?: string[];
  messages?: any;
  extra?: any;
  preprocess?: Function; // for now
  validation?: any;
}

export interface IPropsField {
  form_name: string;
  field: IField;
  changeValue: Function;
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
