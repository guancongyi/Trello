<template>
  <!--面板列表容器-->
  <div class="list-wrap" :class="{'list-adding':listAdding}" :data-order="data.order">
    <div class="list-placeholder" ref="listPlaceholder"></div>

    <div class="list" ref="list">
      <div class="list-header" ref="listHeader">
        <textarea
          class="form-field-input"
          ref="newBoardListName"
          @mousedown.prevent
          @blur="editListName"
        >{{data.name}}</textarea>
        <div class="extras-menu" @mousedown.prevent>
          <span class="icon icon-more"></span>
        </div>
      </div>

      <t-card v-for="card of this.cards" :data="card" :key="card.id"></t-card>

      <div class="list-footer">
        <div class="list-card-add" @click="showListCardAddForm">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>

        <div class="list-cards">
          <div class="list-card-add-form">
            <input class="form-field-input" ref="addCardInput" placeholder="为这张卡片添加标题……" />
          </div>
        </div>

        <div class="list-add-confirm">
          <button class="btn btn-success" @click="addCard">添加卡片</button>
          <span class="icon icon-close" @click="hideListCardAddForm"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TCard from "./TCard";

export default {
  name: "TList",
  props: {
    data: {
      type: Object
    }
  },
  components: {
    TCard
  },
  data() {
    return {
      listAdding: false,
      drag: {
        isDown: false,
        isDrag: false,
        downClientX: 0,
        downClientY: 0,
        downElementX: 0,
        downElementY: 0
      }
    };
  },
  computed: {
    cards() {
      return this.$store.getters["card/getCards"](this.data.id);
    }
  },
  async created() {
    if (!this.cards.length) {
      await this.$store.dispatch("card/getCards", this.data.id);
    }
  },
  mounted() {
    this.$refs.listHeader.addEventListener("mousedown", this.dragDown);
    document.addEventListener("mousemove", this.dragMove);
    document.addEventListener("mouseup", this.dragUp);
  },

  methods: {
    dragDown(e) {
      this.drag.isDown = true;
      this.drag.downClientX = e.clientX;
      this.drag.downClientY = e.clientY;
      let pos = this.$refs.list.getBoundingClientRect();
      this.drag.downElementX = pos.x;
      this.drag.downElementY = pos.y;
    },
    dragMove(e) {
      if (this.drag.isDown) {
        let listElement = this.$refs.list;
        let x = e.clientX - this.drag.downClientX;
        let y = e.clientY - this.drag.downClientY;

        // threshold 10 px
        if (x > 10 || y > 10) {
          if (!this.drag.isDrag) {
            this.$refs.listPlaceholder.style.height =
              listElement.offsetHeight + "px";
            this.drag.isDrag = true;
            listElement.style.position = "absolute";
            listElement.style.zIndex = 99999;
            listElement.style.transform = "rotate(5deg)";
            document.body.appendChild(listElement);
            this.$emit("dragStart", {
              component: this,
              x: e.clientX,
              y: e.clientY
            });
          }
          listElement.style.left = this.drag.downElementX + x + "px";
          listElement.style.top = this.drag.downElementY + y + "px";
          this.$emit("dragMove", {
            component: this,
            x: e.clientX,
            y: e.clientY
          });
        }
      }
    },
    dragUp(e) {
      if (this.drag.isDown) {
        if (this.drag.isDrag) {
          this.$refs.listPlaceholder.style.height = 0;

          let listElement = this.$refs.list;
          listElement.style.position = "relative";
          listElement.style.zIndex = 0;
          listElement.style.left = 0;
          listElement.style.top = 0;
          listElement.style.transform = "rotate(0deg)";
          this.$el.appendChild(listElement);
          this.$emit("dragEnd", {
            component: this,
            x: e.clientX,
            y: e.clientY
          });
        } else {
          if (e.path.includes(this.$refs.newBoardListName)) {
            this.$refs.newBoardListName.select();
          }
        }
        this.drag.isDown = false;
        this.drag.isDrag = false;
      }
    },
    async editListName() {
      let { value, innerHTML } = this.$refs.newBoardListName;
      if (value !== innerHTML) {
        await this.$store.dispatch("list/editList", {
          boardId: this.data.boardId,
          id: this.data.id,
          name: value
        });
      }
    },
    showListCardAddForm() {
      this.listAdding = true;
      this.$nextTick(() => {
        this.$refs.addCardInput.focus();
      });
    },
    addCard() {
      let { value } = this.$refs.addCardInput;
      if (value.trim() !== "") {
        this.$store.dispatch("card/postCard", {
          boardListId: this.data.id,
          name: this.$refs.addCardInput.value
        });
        this.$message.success("Successfully added card");
        this.listAdding = false;
      } else {
        this.$refs.addCardInput.focus();
      }
    },
    hideListCardAddForm() {
      this.listAdding = false;
      this.$refs.addCardInput.value = "";
    }
  }
};
</script>