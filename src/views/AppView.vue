<template>
  <div class="mx-4">
    <div class="flex py-2">
      <div class="font-bold my-auto text-xl">{{ app.name }}</div>
      <div class="ml-auto">
        <button
          v-if="!app.is_read_only"
          @click="deleteSelected"
          :disabled="!isItemsChecked"
          :class="{
            'bg-red-600': isItemsChecked,
            'bg-tertiary': !isItemsChecked
          }"
          class="px-3 py-2 rounded text-white"
        >
          <i class="fa fa-trash"></i> Delete
        </button>
        <button
          v-if="!app.is_read_only"
          @click="insert"
          class="bg-primary ml-2 px-3 py-2 rounded text-white"
        >
          <i class="fa fa-plus"></i> Insert
        </button>
      </div>
    </div>
    <div
      class="border border-gray-200 mb-4 mt-2 px-5 py-3 rounded-md"
      style="box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
    >
      <data-table :headers="headers" :items="items" :search="searchText">
        <template #no-data>
          <div class="mx-auto p-5 w-1/3">
            <div>
              <img src="@/assets/img/undraw_empty_re_opql.svg" />
            </div>
            <div>
              <div class="font-bold p-2 text-xl">
                No data was added yet, learn how to add data.
              </div>
              <button
                @click="insert"
                class="bg-primary ml-2 px-3 py-2 rounded text-white"
              >
                <i class="fa fa-plus"></i> Insert
              </button>
            </div>
          </div>
        </template>
        <template #search>
          <div class="relative">
            <!-- <span class="absolute left-1 top-2">
              <i class="fas fa-search fa-sm"></i>
            </span> -->
            <button
              @click="
                isSearchShown = !isSearchShown;
                $refs.searchText.focus();
              "
              class="bg-primary h-9 ml-2 rounded text-white w-9"
            >
              <span class="mdi mdi-magnify mdi-24px"></span>
            </button>
            <input
              v-model="searchText"
              @blur="isSearchShown = searchText !== ''"
              :class="{
                'w-0': !isSearchShown,
                'ml-2 px-2 w-auto': isSearchShown
              }"
              class="border-b-2 border-primary outline-none py-1 transition-all"
              placeholder="Search"
              type="search"
              ref="searchText"
            />
            <!-- <button
              @click="isTableSettingsShown = true"
              class="bg-primary h-9 ml-2 rounded text-white w-9"
            >
              <span class="mdi mdi-24px mdi-border-bottom"></span>
            </button> -->
            <button
              @click="isTableSettingsShown = true"
              class="bg-primary h-9 ml-2 rounded text-white w-9"
            >
              <span class="mdi mdi-table-cog mdi-24px"></span>
            </button>
          </div>
        </template>
        <template #[tableHeaderPK]>
          <div class="text-center">
            <input @change="checkAll" :checked="isCheckedAll" type="checkbox" />
          </div>
        </template>
        <template #header.action="props">
          <span class="inline-block relative text-center w-full">
            {{ props.header.label }}
            <!-- <button
              @click="isTableSettingsShown = true"
              class="bg-primary absolute h-8 px-2 py-1 -right-2 rounded text-white -top-1 w-8"
            >
              <i class="fa fa-sliders"></i>
            </button> -->
          </span>
        </template>
        <template #header._setting>
          <div class="flex">
            <button @click="isTableSettingsShown = true" class="ml-auto">
              <span class="mdi mdi-dots-horizontal mdi-24px"></span>
            </button>
          </div>
        </template>
        <template #[tableItemPK]="props">
          <div class="text-center">
            <input
              v-model="props.item.is_checked"
              @change="checkCheckedAll"
              type="checkbox"
            />
          </div>
        </template>
        <template #item.action="props">
          <div class="text-center">
            <!-- <drop-down-button @click="detail" :buttons="props.items">
              <template #main>
                <span class="inline-block px-3 py-2"
                  ><i class="fa fa-list"></i> Detail</span
                >
              </template>
              <template #menu-toggle>
                <span class="inline-block px-3 py-2"
                  ><i class="fa fa-caret-down"></i>
                </span>
              </template>
              <drop-down-button-item
                ><a
                  @click.prevent="edit(props.item)"
                  class="inline-block px-3 py-2 text-left w-full"
                  href="#"
                  ><i class="fa fa-pencil"></i> Edit</a
                ></drop-down-button-item
              >
            </drop-down-button> -->
            <button
              v-if="!app.is_read_only"
              v-tooltip
              @click="edit(props.item)"
              title="Edit"
            >
              <span class="mdi mdi-pencil mdi-24px"></span>
            </button>
            <button
              v-if="!app.is_read_only"
              v-tooltip
              @click="
                props.item.is_checked = true;
                deleteSelected();
              "
              class="ml-2"
              title="Delete"
            >
              <span class="mdi mdi-delete mdi-24px"></span>
            </button>
            <!-- <button
              v-tooltip
              @click.prevent="edit(props.item)"
              class="ml-2"
              title="More"
            >
              <span class="mdi mdi-dots-vertical mdi-24px"></span>
            </button> -->
          </div>
        </template>
      </data-table>
    </div>
  </div>
  <ns-dialog
    @close="isTableSettingsShown = false"
    :show="isTableSettingsShown"
    size="30%"
  >
    <template #title><i class="fa fa-cog"></i> Table Settings</template>
    <div class="p-3">
      <div class="font-bold">Show / Hide</div>
      <div class="flex flex-col pb-3 pt-2">
        <template v-for="header in headers" :key="header.value">
          <label
            v-if="
              typeof header.hideable === 'undefined' ||
              (typeof header.hideable !== 'undefined' &&
                header.hideable == true)
            "
            ><input v-model="header.visible" type="checkbox" />
            {{ header.label }}
          </label>
        </template>
      </div>
      <div class="border-t border-tertiary pb-1 pt-3 text-right">
        <button
          @click="saveTableViewSettings"
          class="bg-primary px-3 py-2 rounded text-white"
        >
          <i class="fa fa-save"></i> Save
        </button>
      </div>
    </div>
  </ns-dialog>
