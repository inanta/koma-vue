export default {
  /* Format 
  "tag / field type": {
    "option name": { label: "label"},
  }
  */
  // h1: {
  //   element: { label: "Type"},
  // },
  input: {
    element: {
      label: "Element Type"
    },
    label: {
      label: "Label"
    },
    max: {
      label: "Max",
      rules: [
        {
          property: "type",
          values: ["number", "range"]
        }
      ]
    },
    maxlength: {
      label: "Max Length",
      rules: [
        {
          property: "type",
          values: ["text"]
        }
      ]
    },
    min: {
      label: "Min",
      rules: [
        {
          property: "type",
          values: ["number", "range"]
        }
      ]
    },
    minlength: {
      label: "Min Length",
      rules: [
        {
          property: "type",
          values: ["text"]
        }
      ]
    },
    placeholder: {
      label: "Placeholder",
      rules: [
        {
          property: "type",
          values: ["email", "number", "password", "tel", "text"]
        }
      ]
    },
    step: {
      label: "Step",
      rules: [
        {
          property: "type",
          values: ["number", "range"]
        }
      ]
    },
    type: {
      label: "Type"
    }
  },
  p: {
    content: {
      label: "Content"
    }
  },
  select: {
    element: {
      label: "Element Type"
    },
    items: {
      label: "Items"
    },
    label: {
      label: "Label"
    },
    multiple: {
      label: "Multiple"
    },
    placeholder: {
      label: "Placeholder"
    },
    size: {
      label: "Size"
    }
  },
  textarea: {
    element: {
      label: "Element Type"
    },
    label: {
      label: "Label"
    },
    placeholder: {
      label: "Placeholder"
    },
    rows: {
      label: "Rows"
    }
  }
};
