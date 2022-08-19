<template>
    <div id="clib">
        <CreateArea/>
        <ItemList/>
    </div>
</template>


<script>
import CreateArea from '@/components/CreateArea';
import ItemList from "@/components/ItemList";
export default {
    name: "ComponentLib",
    components: {
        CreateArea,
        ItemList
    },
}
</script>

<style scoped>
#clib {
    background-color: rgba(0,0,0,0.1);
    flex: 0 0 300px;
}

.list {
    list-style: none;
    padding: 0;
}

.list > li {
    height: 2.3rem;
    line-height: 2.3rem;
    margin: 1rem;
    padding-left: 1rem;
    border-left: .2rem solid coral;
    background-color: #283448;
}

header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>