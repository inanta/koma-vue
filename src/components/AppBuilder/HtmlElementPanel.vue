<template>
  <div class="bg-primary font-bold p-1.5 rounded-t text-white">
    HTML Elements
  </div>
  <div class="border border-primary">
    <div
      v-for="(element, index) in htmlElements"
      @dragstart="startDrag($event, element)"
      :key="index"
      class="cursor-move px-2 py-0.5"
      draggable="true"
    >
      <div><i :class="element.icon" class="fas"></i> {{ element.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HtmlElementPanel",
  emits: {
    dragstart: null
  },
  data: function () {
    return {
      htmlElements: [
        {
          content: "Heading",
          name: "Heading",
          tag: "h1",
          icon: "fas fa-heading"
        },
        {
          name: "Image",
          tag: "img",
          icon: "fas fa-image"
        },
        {
          content: "Text",
          name: "Text",
          tag: "p",
          icon: "fas fa-font"
        }
      ]
    };
  },
  methods: {
    startDrag: function ($event, element) {
      this.$emit("dragstart", $event, {
        content: element.content,
        element: element.tag,
        name: element.name,
        type: "html"
      });
    }
  }
};
</script>
