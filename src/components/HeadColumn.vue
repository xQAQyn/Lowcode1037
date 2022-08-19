<template>
    <div id="hc">
        <button @click="preview">预览</button>
        <button @click="sourcecode">导出</button>
    </div>
</template>

<script>
export default {
    name: "HeadColumn",
    methods: {
        preview(){
            this.$store.commit('ChangePreview');
        },
        sourcecode(){
            this.$store.commit('ChangeSource');
        }
    }
}
</script>

<style scoped>
#hc {
    background-color: aliceblue;
    height: 30px;
    width: 100%;
    margin-bottom: 10px;
}
button {
    margin: 3px;
}
</style>