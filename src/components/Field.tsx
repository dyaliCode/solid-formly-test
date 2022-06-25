import { Component, For } from "solid-js";

import { IForm, IInput } from "../types";
import Input from "./Input";

const Field: Component<IForm> = (props: IForm) => {
  return (
    <>
      <For each={props.fields}>
        {(field: IInput) => <Input field={field} />}
      </For>
    </>
  );
};

export default Field;
