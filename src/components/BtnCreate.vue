<template>
    <div id="CreateBtn">
        <button @click="CreateType">{{Type}}</button>
    </div>
</template>

<script>
export default {
    name: "BtnCreate",
    props:['Type'],
    methods:{
        CreateType(){
            this.$store.dispatch('CreateModule',this.Type)
        }
    }
}
</script>

<style scoped>
    #CreateBtn{
        height: 30px;
        margin: 10px;
    }
</style>