import { Component, JSX } from "solid-js";
import { isRequired } from "../utils/helper";
import { IPropsField } from "../utils/types";
import Tag from "./tag";

const Input: Component<IPropsField> = ({
  form_name,
  field,
  changeValue,
}: IPropsField) => {
  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = async (
    event: any
  ): Promise<void> => {
    const value: any =
      field.attributes.type === "number"
        ? parseInt(event.currentTarget.value)
        : event.currentTarget.value;
    const data = {
      form_name,
      field_name: field.name,
      value,
    };
    changeValue(data);
  };

  return (
    <Tag
      tag={field.prefix ? (field.prefix.tag ? field.prefix.tag : "div") : "div"}
      classes={"myclass"}
    >
      <input
        type={field.attributes.type}
        name={field.name}
        value={field.value ?? null}
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
        onInput={onInput}
      />
    </Tag>
  );
};

export default Input;
