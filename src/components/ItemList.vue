<template>
    <div id="ItemList">
        <p>已添加模块列表</p>
        <ComponentItem
               v-for="item in $store.state.PageModules"
               :Item="item"
               :key="item.id"
        ></ComponentItem>

    </div>
</template>

<script>
import ComponentItem from "@/components/ComponentItem";
export default {
    name: "ItemList",
    components: {
        ComponentItem
    },
}
</script>

<style scoped>
.button {
    padding: .5rem;
    margin: .5rem;
    border-radius: .5rem;
    font-size: 1rem;
    /* color: white; */
    background-color: white;
    border: .2rem solid rgb(139, 178, 255);

    transition: all .15s;
}

.button:hover {
    color: white;
    background-color: cornflowerblue;
}

#ItemList{
    border: 3px dotted cornflowerblue;
    margin: 30px 10px;
}

p{
    margin: 30px 0 30px 10px;
    font-size: large;
}
</style>