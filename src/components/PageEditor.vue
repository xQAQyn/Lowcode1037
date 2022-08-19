<template>
  <div id="edt" ref="editor">
    <span v-if="isMounted">
      <div
        v-for="mod in modules"
        :key="mod.id"
        :id="mod.id"
        class="module"
        :style="GetStyleObject(mod)"
      >
        <span v-html="GenerateHtml(mod)"></span>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "PageEditor",
  data: function () {
    return {
      modules: this.$store.state.PageModules,
      isMounted: false,
    };
  },
  methods: {
    op() {
      console.log(this.$refs.editor.offsetTop);
    },
    GetOffsetLeft: function () {
      console.log(this.$refs.editor.offsetLeft);
      return this.$refs.editor.offsetLeft;
    },
    GetOffsetTop: function () {
      return this.$refs.editor.offsetTop;
    },
    GetStyleObject: function (mod) {
      return {
        left: mod.style.ToLeft + this.GetOffsetLeft() + "px",
        top: mod.style.ToTop + this.GetOffsetTop() + "px",
        width: mod.style.BoxWidth + "px",
        height: mod.style.BoxHeight + "px",
        backgroundColor: mod.style.BackgroundColor,
        color: mod.style.FontColor,
        fontSize: mod.style.FontSize + "px",
        fontWeight: mod.style.FontWeight,
      };
    },
    GenerateHtml: function (mod) {
      switch (mod.type) {
        case "p":
          return `<p>${mod.value}</p>`;
        case "a":
          return `<a href="${mod.url}">${mod.value}</a>`;
        case "button":
          return `<button>${mod.value}</button>`;
        case "img":
          return `<img src="${mod.url}"/>`;
        case "video":
          return `<video src="${mod.url}"/>`;
      }
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style scoped>
#edt {
  background-color: grey;
  flex: 0 0 800px;
  height: 450px;
  margin: 200px 10px;
}

.module {
  position: absolute;
}
</style>
