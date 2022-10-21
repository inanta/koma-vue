<template>
  <div class="inline-block relative">
    <button
      @click="$emit('click', $event)"
      class="bg-primary rounded-l text-white"
    >
      <slot name="main">
        <span class="inline-block px-3 py-2">Button</span>
      </slot>
    </button>
    <button
      @click="isMenuShown = !isMenuShown"
      class="bg-primary border-l border-tertiary rounded-r text-white"
    >
      <slot name="menu-toggle">
        <span class="inline-block px-3 py-2">&#9660;</span>
      </slot>
    </button>
    <div
      v-if="isMenuShown"
      class="absolute bg-white right-0 rounded shadow w-40 z-10"
    >
      <ul class="inline">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDownButton",
  emits: {
    click: null
  },
  props: {
    // hidden: Boolean,
    // table: String
  },
  data() {
    return {
      isMenuShown: false
    };
  },
  watch: {
    // tables: {
    //   handler: function (value) {
    //     this.selectedTable = value;
    //     if (value !== "") {
    //       this.getColumns();
    //     }
    //   },
    //   immediate: true
    // }
  },
  mounted: function () {
    // this.fetchTables("appbuildertables");
  },
  methods: {
    // fetchTables: function () {
    //   const self = this;
    //   console.log(self);
    // }
  }
};
</script>
