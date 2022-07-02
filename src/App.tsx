import { Component, createSignal, Show } from "solid-js";
import Formly from "./components/formly";
import { IField, IValue } from "./utils/types";

const App: Component = () => {
  const [loading, setLoading] = createSignal<boolean>(false);
  const [isSubmited, setIsSubmited] = createSignal<boolean>(false);
  const [values, setValues] = createSignal<IValue>();

  // Fetch Users
  const fetchUsers = async () => {
    const res = await fetch(
      "https://jsonplaceholder.cypress.io/users?_limit=10"
    );
    const data = await res.json();
    return data.map((item: any) => ({ value: item.id, title: item.name }));
  };

  // Fetch posts
  const fetchPosts = async () => {
    const res = await fetch(
      "https://jsonplaceholder.cypress.io/posts?_limit=10"
    );
    const data = await res.json();
    return data.map((item: any) => ({ value: item.id, title: item.title }));
  };

  const form_name1: string = "my_form1";
  const fields1: IField[] = [
    {
      type: "input",
      name: "x",
      // value: 1,
      attributes: {
        id: "x",
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
        id: "y",
        type: "number",
        classes: "form-control",
        label: "Y",
      },
    },
    {
      type: "input",
      name: "total",
      attributes: {
        id: "total",
        type: "number",
        classes: "form-control",
        label: "X + Y",
      },
      preprocess: (field: any, fields: any, values: any) => {
        field.value = parseInt(values.x) * parseInt(values.y);
        return field;
      },
    },
    {
      type: "select",
      name: "category",
      attributes: {
        id: "category",
        type: "select",
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
      rules: ["required"],
      attributes: {
        type: "select",
        id: "items",
        classes: "form-control",
        label: "Items",
      },
      extra: {},
      preprocess: async (field: IField, fields: IField[], values: any) => {
        if (values.touched === "category") {
          setLoading(true);
          field.extra.options =
            values.category == 1 ? await fetchUsers() : await fetchPosts();
          field.value = field.extra.options[0].value;
          setLoading(false);
        }
        return field;
      },
    },
  ];

  const form_name2 = "my_form2";
  const fields2 = [
    {
      type: "input",
      name: "firstname",
      attributes: {
        id: "total",
        type: "text",
        classes: "form-control",
        placeholder: "Tap your first name",
      },
      rules: ["required", "min:6"],
      messages: {
        required: "Firstname field is required!",
        min: "First name field must have more that 6 caracters!",
      },
    },
  ];

  const onSubmit1 = (_values: IValue) => {
    setIsSubmited(true);
    setValues(_values);
    console.log("onSubmit1", values());
  };
  const onSubmit2 = (_values: IValue) => {
    setIsSubmited(true);
    setValues(_values);
    console.log("onSubmit2", values());
  };

  return (
    <div class="container">
      <h1>Multiple dynamic forms</h1>
      <ul>
        <li>⚡️ Generate dynamic and reactive forms.</li>
        <li>😍 Easy to extend with custom field type, custom validation.</li>
      </ul>

      <article>
        <Formly form_name={form_name1} fields={fields1} onSubmit={onSubmit1} />
        {loading() ? "loading..." : "done!"}
      </article>
      <hr />
      <article>
        <Formly form_name={form_name2} fields={fields2} onSubmit={onSubmit2} />
      </article>
      <Show when={isSubmited()}>
        <dialog open>
          <article>
            <header>
              <a
                href="#close"
                aria-label="Close"
                class="close"
                onClick={() => setIsSubmited(false)}
              ></a>
              Form name: {values()?.form_name}
            </header>
            <p>Values</p>
            <pre>
              <code>{JSON.stringify(values()?.values, null, 2)}</code>
            </pre>
            <footer>
              <a
                href="#cancel"
                role="button"
                class="secondary"
                onClick={() => setIsSubmited(false)}
              >
                Close
              </a>
            </footer>
          </article>
        </dialog>
      </Show>
    </div>
  );
};

export default App;
