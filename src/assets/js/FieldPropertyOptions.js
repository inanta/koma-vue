export default {
  element: {
    fields: ["input", "select", "textarea"],
    options: [
      {
        name: "Input",
        value: "input"
      },
      {
        name: "Select",
        value: "select"
      },
      {
        name: "Multiline Text Box",
        value: "textarea"
      }
    ],
    default: "input"
  },
  items: {
    fields: ["select"],
    options: "FieldPropertyValueCollection",
    default: ""
  },
  multiple: {
    fields: ["select"],
    options: [
      {
        name: "False",
        value: false
      },
      {
        name: "True",
        value: true
      }
    ],
    default: false
  },
  rows: {
    fields: ["textarea"],
    default: 2
  },
  size: {
    fields: ["select"],
    default: 1
  },
  type: {
    fields: ["input"],
    options: [
      {
        name: "Checkbox",
        value: "checkbox"
      },
      {
        name: "Date",
        value: "date"
      },
      {
        name: "Email",
        value: "email"
      },
      {
        name: "File",
        value: "file"
      },
      {
        name: "Number",
        value: "number"
      },
      {
        name: "Password",
        value: "password"
      },
      {
        name: "Range",
        value: "range"
      },
      {
        name: "Radio Button",
        value: "radio"
      },
      {
        name: "Telephone",
        value: "tel"
      },
      {
        name: "Text Box",
        value: "text"
      },
      {
        name: "Time",
        value: "time"
      }
    ],
    default: "text"
  }
};
