<template>
    <div id="edt" ref="editor" @click="Select('')">
    <span v-if="isMounted">
      <div
              v-for="mod in modules"
              :key="mod.id"
              :id="mod.id"
              :ref="mod.id"
              class="module"
              :class="IsSelected(mod.id)"
              :style="GetStyleObject(mod)"
              @click.prevent.stop="Select(mod.id)"
              @dblclick="StartEdit"
              @mousedown="DragStart($event,mod.style.ToLeft,mod.style.ToTop)"
              @mousemove.prevent="Drag($event,mod.id)"
              @mouseup.prevent="DragEnd"
      >
          <span v-if="$store.state.Selected !== mod.id || !isEditing" v-html="GenerateHtml(mod)"></span>
          <input
                  v-else
                  :value="mod.value"
                  @blur="FinishEdit($event,mod.id)"
          >
          <div
                  id="left"
                  v-show="$store.state.Selected === mod.id"
                  @mousedown.prevent.stop="ResizeLeftStart(mod.style.ToLeft,mod.style.BoxWidth,mod.id)"
          ></div>
          <div
                  id="right"
                  v-show="$store.state.Selected === mod.id"
                  @mousedown.prevent.stop="ResizeRightStart(mod.style.ToLeft,mod.id)"
          ></div>
          <div
                  id="top"
                  v-show="$store.state.Selected === mod.id"
                  @mousedown.prevent.stop="ResizeTopStart(mod.style.ToTop,mod.style.BoxHeight,mod.id)"
          ></div>
          <div
                  id="bottom"
                  v-show="$store.state.Selected === mod.id"
                  @mousedown.prevent.stop="ResizeBottomStart(mod.style.ToTop,mod.id)"
          ></div>
      </div>

    </span>
    </div>
</template>

