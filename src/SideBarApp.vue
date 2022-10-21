<template>
  <side-bar>
    <template v-slot:logo>
      <div class="sidebar-brand-icon -rotate-12">
        <i class="fas fa-user text-3xl"></i>
      </div>
    </template>
    <sup>8</sup>D Project
  </side-bar>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  name: "SideBarApp",
  components: {
    SideBar
  }
};
</script>

<style lang="scss"></style>
