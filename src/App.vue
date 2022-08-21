<template>

    <div id="app">
        <div id="pageheader">
            <head-column/>
        </div>
        <div id="preview" v-show="$store.state.Preview">
            <preview-page/>
        </div>
        <div id="Sourcecode" v-if="$store.state.SourceCode">
            <code-page/>
        </div>

        <div id="pagemain" v-show="!$store.state.Preview && !$store.state.SourceCode">
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
import PreviewPage from "@/components/PreviewPage";
import CodePage from "@/components/CodePage";

export default {
  name: 'App',
  components:{
      CodePage,
      PreviewPage,
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
