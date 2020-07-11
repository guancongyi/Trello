<template>
  <div class="popup-container">
    <div @click="open">
      <slot></slot>
    </div>
    <!--弹窗，可用于对话框、弹出式菜单等-->
    <!--弹出式菜单-->
    <div class="popup" v-show="isShow" ref="popup">
      <div class="popup-header">
        <span class="popup-title">{{title}}</span>
        <a class="popup-header-close" @click="close" ref="close">
          <i class="icon icon-close"></i>
        </a>
      </div>

      <div class="popup-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'TPopup',
    props:{
        title:{
            type:String,
            default: 'Menu'
        }
    },
    data(){
        return {
            isShow:false
        }
    },
    methods:{
        open(){
            this.isShow = true;
            window.addEventListener('click', this.close)
            this.$nextTick(()=>{
                let $popup = this.$refs.popup;
                let $popupRect = $popup.getBoundingClientRect();
                // console.log($popupRect)
                if ($popupRect.right > window.innerWidth){
                    $popup.style.left = -$popupRect.width + this.$el.offsetWidth + 'px';
                }
            })
            this.$emit('open')
        },
        close(e){
            let path = '';
            if(e){
              path =  e.path || (e.composedPath && e.composedPath())
            }
            if (!e || path.includes(this.$refs.close) || !path.includes(this.$el)){
                this.isShow = false;
                this.$emit('close')
                window.removeEventListener('click', this.close)
            }
        }
    }
}
</script>