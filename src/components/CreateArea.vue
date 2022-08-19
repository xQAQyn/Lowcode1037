<template>
 <div id="CreateArea">
     <p>点击按钮创建元素</p>
     <BtnCreate v-for="BtnType in TypeList" :Type="BtnType" :key="BtnType"></BtnCreate>
 </div>
</template>

<script>
import BtnCreate from "@/components/BtnCreate";
export default {
    name: "CreateArea",
    components:{
        BtnCreate
    },
    data(){
        return{
            TypeList: ['p','a','button','img','video']
        }
    }
}
</script>

<style scoped>
    #CreateArea{
        /*background-color: cadetblue;*/
        margin: 30px 10px;
        border: 3px dotted cornflowerblue;
    }
    p{
        margin: 30px 0 30px 10px;
        font-size: large;
    }
</style>