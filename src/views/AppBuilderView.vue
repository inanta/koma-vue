<template>
  <div class="mx-4">
    <div class="flex py-2">
      <div class="font-bold my-auto text-xl">App Builder</div>
      <div class="ml-auto">
        <button
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
          @click="build"
          class="bg-primary ml-2 px-3 py-2 rounded text-white"
        >
          <i class="fa fa-shapes"></i> Create
        </button>
      </div>
    </div>
    <div
      class="border border-gray-200 mb-4 mt-2 px-5 py-3 rounded-md"
      style="box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
    >
      <data-table :headers="headers" :items="items" :search="searchText">
        <template #search>
          <div class="relative">
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
          </div>
        </template>
        <template #[tableHeaderID]>
          <div class="text-center">
            <input @change="checkAll" :checked="isCheckedAll" type="checkbox" />
          </div>
        </template>
        <template #header.action="props">
          <span class="inline-block text-center w-full">
            {{ props.header.label }}
          </span>
        </template>
        <template #[tableItemID]="props">
          <div class="text-center">
            <input
              v-model="props.item.is_checked"
              @change="checkCheckedAll"
              type="checkbox"
            />
          </div>
        </template>
        <template #item.name="props">
          <a
            @click.prevent="$router.push('/app/view/' + props.item.slug)"
            href="#"
            >{{ props.item.name }}</a
          >
        </template>
        <template #item.tags="props">
          {{ props.item.tags.join(", ") }}
        </template>
        <template #item.action="props">
          <div class="text-center">
            <button
              v-tooltip
              @click="$router.push('/app/view/' + props.item.slug)"
              title="View App"
            >
              <span class="mdi mdi-eye mdi-24px"></span>
            </button>
            <button
              v-tooltip
              @click="edit(props.item)"
              class="ml-2"
              title="Edit App"
            >
              <span class="mdi mdi-application-edit mdi-24px"></span>
            </button>
            <button
              v-tooltip
              @click="toggleReadOnly(props.item)"
              class="ml-2"
              :title="
                props.item.is_read_only ? 'Set Read And Write' : 'Set Read Only'
              "
            >
              <span
                :class="{
                  'mdi-lock': !props.item.is_read_only,
                  'mdi-lock-open': props.item.is_read_only
                }"
                class="mdi mdi-lock mdi-24px"
              ></span>
            </button>
          </div>
        </template>
      </data-table>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";

import NsTooltip from "@/directives/NsTooltip";
import AppBuilder from "@/assets/js/AppBuilder";

export default {
  components: {
    DataTable
  },
  directives: { tooltip: NsTooltip },
  name: "App",
  data: function () {
    return {
      isCheckedAll: false,
      headers: [
        // {
        //   label: "",
        //   value: "_id",
        //   searchable: false,
        //   sortable: false,
        //   visible: true
        // },
        // {
        //   label: "Name",
        //   value: "name",
        //   searchable: true,
        //   sortable: true,
        //   visible: true
        // },
        // {
        //   label: "Slug",
        //   value: "slug",
        //   searchable: true,
        //   sortable: true,
        //   visible: true
        // },
        // {
        //   label: "Action",
        //   value: "action",
        //   searchable: false,
        //   sortable: false,
        //   visible: true
        // }
      ],
      items: [],
      app_id_column: "",
      searchText: "",
      isSearchShown: false,

      test: [
        {
          label: "",
          value: "_id",
          searchable: false,
          sortable: false,
          visible: true
        },
        {
          label: "Name",
          value: "name",
          searchable: true,
          sortable: true,
          visible: true
        },
        {
          label: "Slug",
          value: "slug",
          searchable: true,
          sortable: true,
          visible: true
        },
        {
          label: "Action",
          value: "action",
          searchable: false,
          sortable: false,
          visible: true
        }
      ]
    };
  },
  props: {},
  mounted: function () {
    let self = this;

    self.getAll();
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
    tableHeaderID: function () {
      return "header." + this.app_id_column;
    },
    tableItemID: function () {
      return "item." + this.app_id_column;
    }
  },
  methods: {
    build: function () {
      const self = this;

      self.$router.push("/appbuilder/build");
    },
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

      AppBuilder.delete(selected).then(function () {
        self.getAll(self.app);
      });
    },
    edit: function (item) {
      const self = this;

      self.$router.push("/appbuilder/build/" + item.slug);
    },
    getAll: function () {
      let self = this;

      AppBuilder.getAll().then(function (response) {
        self.app_id_column = response.app_id_column;
        self.headers = response.headers;
        self.items = response.items;
      });
    },
    toggleReadOnly(app) {
      const self = this;
      const is_read_only = !app.is_read_only;

      AppBuilder.settings(app, { is_read_only: is_read_only }).then(
        function () {
          self.getAll();
        }
      );
    }
  }
};
</script>
