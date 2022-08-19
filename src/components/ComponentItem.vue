<template>
    <div>
        <button :id="Item.id" @click="SelectID(Item.id)" :class="CalStyle">{{Item.type}},{{idHash(Item.id)}}</button>
    </div>
</template>

<script>
export default {
    name: "ComponentItem",
    props:['Item'],
    computed:{
        CalStyle(){
            if(this.$store.state.Selected === this.Item.id)
                return 'selected'
            return ''
        }
    },
    methods:{
        idHash(id){
            let hashVal = 0;
            for(let i = 0;i < id.length;i++){
                let chr = id.charCodeAt(i)
                hashVal = ((hashVal << 5) - hashVal) + chr;
                hashVal |= 0
            }
            return Math.abs(hashVal % 10000);
        },
        SelectID(id){
            this.$store.dispatch('Select',id)
        }
    }
}
</script>

<style scoped>
button{
    background-color: aliceblue;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    margin: 3px;
    font-size: 16px;
}
.selected{
    background-color: #4CAF50;
    color: white;
}
</style>