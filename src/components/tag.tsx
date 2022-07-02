import { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { IPropsTag } from "../utils/types";

const Tag: Component<IPropsTag> = (props: IPropsTag) => {
  return (
    <Dynamic component={props.tag ?? "div"} class={props.classes ?? null}>
      {props.children}
    </Dynamic>
  );
};

export default Tag;
