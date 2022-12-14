<template>
  <div class="mx-4">
    <div class="flex py-2">
      <div class="font-bold my-auto text-xl">{{ app.name }}</div>
      <div class="ml-auto">
        <button @click="cancel" class="bg-red-600 px-3 py-2 rounded text-white">
          <i class="fa fa-times"></i> Cancel
        </button>
        <button
          @click="save"
          class="bg-primary ml-2 px-3 py-2 rounded text-white"
        >
          <i class="fa fa-save"></i> Save
        </button>
      </div>
    </div>
    <div
      class="border border-gray-200 mb-4 mt-2 px-5 py-3 rounded-md"
      style="box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
    >
      <template v-for="(container, index) in containers" :key="container.name">
        <div v-if="index == selectedContainer" class="flex-grow flex-shrink">
          <div class="py-2">
            <div
              v-for="(row, row_index) in container.rows"
              :class="'grid-cols-' + row.columns.length"
              :key="row_index"
              class="grid gap-2"
            >
              <div
                v-for="(column, column_index) in row.columns"
                :key="column_index"
                class="x-p-1"
              >
                <label :for="column.name" class="block pb-1 pt-2">
                  {{ column.label }}
                </label>
                <component
                  @input="input"
                  @change="input"
                  :is="column.element"
                  v-bind="cleanAttributes(column)"
                  class="border border-gray-400 outline-none px-3 py-1.5 rounded-sm text-sm w-full"
                >
                  <template v-if="column.items">
                    <component
                      v-for="item in column.items"
                      :is="item.element"
                      :key="item.name"
                      v-bind="item"
                      >{{ item.label }}</component
                    >
                  </template>
                </component>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  name: "AppInsert",
  data: function () {
    return {
      app: {},
      containers: [],
      selectedContainer: 0,
      values: {}
    };
  },
  props: {},
  mounted: function () {
    this.render(this.$route.params.name);
  },
  watch: {
    $route(to) {
      this.render(to.params.name);
    }
  },
  methods: {
    cancel: function () {
      const self = this;

      self.$router.push("/app/view/" + self.app.slug);
    },
    cleanAttributes(attributes) {
      let cleaned_attributes = {};

      for (const key in attributes) {
        if (typeof attributes[key] !== "object" && attributes[key] !== "") {
          cleaned_attributes[key] = attributes[key];
        }
      }

      return cleaned_attributes;
    },
    input: function (event) {
      const self = this;

      self.values[event.target.name] = event.target.value;
    },
    render: function (app_slug) {
      const self = this;

      AppBuilder.get(app_slug).then(function (app) {
        self.app = app;
        self.containers.splice(0);

        for (let index = 0; index < app.columns.length; index++) {
          const column = app.columns[index];

          if (typeof self.containers[column.container] === "undefined") {
            self.containers[column.container] = {
              rows: []
            };
          }

          if (
            typeof self.containers[column.container].rows[column.row] ===
            "undefined"
          ) {
            self.containers[column.container].rows[column.row] = {
              columns: []
            };
          }

          /* TODO Fix This. What if the items value is from database */
          if (typeof column.items !== "undefined" && column.items.length > 0) {
            self.values[column.name] = column.items[0].value;
          }

          self.containers[column.container].rows[column.row].columns.push(
            column
          );
        }
      });
    },
    save: function () {
      const self = this;

      AppBuilder.insertRecord(self.app, self.values).then(function () {
        self.$router.push("/app/view/" + self.app.slug);
      });
    }
  }
};
</script>
