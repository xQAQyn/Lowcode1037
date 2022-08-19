<template>

    <div id="app">
        <div id="pageheader">
            <head-column/>
        </div>

        <div id="preview" v-if="$store.state.Preview">

        </div>
        <div id="Sourcecode" v-else-if="$store.state.SourceCode">

        </div>

        <div id="pagemain" v-else>
            <component-lib/>
            <page-editor/>
            <operation-console/>
        </div>
    </div>
</template>

<script>
import HeadColumn from "@/components/HeadColumn";
import ComponentLib from "@/components/ComponentLib";
import PageEditor from "@/components/PageEditor";
import OperationConsole from "@/components/OperationConsole";

export default {
  name: 'App',
  components:{
    HeadColumn,
    ComponentLib,
    PageEditor,
    OperationConsole
  }
}
</script>

<style>

#app{
    width: 100%;
    height: 100%;
}

#pageheader{
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
}

#pagemain{
  position: absolute;
  top:40px;
  width: 100%;
  height: 1080px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}


</style>
