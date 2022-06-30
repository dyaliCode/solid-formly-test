import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
  Show,
} from "solid-js";

type IProps = {
  form_name: any;
  field: any;
  changeValue: any;
};

const Input: Component<IProps> = ({
  form_name,
  field,
  changeValue,
}: IProps) => {
  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = async (
    event: any
  ) => {
    const data = {
      form_name,
      field_name: field.name,
      value: parseInt(event.currentTarget.value),
    };
    changeValue(data);
  };

  return (
    <>
      {/* <pre>
        <code>{JSON.stringify(values(), null, 2)}</code>
      </pre> */}
      <label for={field.id}>{field.attributes.label ?? ""}</label>
      <input
        type={field.attributes.type}
        name={field.name}
        value={field.value ?? "null"}
        id={field.attributes.id ? field.attributes.id : field.name}
        class={field.attributes.classes}
        placeholder={field.attributes.placeholder}
        // required={isRequired(field)}
        disabled={field.attributes.disabled}
        readonly={field.attributes.readonly}
        min={field.attributes.min}
        max={field.attributes.max}
        step={field.attributes.step}
        autocomplete={field.attributes.autocomplete}
        onInput={onInput}
      />
      {/* <Show when={field.validation && field.validation.errors.length}>
        <For each={field.validation.errors}>
          {(error: any) => (
            <Message
              error={error}
              messages={field.messages ? field.messages : []}
            />
          )}
        </For>
      </Show> */}
    </>
  );
};

export default Input;
