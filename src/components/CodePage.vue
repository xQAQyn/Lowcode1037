<template>
    <code class="language-html">
        {{SourceCode}}
    </code>
</template>

<script>
import {html_beautify} from 'js-beautify'
export default {
    name: "CodePage",
    computed:{
        SourceCode(){
            let edt = document.querySelector('#edt')
            return html_beautify('<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><title>Title</title><style>* {position: absolute;}</style></head><body>' +
                    edt.innerHTML + '' +
                    '    </body></html>')
        }
    },
}
</script>

<style scoped>

</style>