<script>
export default {
    name: "PageEditor",
    data: function () {
        return {
            modules: this.$store.state.PageModules,
            isMounted: false,
            dX: 0,
            dY: 0,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            isEditing: false,
        };
    },
    methods: {
        IsNumber: function (val) {
            var regex = /^[0-9]+\.?[0-9]*$/;
            return regex.test(val);
        },
        IsPx: function (val) {
            var regex = /^[0-9]+\.?[0-9]*px$/;
            return regex.test(val);
        },
        GetPxNumber: function (val) {
            return val.replace("px", "");
        },
        GetOffsetLeft: function () {
            return this.$refs.editor.offsetLeft;
        },
        GetOffsetTop: function () {
            return this.$refs.editor.offsetTop;
        },
        GetStyleObject: function (mod) {
            const style = mod.style;
            return {
                left:
                        Number(this.GetOffsetLeft()) +
                        (this.IsNumber(style.ToLeft)
                                ? Number(style.ToLeft)
                                : this.IsPx(style.ToLeft)
                                        ? Number(this.GetPxNumber(style.ToLeft))
                                        : 0) +
                        "px",
                top:
                        Number(this.GetOffsetTop()) +
                        (this.IsNumber(style.ToTop)
                                ? Number(style.ToTop)
                                : this.IsPx(style.ToTop)
                                        ? Number(this.GetPxNumber(style.ToTop))
                                        : 0) +
                        "px",
                width: this.IsNumber(style.BoxWidth) ? style.BoxWidth + "px" : style.BoxWidth,
                height: this.IsNumber(style.BoxHeight) ? style.BoxHeight + "px" : style.BoxHeight,
                backgroundColor: style.BackgroundColor,
                color: style.FontColor,
                fontSize: this.IsNumber(style.FontSize) ? style.FontSize + "px" : style.FontSize,
                fontWeight: style.FontWeight,
            };
        },
        GenerateHtml: function (mod) {
            switch (mod.type) {
                case "p":
                    return `<p>${mod.value}</p>`;
                case "a":
                    return `<a href="${mod.url}">${mod.value}</a>`;
                case "button":
                    return `<button style="height:100%;width:100%">${mod.value}</button>`;
                case "img":
                    return `<img src="${mod.url}" height="100%"/>`;
                case "video":
                    return `<video src="${mod.url}" height="100%" loop controls/>`;
            }
        },
        Select(id) {
            if (this.$store.state.Selected !== id)
                this.$store.dispatch('Select', id)
        },
        IsSelected(id) {
            if (this.$store.state.Selected === id)
                return "selected"
            return ''
        },
        DragStart(event, ox, oy) {
            this.dX = event.clientX - Number(ox)
            this.dY = event.clientY - Number(oy)
        },
        Drag(event, id) {
            if (this.dX !== 0 || this.dY !== 0) {
                this.$store.dispatch('ChangeStyle', {
                    id: id,
                    name: 'ToTop',
                    NewVal: event.clientY - this.dY
                })
                this.$store.dispatch('ChangeStyle', {
                    id: id,
                    name: 'ToLeft',
                    NewVal: event.clientX - this.dX
                })
            }
        },
        DragEnd() {
            this.dX = this.dY = 0
        },
        ResizeLeftStart(ToLeft,Width,id){
            this.right = Number(ToLeft) + Number(Width) + this.GetOffsetLeft()
            const vm = this
            let ResizeLeft = function (event){
                vm.$store.dispatch('ChangeStyle',{
                    id: id,
                    name: 'ToLeft',
                    NewVal: event.clientX - vm.GetOffsetLeft()
                })
                vm.$store.dispatch('ChangeStyle',{
                    id: id,
                    name: 'BoxWidth',
                    NewVal: vm.right - event.clientX
                })
            };
            let ResizeLeftEnd = function (){
                document.removeEventListener('mousemove',ResizeLeft)
                document.removeEventListener('mouseup',ResizeLeftEnd)
            }
            document.addEventListener('mousemove',ResizeLeft)
            document.addEventListener('mouseup',ResizeLeftEnd)
        },
        ResizeRightStart(ToLeft,id){
            this.left = Number(ToLeft) + this.GetOffsetLeft()
            const vm = this
            let ResizeRight = function (event){
                vm.$store.dispatch('ChangeStyle',{
                    id: id,
                    name: 'BoxWidth',
                    NewVal: event.clientX - vm.left
                })
            };
            let ResizeRightEnd = function (){
                document.removeEventListener('mousemove',ResizeRight)
                document.removeEventListener('mouseup',ResizeRightEnd)
            }
            document.addEventListener('mousemove',ResizeRight)
            document.addEventListener('mouseup',ResizeRightEnd)
        },
        ResizeTopStart(ToTop,Height,id){
            this.bottom = Number(ToTop) + Number(Height) + this.GetOffsetTop()
            const vm = this
            let ResizeTop = function (event){
                vm.$store.dispatch('ChangeStyle',{
                    id: id,
                    name: 'ToTop',
                    NewVal: event.clientY - 39 - vm.GetOffsetTop()
                })
                vm.$store.dispatch('ChangeStyle',{
                    id: id,
                    name: 'BoxHeight',
                    NewVal: vm.bottom - event.clientY + 39
                })
            };
            let ResizeTopEnd = function (){
                document.removeEventListener('mousemove',ResizeTop)
                document.removeEventListener('mouseup',ResizeTopEnd)
            }
            document.addEventListener('mousemove',ResizeTop)
            document.addEventListener('mouseup',ResizeTopEnd)
        },
        ResizeBottomStart(ToTop,id){
            this.top = Number(ToTop) + this.GetOffsetTop()
            const vm = this
            let ResizeBottom = function (event){
                vm.$store.dispatch('ChangeStyle',{
                    id: id,
                    name: 'BoxHeight',
                    NewVal: event.clientY - 39 - vm.top
                })
            };
            let ResizeBottomEnd = function (){
                document.removeEventListener('mousemove',ResizeBottom)
                document.removeEventListener('mouseup',ResizeBottomEnd)
            }
            document.addEventListener('mousemove',ResizeBottom)
            document.addEventListener('mouseup',ResizeBottomEnd)
        },
        StartEdit(){
            this.isEditing = true
        },
        FinishEdit(event,id){
            this.$store.dispatch('ChangeValue',{
                id: id,
                NewVal: event.target.value
            })
            this.isEditing = false
        }

    },
    mounted() {
        this.isMounted = true;
    },
};
</script>

<style>
#edt {
    background-color: grey;
    flex: 0 0 800px;
    height: 450px;
    margin: 200px 10px;
}

#edt .module {
    position: absolute;
}

#edt p {
    margin: 0;
}

#edt .selected {
    border: solid cornflowerblue;
}

#edt * {
    height: 100%;
}

#edt #left{
    position: absolute;
    height: 4px;
    width: 4px;
    left: -3px;
    top: calc(50% - 2px);
    background-color: white;
    cursor: ew-resize;
}

#edt #right{
    position: absolute;
    height: 4px;
    width: 4px;
    left: calc(100% - 2px);
    top: calc(50% - 2px);
    background-color: white;
    cursor: ew-resize;
}

#edt #top{
    position: absolute;
    height: 4px;
    width: 4px;
    left: calc(50% - 2px);
    top: -2px;
    background-color: white;
    cursor: ns-resize;
}

#edt #bottom{
    position: absolute;
    height: 4px;
    width: 4px;
    left: calc(50% - 2px);
    top: calc(100% - 2px);
    background-color: white;
    cursor: ns-resize;
}

#edt input{
    position: absolute;
    left: 0;
    top: 0;
}
</style>
