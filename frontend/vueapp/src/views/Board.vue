<template>
  <div id="board">
    <!--头部-->
    <t-header></t-header>

    <!--正文-->
    <main v-if="board">
      <h2>{{board.name}}</h2>

      <!--面板容器-->
      <div class="board">
        <t-list v-for="list of lists" :key="list.id" :data="list"></t-list>
        <!--无内容列表容器-->
        <div class="list-wrap no-content" :class="{'list-adding':listAdding}">
          <div class="list-add" @click="showListAdding">
            <span class="icon icon-add"></span>
            <span>添加另一个列表</span>
          </div>

          <div class="list">
            <div class="list-cards">
              <div class="list-card-add-form">
                <input class="form-field-input" placeholder="为这张卡片添加标题……" />
              </div>
            </div>

            <div class="list-footer">
              <div class="list-add-confirm">
                <button class="btn btn-success">添加列表</button>
                <span class="icon icon-close"></span>
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
    // show adding board
    showListAdding() {
      this.listAdding = true;
    }
  }
};
</script>