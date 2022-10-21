<template>
  <div
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @dragover="dragOver"
    class="p-0.5 relative animate__animateds animate__zoomIn animate__faster"
  >
    <div
      @click.self="$emit('select')"
      @mouseenter="$emit('focus')"
      @mouseleave="$emit('blur')"
      class="border p-1 rounded-sm"
      :class="{
        'border-primary': isFocused || isSelected,
        'border-dotted': isFocused,
        '!border-dashed': isSelected,
        'border-white': !isFocused || !isSelected
      }"
    >
      <field-tool-bar
        @remove="$emit('remove')"
        :hidden="!isFocused"
      ></field-tool-bar>
      <!-- Textarea Field -->
      <label
        v-if="getPropertyValue('element') == 'textarea'"
        class="pointer-events-none"
      >
        <div class="pb-1">{{ fieldLabel }}</div>
        <textarea
          :placeholder="getPropertyValue('placeholder')"
          :rows="getPropertyValue('rows')"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        ></textarea>
      </label>
      <!-- Dropdown Field -->
      <label
        v-else-if="getPropertyValue('element') == 'select'"
        class="pointer-events-none"
      >
        <div class="pb-1">{{ fieldLabel }}</div>
        <select
          :multiple="getPropertyValue('multiple')"
          :size="getPropertyValue('size')"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        >
          <option
            v-for="(item, index) in getPropertyValue('items').value"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </label>
      <!-- Input (Text Box, Password, Check Box, Radio Button) Field -->
      <label
        v-else-if="getPropertyValue('element') == 'input'"
        class="pointer-events-none"
      >
        <div class="pb-1">{{ fieldLabel }}</div>
        <input
          v-bind="getPropertiesValue()"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        />
      </label>
      <!-- Other Type Field -->
      <component
        v-else
        :xcontenteditable="getPropertyValue('contenteditable')"
        :is="getPropertyValue('element')"
        class="pointer-events-none"
      >
        {{ getPropertyValue("content") }}
      </component>
    </div>
  </div>
</template>

<script>
import FieldToolBar from "@/components/AppBuilder/FieldToolBar.vue";
import FieldPropertyOptions from "@/assets/js/FieldPropertyOptions.js";

export default {
  name: "Field",
  emits: {
    blur: null,
    "switch-column": null,
    // dragenter: null,
    // dragleave: null,
    focus: null,
    remove: null,
    select: null
  },
  components: {
    FieldToolBar
  },
  data: function () {
    return {
      fieldPropertyOptions: FieldPropertyOptions
    };
  },
  props: {
    column: Number,
    focus: Boolean,
    label: String,
    properties: Object,
    row: Number,
    select: Boolean
  },
  computed: {
    fieldLabel: function () {
      return this.label;
    },
    isFocused: function () {
      return this.focus;
    },
    isSelected: function () {
      return this.select;
    }
  },
  methods: {
    dragEnter: function ($event) {
      console.log("Drag Enter", $event);
      // this.$emit("dragenter", $event);
    },
    dragLeave: function ($event) {
      console.log("Drag Leave", $event);
      // this.$emit("dragleave", $event);
    },
    dragOver: function () {
      // console.log("drag over", this.row.index);
      // let selected_column = 0;

      // for (let index = 0; index < this.row.columns.length; index++) {
      //   const column = this.row.columns[index];
      //   // console.log(column);

      //   if (this.properties === column) {
      //     selected_column = index;
      //   }
      // }

      // let index = $event.dataTransfer.getData("index");

      // console.log("INDEX", $event);
      // console.log(this.row.index, selected_column);

      this.$emit("switch-column", this.row, this.column);
    },
    getPropertyValue: function (property) {
      if (typeof this.properties[property] !== "undefined") {
        return this.properties[property];
      }

      if (
        typeof this.fieldPropertyOptions[property] !== "undefined" &&
        typeof this.fieldPropertyOptions[property].default !== "undefined"
      ) {
        return this.fieldPropertyOptions[property].default;
      }

      return false;
    },
    getPropertiesValue: function () {
      return this.properties;
    }
  }
};
</script>
