<template>
    <div id="Preview" ref="preview">
<!--        123-->
        <div
                v-for="mod in PageModules"
                :key="mod.id"
                :style="GetStyleObject(mod)"
        >
            <span v-html="GenerateHtml(mod)"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PreviewPage",
    methods:{
        GetStyleObject: function (mod) {
            const style = mod.style;
            return {
                left: style.ToLeft * 1.8 + "px",
                top: style.ToTop * 1.3 + 'px',
                width: (mod.type === 'img' || mod.type === 'video') ? 'auto' :style.BoxWidth * 1.8 + "px",
                height: style.BoxHeight * 1.8 + "px",
                backgroundColor: style.BackgroundColor,
                color: style.FontColor,
                fontSize: style.FontSize * 1.8 + "px",
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
                    return `<button style="height:100%;width:100%">${mod.value}</button>`;
                case "img":
                    return `<img src="${mod.url}" style="width:auto;height:auto;max-width:100%;max-height:100%"/>`;
                case "video":
                    return `<video src="${mod.url}" height="100%" width="auto" loop controls/>`;
            }
        },
    },
    computed:{
        PageModules(){
            return this.$store.state.PageModules
        }
    }
}
</script>

<style scoped>

#Preview div{
    position: absolute;
}

#Preview{
    background-color: darkgrey;
    height: 845px;
    width: 1440px;
}

#Preview *{
    height: 100%;
}
</style>