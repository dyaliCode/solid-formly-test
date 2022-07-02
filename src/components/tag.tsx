import { Component, children } from "solid-js";

type IProps = {
  tag: string;
  classes: string;
  children: any;
};

const Tag: Component<IProps> = (props: IProps) => {
  const tagElement = document.createElement(props.tag ?? "div");
  tagElement.classList.add(props.classes ?? null);
  //props.children.map((el: Element) => tagElement.append(el));
  tagElement.append(props.children);
  return tagElement;
};

export default Tag;
