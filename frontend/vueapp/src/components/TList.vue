<template>
  <!--面板列表容器-->
  <div class="list-wrap" :class="{'list-adding':false}" :data-order="data.order">
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

      <div class="list-card" v-for="card of cards" :key="card.id">
        <div v-if="card.coverPath"
          class="list-card-cover"
          :style="'background-image: url('+card.coverPath+');'"
        ></div>
        <div class="list-card-title">{{card.name}}</div>
        <div class="list-card-badges">
          <div class="badge" v-if="card.description">
            <span class="icon icon-description"></span>
          </div>
          <div class="badge" v-if="card.commentCount>0">
            <span class="icon icon-comment"></span>
            <span class="text">{{card.commentCount}}</span>
          </div>
          <div class="badge" v-if="card.attachments.length > 0">
            <span class="icon icon-attachment"></span>
            <span class="text">{{card.attachments.length}}</span>
          </div>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success">添加卡片</button>
          <span class="icon icon-close"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TList",
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
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
    }
  }
};
</script>