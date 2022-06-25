import { Component, createSignal, For, JSX } from "solid-js";
import { IInput } from "../types";
import { isRequired } from "../urils/helper";

type IProps = {
  field: IInput;
};

const Input: Component<IProps> = ({ field }: IProps) => {
  const [value, setValue] = createSignal(field.value ?? null);

  const onChangerValue = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        type={field.attributes.type}
        name={field.name}
        value={value()}
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
