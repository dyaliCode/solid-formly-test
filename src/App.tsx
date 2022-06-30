import { Component, createSignal } from "solid-js";
import Formly from "./Formly";

// Fetch Users
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.cypress.io/users?_limit=10");
  const data = await res.json();
  return data.map((item: any) => ({ value: item.id, title: item.name }));
};

// Fetch posts
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.cypress.io/posts?_limit=10");
  const data = await res.json();
  return data.map((item: any) => ({ value: item.id, title: item.title }));
};

let loading = false;
const form_name2 = "my_form2";
const fields2 = [
  {
    type: "input",
    name: "x",
    value: 1,
    attributes: {
      type: "number",
      classes: "form-control",
      label: "X",
    },
    rules: ["required"],
  },
  {
    type: "input",
    name: "y",
    value: 2,
    attributes: {
      type: "number",
      classes: "form-control",
      label: "Y",
    },
  },
  {
    type: "input",
    name: "total",
    attributes: {
      type: "number",
      classes: "form-control",
      label: "X + Y",
    },
    preprocess: (field: any, fields: any, values: any) => {
      field.value = parseInt(values.x) + parseInt(values.y);
      return field;
    },
  },
  {
    type: "select",
    name: "category",
    attributes: {
      classes: "form-control",
      label: "Category",
    },
    rules: ["required"],
    extra: {
      options: [
        {
          value: null,
          title: "None",
        },
        {
          value: 1,
          title: "Users",
        },
        {
          value: 2,
          title: "Posts",
        },
      ],
    },
  },
  {
    type: "select",
    name: "items",
    attributes: {
      classes: "form-control",
      label: "Items",
    },
    extra: {},
    preprocess: async (field: any, fields: any, values: any) => {
      console.log("values", values);
      // if (values.touched === "category") {
      loading = true;
      field.extra.options =
        values.category == 1 ? await fetchUsers() : await fetchPosts();
      loading = false;
      // }
      return field;
    },
  },
];

const App: Component = () => {
  return <Formly form_name={form_name2} fields={fields2} />;
};

export default App;
