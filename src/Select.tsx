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
  const [multiple, setMultiple] = createSignal<boolean>(false);

  onMount(() => {
    if (field.extra) {
      const _multiple = field.extra.multiple ? field.extra.multiple : false;
      setMultiple(_multiple);
    }
  });

  const onInput: JSX.EventHandler<HTMLSelectElement, Event> = async (
    event: any
  ) => {
    const data = {
      form_name,
      field_name: field.name,
      value: parseInt(event.currentTarget.value),
    };
    changeValue(data);
  };

  const checkSelected = (
    is_multiple: any,
    option_value: any,
    field_value: any
  ): boolean => {
    if (is_multiple()) {
      if (field_value && field_value.length) {
        console.log("111 :>> ", 111);
        const res = field_value.indexOf(option_value) != -1;
        return res;
      } else if (field.default_value && field.default_value.length) {
        console.log("222 :>> ", 222);
        const res = field.default_value.indexOf(option_value) != -1;
        return res;
      }
      return false;
    }
    console.log("333 :>> ", 333);
    return option_value === field_value;
  };

  return (
    <>
      <label for={field.id}>{field.attributes.label ?? ""}</label>
      <select
        name={field.name}
        id={field.attributes.id}
        class={field.attributes.classes}
        // required={isRequired(field)}
        disabled={field.attributes.disabled}
        multiple={multiple()}
        onChange={onInput}
      >
        <Show when={field.extra.options && field.extra.options.length}>
          <For each={field.extra.options}>
            {(option: any) => (
              <option
                value={option.value}
                selected={checkSelected(multiple, option.value, field.value)}
              >
                {option.title}
              </option>
            )}
          </For>
        </Show>
      </select>
    </>
  );
};

export default Input;
