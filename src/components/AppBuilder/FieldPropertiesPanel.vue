<template>
  <transition
    name="show-field-properties-transition"
    enter-active-class="animate__animated animate__slideInRight animate__faster"
    leave-active-class="animate__animated animate__slideOutRight animate__faster"
  >
    <div v-if="!isHidden" class="mb-2">
      <div class="bg-primary font-bold p-1.5 rounded-t text-white">
        Properties
        <a @click.prevent="$emit('close')" class="float-right" href=""
          ><i class="fas fa-times p-1"></i
        ></a>
      </div>
      <div
        class="border border-primary overflow-hidden py-0.5 relative text-sm"
      >
        <template
          v-for="(fieldPropertyValue, fieldProperty) in fieldProperties[
            fieldType
          ]"
          :key="fieldProperty"
        >
          <div
            v-if="
              isPropertyAvailable(fieldProperties[fieldType][fieldProperty])
            "
            class="grid grid-cols-2"
          >
            <div class="px-1 py-0.5">
              {{ fieldProperties[fieldType][fieldProperty]["label"] }}
            </div>
            <div class="px-1 py-0.5">
              <!-- Field Option As Dropdown -->
              <select
                v-if="
                  typeof fieldPropertyOptions[fieldProperty] !== 'undefined' &&
                  fieldPropertyOptions[fieldProperty].fields.includes(
                    currentFieldProperties.element
                  ) &&
                  typeof fieldPropertyOptions[fieldProperty].options !==
                    'undefined' &&
                  Array.isArray(fieldPropertyOptions[fieldProperty].options)
                "
                @input="setPropertyValue(fieldProperty, $event.target.value)"
                class="bg-white border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
              >
                <option
                  v-for="option in fieldPropertyOptions[fieldProperty].options"
                  :key="option.name"
                  :selected="getPropertyValue(fieldProperty) == option.value"
                  :value="option.value"
                >
                  {{ option.name }}
                </option>
              </select>
              <!-- Field Option As Custom Vue Component -->
              <template
                v-else-if="
                  typeof fieldPropertyOptions[fieldProperty] !== 'undefined' &&
                  typeof fieldPropertyOptions[fieldProperty].options !==
                    'undefined'
                "
              >
                <component
                  @change="setPropertyValue"
                  :is="fieldPropertyOptions[fieldProperty].options"
                  :properties="properties"
                  :table="table"
                ></component>
              </template>
              <!-- Field Option As Text -->
              <input
                v-else
                @input="setPropertyValue(fieldProperty, $event.target.value)"
                :value="getPropertyValue(fieldProperty)"
                class="border border-primary outline-none px-1 py-0.5 rounded-sm w-full"
                type="text"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import FieldPropertyValueCollection from "@/components/AppBuilder/FieldPropertyValueCollection.vue";

import FieldProperties from "@/assets/js/FieldProperties.js";
import FieldPropertyOptions from "@/assets/js/FieldPropertyOptions.js";

export default {
  name: "FieldPropertiesPanel",
  emits: {
    change: null,
    close: null
  },
  components: {
    FieldPropertyValueCollection
  },
  data: function () {
    return {
      fieldProperties: FieldProperties,
      fieldPropertyOptions: FieldPropertyOptions,
      currentFieldProperties: {}
    };
  },
  props: {
    properties: Object,
    table: String
  },
  watch: {
    properties: {
      handler: function (value) {
        this.currentFieldProperties = value;
      },
      immediate: true
    }
  },
  computed: {
    isHidden: function () {
      return typeof this.properties.element === "undefined" ? true : false;
    },
    fieldType: function () {
      return typeof this.fieldProperties[
        this.currentFieldProperties.element
      ] === "undefined"
        ? "p"
        : this.currentFieldProperties.element;
    }
  },
  methods: {
    isPropertyAvailable: function (property) {
      const self = this;

      if (!Array.isArray(property.rules)) {
        return true;
      }

      for (let index = 0; index < property.rules.length; index++) {
        const rule = property.rules[index];

        if (!rule.values.includes(self.properties[rule.property])) {
          return false;
        }
      }

      return true;
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

      return "";
    },
    setPropertyValue: function (property, value) {
      if (value === "true" || value === "false") {
        if (value === "true") {
          value = true;
        } else {
          value = false;
        }
      }

      this.$emit("change", property, value);
    }
  }
};
</script>
