<template>
  <div id="csl" >
      <div v-if="Selected !== '' ">
          <h1>内容设置</h1>
          文本内容：<input :value="PageModule.value" @blur="ChangeValue($event)"><br/>
          url：<input :value="PageModule.url" @blur="ChangeUrl($event)"><br/>
          <h1>位置设置</h1>
          x：<input :value="PageModule.style.ToLeft" type="number" @blur="ChangeStyleNum($event,'ToLeft')"><br/>
          y：<input :value="PageModule.style.ToTop" type="number" @blur="ChangeStyleNum($event,'ToTop')"><br/>
          <h1>盒子设置</h1>
          盒子宽度：<input :value="PageModule.style.BoxWidth" type="number" @blur="ChangeStyleNum($event,'BoxWidth')"><br/>
          盒子高度：<input :value="PageModule.style.BoxHeight" type="number" @blur="ChangeStyleNum($event,'BoxHeight')"><br/>
          盒子背景色：<input :value="PageModule.style.BackgroundColor" @blur="ChangeStyle($event,'BackgroundColor')"><br/>
          <h1>字体设置</h1>
          字体大小：<input :value="PageModule.style.FontSize" type="number" @blur="ChangeStyleNum($event,'FontSize')"><br/>
          字体粗细：<input :value="PageModule.style.FontWeight" type="number" @blur="ChangeStyleNum  ($event,'FontWeight')"><br/>
          字体颜色：<input :value="PageModule.style.FontColor" @blur="ChangeStyle($event,'FontColor')"><br/>
      </div>
      <p v-else>点击元素查看属性</p>

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
            this.$store.dispatch('ChangeValue',{
                id: this.PageModule.id,
                NewVal: event.target.value
            })
        },

        ChangeUrl(event){
            this.$store.dispatch('ChangeUrl',{
                id: this.PageModule.id,
                NewVal: event.target.value
            })
        },

        ChangeStyle(event,name){
            // this.PageModule.style[name] = event.target.value
            this.$store.dispatch('ChangeStyle',{
                id: this.PageModule.id,
                name: name,
                NewVal: event.target.value
            })
        },

        ChangeStyleNum(event,name){
            // this.PageModule.style[name] = event.target.value
            this.$store.dispatch('ChangeStyle',{
                id: this.PageModule.id,
                name: name,
                NewVal: Number(event.target.value)
            })
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