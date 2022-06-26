import { Component, createSignal } from "solid-js";
import { IInput } from "../types";
import { onChangeValue } from "../utils/form";
import { isRequired } from "../utils/helper";
import FormStore from "../utils/stores";

type IProps = {
  field: IInput;
};

const Input: Component<IProps> = ({ field }: IProps) => {
  const [value, setValue] = createSignal(field.value ?? null);
  const { forms, setForms } = FormStore;

  // const onChangeValue = (e: any) => {
  //   const newValue = e.target.value;
  //   setValue(newValue);
  //   //   const updateValues = {
  //   //     ...data().values,
  //   //     [field.name]: newValue,
  //   //   };
  //   //   const newData = {
  //   //     ...data(),
  //   //     values: updateValues,
  //   //   };
  //   //   setForms(newData);
  // };

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
        onKeyUp={(e: any) => {
          const newValue = e.target.value;
          setValue(newValue);
          onChangeValue("form_name", field.name, value());
        }}
      />
    </>
  );
};

export default Input;
