<template>
  <div
    class="p-0.5 relative animate__animateds animate__zoomIn animate__faster"
  >
    <div class="p-1" :class="{}">
      <label>
        <div class="pb-1">{{ fieldLabel }}</div>
        <textarea
          v-if="getPropertyValue('element') == 'textarea'"
          :placeholder="getPropertyValue('placeholder')"
          :rows="getPropertyValue('rows')"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        ></textarea>
        <select
          v-else-if="getPropertyValue('element') == 'select'"
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
        <input
          v-else
          v-bind="getPropertiesValue()"
          class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Field",
  emits: {},
  components: {},
  data: function () {
    return {};
  },
  props: {
    properties: Object
  },
  computed: {
    fieldLabel: function () {
      return this.properties.label;
    }
  },
  methods: {
    getPropertyValue: function (property) {
      if (typeof this.properties[property] !== "undefined") {
        return this.properties[property];
      }

      // if (
      //   typeof this.fieldPropertyOptions[property] !== "undefined" &&
      //   typeof this.fieldPropertyOptions[property].default !== "undefined"
      // ) {
      //   return this.fieldPropertyOptions[property].default;
      // }

      return false;
    },
    getPropertiesValue: function () {
      return this.properties;
    }
  }
};
</script>
