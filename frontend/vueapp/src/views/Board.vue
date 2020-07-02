<template>
  <div id="board">
    <!--头部-->
    <t-header></t-header>

    <!--正文-->
    <main v-if="board">
      <h2>{{board.name}}</h2>

      <!--面板容器-->
      <div class="board">
        <!--内容列表容器-->
        <t-list 
        v-for="list of lists" 
        :key="list.id" 
        :data="list"
        @dragStart="dragStart"
        @dragMove="dragMove"
        @dragEnd="dragEnd"

        ></t-list>

        <!--无内容列表容器-->
        <div class="list-wrap no-content" :class="{'list-adding':listAdding}" >
          <div class="list-add" @click="showListAdding">
            <span class="icon icon-add"></span>
            <span>添加另一个列表</span>
          </div>

          <div class="list">
            <div class="list-cards">
              <div class="list-card-add-form">
                <input class="form-field-input" ref="newListName" placeholder="为这张卡片添加标题……" />
              </div>
            </div>

            <div class="list-footer">
              <div class="list-add-confirm">
                <button class="btn btn-success" @click="addNewList">添加列表</button>
                <span class="icon icon-close" @click="hideListAdding"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <router-view></router-view>
  </div>
</template>

<script>
import THeader from "@/components/THeader";
import TList from "@/components/TList";

export default {
  name: "Board",
  components: {
    THeader,
    TList
  },
  data() {
    return {
      listAdding: false
    };
  },
  computed: {
    board() {
      return this.$store.getters["board/getBoard"](this.$route.params.id);
    },
    lists() {
      return this.$store.getters["list/getLists"](this.$route.params.id);
    }
  },
  created() {
    if (!this.board) {
      this.$store.dispatch("board/getBoard", this.$route.params.id);
    }
    if (!this.lists.length) {
      this.$store.dispatch("list/getLists", this.$route.params.id);
    }
  },
  methods: {
    // show adding list
    showListAdding() {
      this.listAdding = true;
      this.$nextTick(() => {
        this.$refs.newListName.focus();
      });
    },
    // hide adding list
    hideListAdding() {
      this.listAdding = false;
    },
    // submit new list
    addNewList() {
      let name = this.$refs.newListName.value;
      if (name.trim() === "") {
        this.$refs.newListName.focus();
      } else {
        try {
          this.$store.dispatch("list/postList", {
            boardId: this.board.id,
            name
          });
          this.$message.success('Success');
          this.$refs.newListName.value = '';
          this.listAdding = true;

        } catch (error) {
          // this.$message.error('Failed')
        }
      }
    },

    dragStart(e){
      let el = e.component.$el;
      let board = el.parentNode;
      let lists = [...board.querySelectorAll('.list-wrap')];
      el._index = lists.findIndex(list => list === el)
    },
    dragMove(e){
      let el = e.component.$el;
      let board = el.parentNode;
      
      let lists = [...board.querySelectorAll('.list-wrap')];
      let currentIndex = lists.findIndex(list => list === el);
      // console.log(lists)

      lists.forEach((list,index) => {
        if(index !==currentIndex){
          let clientRect = list.getBoundingClientRect();
          if(
            e.x >= clientRect.left &&  e.x <= clientRect.right &&
            e.y >= clientRect.top &&  e.y <= clientRect.bottom 
          ){
            if(currentIndex < index){
              board.insertBefore(el, list.nextElementSibling);
            } else {
              board.insertBefore(el, list);
            }
          }
        }
      })
    },
    async dragEnd(e){
      let el = e.component.$el;
      let board = el.parentNode;
      let lists = [...board.querySelectorAll('.list-wrap')];
      let currentIndex = lists.findIndex(list => list === el);
      // check if element moved
      if(el._index !== currentIndex){
        // get prev and next's order's value
        let newOrder;
        let prevOrder = lists[currentIndex-1] && parseFloat(lists[currentIndex-1].dataset.order);
        let nextOrder = lists[currentIndex+1] && parseFloat(lists[currentIndex+1].dataset.order);
        // console.log(prevOrder, nextOrder)
        if(currentIndex === 0){
          newOrder = nextOrder / 2;
        }else if (currentIndex === lists.length-2){
          newOrder = prevOrder + 65535;
        }else{
          newOrder = prevOrder + (nextOrder-prevOrder)/2;
        }

        await this.$store.dispatch('list/editList', {
          boardId: this.board.id,
          order: newOrder,
          id: e.component.data.id,
        })

      }
    }
  }
};
</script>