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
            let edt = document.querySelector('#edt')
            return '<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><title>Title</title><style>* {position: absolute;}</style></head><body>' +
                    edt.innerHTML + '' +
                    '    </body></html>'
        }
    },
}
</script>

<style scoped>

</style>