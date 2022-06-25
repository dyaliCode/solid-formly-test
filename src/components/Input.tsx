import { Component } from "solid-js";
import { IInput } from "../types";
import { isRequired } from "../utils/helper";
import FormStore from "../utils/stores";

type IProps = {
  field: IInput;
};

const Input: Component<IProps> = ({ field }: IProps) => {
  const { data, setData } = FormStore;

  const onChangerValue = (e: any) => {
    const newValue = e.target.value;
    const updateValues = {
      ...data().values,
      [field.name]: newValue,
    };
    const newData = {
      ...data(),
      values: updateValues,
    };
    setData(newData);
  };

  return (
    <>
      <input
        type={field.attributes.type}
        name={field.name}
        value={field.value ?? "null"}
        id={field.attributes.id ? field.attributes.id : field.name}
        class={field.attributes.classes}
        placeholder={field.attributes.placeholder}
        required={isRequired(field)}
        disabled={field.attributes.disabled}
        readonly={field.attributes.readonly}
        min={field.attributes.min}
        max={field.attributes.max}
        step={field.attributes.step}
        autocomplete={field.attributes.autocomplete}
        onKeyUp={onChangerValue}
      />
    </>
  );
};

export default Input;
