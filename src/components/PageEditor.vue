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
    IsNumber: function (val) {
      var regex = /^[0-9]+\.?[0-9]*$/;
      return regex.test(val);
    },
    IsPx: function (val) {
      var regex = /^[0-9]+\.?[0-9]*px$/;
      return regex.test(val);
    },
    GetPxNumber: function (val) {
      return val.replace("px", "");
    },
    GetOffsetLeft: function () {
      return this.$refs.editor.offsetLeft;
    },
    GetOffsetTop: function () {
      return this.$refs.editor.offsetTop;
    },
    GetStyleObject: function (mod) {
      const style = mod.style;
      console.log(this.GetPxNumber(style.ToLeft));
      return {
        left:
          Number(this.GetOffsetLeft()) +
          (this.IsNumber(style.ToLeft)
            ? Number(style.ToLeft)
            : this.IsPx(style.ToLeft)
            ? Number(this.GetPxNumber(style.ToLeft))
            : 0) +
          "px",
        top:
          Number(this.GetOffsetTop()) +
          (this.IsNumber(style.ToTop)
            ? Number(style.ToTop)
            : this.IsPx(style.ToTop)
            ? Number(this.GetPxNumber(style.ToTop))
            : 0) +
          "px",
        width: this.IsNumber(style.BoxWidth) ? style.BoxWidth + "px" : style.BoxWidth,
        height: this.IsNumber(style.BoxHeight) ? style.BoxHeight + "px" : style.BoxHeight,
        backgroundColor: style.BackgroundColor,
        color: style.FontColor,
        fontSize: this.IsNumber(style.FontSize) ? style.FontSize + "px" : style.FontSize,
        fontWeight: style.FontWeight,
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
