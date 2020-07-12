<template>
    <router-link :to="{name:'Card', params:{cardId:data.id, listId:data.boardListId}}" class="list-card">
        <div v-if="this.data.coverPath"
          class="list-card-cover"
          :style="'background-image: url('+this.data.coverPath+');'"
        ></div>
        <div class="list-card-title">{{this.data.name}}</div>
        <div class="list-card-badges">
          <div class="badge" v-if="this.data.description">
            <span class="icon icon-description"></span>
          </div>
          <div class="badge" v-if="this.data.commentCount&&this.data.commentCount>0">
            <span class="icon icon-comment"></span>
            <span class="text">{{this.data.commentCount}}</span>
          </div>
          <div class="badge" v-if="this.data.attachments&&this.data.attachments.length > 0">
            <span class="icon icon-attachment"></span>
            <span class="text">{{this.data.attachments.length}}</span>
          </div>
        </div>
      </router-link>

</template>

<script>
export default {
    name:'TCard',
    props:{
        data:{
            type:Object
        }
    },
    mounted(){
      // console.log(this.data)
    }
}
</script>