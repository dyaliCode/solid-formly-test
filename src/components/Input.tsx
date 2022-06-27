import { Component, createSignal } from "solid-js";
import { IInput } from "../types";
import { isRequired } from "../utils/helper";

type IProps = {
  form_name: string;
  field: IInput;
  changeValue: Function;
};

const Input: Component<IProps> = ({
  form_name,
  field,
  changeValue,
}: IProps) => {
  const [value, setValue] = createSignal(field.value ?? null);

  const onChangeValue = (e: any) => {
    setValue(e.currentTarget.value);
    console.log("11", 11);
    changeValue({
      value: parseInt(value()),
      field_name: field.name,
    });
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
        onInput={(e: any) => onChangeValue(e)}
      />
    </>
  );
};

export default Input;
