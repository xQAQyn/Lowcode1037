<template>
    <div id="edt">
        <span v-html="render()" ref="editor"></span>
    </div>
</template>

<script>
export default {
    name: "PageEditor",
    methods: {
        render: function () {
            const modules = this.$store.state.PageModules;
            var content = [];
            for (var i = 0; i < modules.length; i++) {
                switch (modules[i].type) {
                    case "p":
                        content.push(`<p>${modules[i].value}</p>`);
                        break;
                    case "a":
                        content.push(`<a href="${modules[i].url}">${modules[i].value}</a>`);
                        break;
                    case "button":
                        content.push(`<button>${modules[i].value}</button>`);
                        break;
                    case "img":
                        content.push(`<img src="${modules[i].url}"/>`);
                        break;
                    case "video":
                        content.push(`<video src="${modules[i].url}"/>`);
                        break;
                }
            }
            return content.join("");
        },
        op(){
            console.log(this.$refs.editor.offsetTop)
        },
        GetOffsetLeft: function () {
            console.log(this.$refs.editor.offsetLeft)
            return this.$refs.editor.offsetLeft;
        },
        GetOffsetTop: function () {
            return this.$refs.editor.offsetTop;
        },
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
</style>
