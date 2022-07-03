import { Component, createSignal, For, JSX, onMount } from "solid-js";
import { addClasses, valueStore } from "../index.type";
import { isRequired } from "../utils/helper";
import { IPropsField } from "../utils/types";

const Checkbox: Component<IPropsField> = ({
  form_name,
  field,
  changeValue,
}: IPropsField) => {
  const { values, setValues }: any = valueStore;
  const [_values, _setValues] = createSignal<any>([]);

  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = async (
    event: any
  ): Promise<void> => {
    if (field.extra.items.length > 0) {
      field.extra.items.map((item: any) => {
        if (event.target.name === item.name) {
          if (event.target.checked) {
            _setValues([..._values(), item.value]);
          } else {
            _setValues((vals: any) => {
              return vals.filter((val: any) => val !== item.value);
            });
          }
        }
      });

      const data = {
        form_name,
        field_name: field.name,
        value: _values(),
      };
      changeValue(data);
    }
  };

  onMount(() => {
    if (field.extra.items.length > 0) {
      let vls: any = [];
      field.extra.items.map((item: any) => {
        if (item.checked) {
          vls = [...vls, item.value];
          // console.log("item :>> ", item.value);
          _setValues([..._values(), item.value]);
          // console.log("_values() :>> ", _values());
        }
        return item;
      });

      console.log("vls :>> ", vls);
      // _setValues(vls);
      console.log("_values() :>> ", _values());

      const data = {
        form_name,
        field_name: field.name,
        value: _values(),
      };
      // console.log("data :>> ", data);
      setValues(data);
    }
  });

  return (
    <For each={field.extra.items}>
      {(item: any) => (
        <>
          <input
            type={field.type}
            id={field.attributes.id ? field.attributes.id : field.name}
            classList={addClasses(
              field.attributes.classes ? field.attributes.classes : []
            )}
            value={item.value}
            name={item.name}
            checked={item.value ? item.checked : false}
            onInput={onInput}
          />
          <span>{item.title}</span>
        </>
      )}
    </For>
  );
};

export default Checkbox;
