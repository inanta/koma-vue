<template>&nbsp;</template>

<script>
export default {
  name: "Sign Out",
  mounted: function () {
    localStorage.removeItem("token");

    this.$router.push("/signin");
  }
};
</script>

<style scoped></style>
