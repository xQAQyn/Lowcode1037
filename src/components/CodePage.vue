<template>
    <code class="language-html">
        {{SourceCode}}
    </code>
</template>

<script>
export default {
    name: "CodePage",
    computed:{
        SourceCode(){
            let edt = document.querySelector('#Preview')
            return '<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><title>Title</title><style>*' +
                    '{position: absolute;height: 100%;width: 100%;min-width: 200px;min-height: 200px}</style></head><body><div>' +
                    edt.innerHTML + '' +
                    '</div></body></html>'
        }
    },
}
</script>

<style scoped>

</style>