</template>

<script>
import NsDialog from "@/components/NS/NsDialog.vue";
import DataTable from "@/components/DataTable.vue";
// import DropDownButton from "@/components/AppBuilder/DropDownButton.vue";
// import DropDownButtonItem from "@/components/AppBuilder/DropDownButtonItem.vue";

import NsTooltip from "@/directives/NsTooltip";
import AppBuilder from "@/assets/js/AppBuilder.js";

export default {
  name: "AppView",
  components: {
    NsDialog,
    DataTable
    // DropDownButton,
    // DropDownButtonItem
  },
  directives: { tooltip: NsTooltip },
  data: function () {
    return {
      app: {},
      isCheckedAll: false,
      headers: [],
      items: [],
      searchText: "",
      isSearchShown: false,
      isTableSettingsShown: false
    };
  },
  props: {},
  mounted: function () {
    this.render(this.$route.params.name);
  },
  computed: {
    isItemsChecked: function () {
      const self = this;

      for (let index = 0; index < self.items.length; index++) {
        if (self.items[index].is_checked) {
          return true;
        }
      }

      return false;
    },
    tableHeaderPK: function () {
      return "header." + this.app.pk;
    },
    tableItemPK: function () {
      return "item." + this.app.pk;
    }
  },
  methods: {
    checkAll: function () {
      const self = this;

      self.isCheckedAll = !self.isCheckedAll;

      for (let index = 0; index < self.items.length; index++) {
        self.items[index].is_checked = self.isCheckedAll;
      }
    },
    checkCheckedAll: function () {
      const self = this;
      let is_checked_all = true;

      for (let index = 0; index < self.items.length; index++) {
        if (!self.items[index].is_checked) {
          is_checked_all = false;

          break;
        }
      }

      self.isCheckedAll = is_checked_all;
    },
    deleteSelected: function () {
      const self = this;
      let selected = [];

      for (let index = 0; index < self.items.length; index++) {
        if (self.items[index].is_checked) {
          selected.push(self.items[index]);
        }
      }

      AppBuilder.deleteRecords(self.app, selected).then(function () {
        self.getAllRecords(self.app.slug);
      });
    },
    detail: function (event) {
      console.log(event);
    },
    edit: function (item) {
      const self = this;

      self.$router.push("/app/edit/" + self.app.slug + "/" + item[self.app.pk]);
    },
    getAllRecords: function (app) {
      const self = this;

      AppBuilder.getAllRecord(app).then(function (response) {
        self.app = response.app;
        self.app.slug = app;

        for (let index = 0; index < response.items.length; index++) {
          response.items[index].is_checked = false;
        }

        response.headers.push({
          hideable: false,
          label: "...",
          searchable: false,
          sortable: false,
          value: "_setting",
          visible: true
          // width: "24px"
        });

        self.headers = response.headers;
        self.items = response.items;
      });
    },
    render: function (slug) {
      const self = this;

      // AppBuilder.get(app).then(function (app_response) {
      //   self.app = app_response;

      //   self.getAllRecords(app_response);
      // });

      self.getAllRecords(slug);
    },
    saveTableViewSettings: function () {
      const self = this;
      let headers = [];

      for (let index = 0; index < self.headers.length; index++) {
        const header = self.headers[index];

        if (typeof header.hideable === "undefined" || header.hideable == true) {
          headers.push({
            value: header.value,
            visible: header.visible
          });
        }
      }

      AppBuilder.settings(self.app, { headers: headers });

      self.isTableSettingsShown = false;
    },
    input: function (event) {
      const self = this;

      self.appData[event.target.name] = event.target.value;
    },
    insert: function () {
      const self = this;

      self.$router.push("/app/insert/" + self.app.slug);
    }
  }
};
</script>
