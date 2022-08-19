<template>
  <div id="csl" v-show="Selected !== '' ">
      <h1>内容设置</h1>
      文本内容：<input :value="PageModule.value" @blur="ChangeValue"><br/>
      url：<input :value="PageModule.url"><br/>
      <h1>位置设置</h1>
      x：<input :value="PageModule.style.ToTop"><br/>
      y：<input :value="PageModule.style.ToLeft"><br/>
      <h1>盒子设置</h1>
      盒子宽度：<input :value="PageModule.style.BoxWidth"><br/>
      盒子高度：<input :value="PageModule.style.BoxHeight"><br/>
      盒子背景色：<input :value="PageModule.style.BackgroundColor"><br/>
      <h1>字体设置</h1>
      字体大小：<input :value="PageModule.style.FontSize"><br/>
      字体粗细：<input :value="PageModule.style.FontWeight"><br/>
      字体颜色：<input :value="PageModule.style.FontColor"><br/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "OperationConsole",

    computed:{
        ...mapState({Selected:'Selected'}),
        PageModule(){
            for(let i = 0;i < this.$store.state.PageModules.length;i++)
                if(this.$store.state.PageModules[i].id === this.Selected)
                    return this.$store.state.PageModules[i];
            return{
                value:'',
                url:'',
                id:'undefined',
                style:{
                    BoxWidth:'',
                    BoxHeight:'',
                    ToLeft:'',
                    ToTop:'',
                    BackgroundColor:'',
                    FontColor:'',
                    FontSize:'',
                    FontWeight:'',
                }
            };
        },
    },
    methods:{
        ChangeValue(event){
            this.$store.state.PageModules[this.index].value = event.target.value
        },
        ChangeUrl(event){
            this.$store.state.PageModules[this.index].url = event.target.value
        },
        ChangeStyle(event,name){
            this.$store.state.PageModules[this.index].style[name] = event.target.value
        }
    }
}
</script>

<style scoped>
  #csl{
    background-color: rgba(0,0,0,0.1);
    padding: 20px;
    right: 0;
    flex: 0 0 300px;
  }
  h1{
      font-size: medium;
  }
</style>