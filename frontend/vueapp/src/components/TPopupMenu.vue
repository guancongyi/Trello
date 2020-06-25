<template>
  <div>
    <ul class="popup-menu-list" >
      <li 
      v-for="item of items" :key="item.name" 
      :class="{seperator: item.separator}"
      @click="command(item.command)"
      >
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:'TPopupMenu',
    props:{
        items:{
            type:Array,
            default(){
                // name, command, separator?
                return []
            }
        }
    },
    methods:{
        command(command){
            this.$emit('command', command)
        }
    }

}
</script>