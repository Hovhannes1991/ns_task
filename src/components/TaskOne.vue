<template>
  <div class="table_container">
    <div class="main_table">
      <div class="add_btn_wrapper">
        <div @click="addRow" class="add_btn">Ավելացնել</div>
      </div>
      <!-- Tbale head -->
      <div class="table_row">
        <div class="th" @click="toggleAscDesc">
          <span>Արժեք</span>
          <!-- Order icon -->
          <img
            src="@/assets/svg/ordering.svg"
            class="ordering_icon"
            :class="{ ordered_by_desc: order_by === 'DESC' }"
            alt="order icon"
          />
        </div>
      </div>
      <!-- Table body -->
      <div v-for="(item, index) in dataList" class="table_row" :key="item.id">
        <input
          class="td"
          :class="{ editable: !item.edit_disabled }"
          :ref="'input_values'"
          v-model="item.tmp_value"
          @keydown.esc="cancelEditing(item.id)"
          @keydown.enter="save(item.id)"
          placeholder="input value"
          :disabled="item.edit_disabled"
        />
        <!-- edit button -->
        <div class="td">
          <div
            v-if="item.edit_disabled"
            @click="edit(item.id, index)"
            class="edit_btn"
          >
            Փոփոխել
          </div>

          <div v-else @click="save(item.id)" class="edit_btn">Պահպանել</div>
        </div>
        <!-- delete button -->
        <div class="td">
          <div @click="openDeleteModal(item.id)" class="delete_btn">Ջնջել</div>
        </div>
      </div>
    </div>

    <DeleteModal
      v-if="deleting_item_id"
      @cancel="cancelDeleting"
      @confirm="confirmDeleting"
    />
  </div>
</template>

<script>
import DeleteModal from "./../modals/DeleteModal.vue";
export default {
  name: "Task_1",
  components: { DeleteModal },

  data() {
    return {
      data: [
        { id: 1, value: "Հունվար", tmp_value: "Հունվար", edit_disabled: true },
        { id: 2, value: "Փետրվար", tmp_value: "Փետրվար", edit_disabled: true },
        { id: 3, value: "Մարտ", tmp_value: "Մարտ", edit_disabled: true },
        { id: 4, value: "Ապրիլ", tmp_value: "Ապրիլ", edit_disabled: true },
        { id: 5, value: "Մայիս", tmp_value: "Մայիս", edit_disabled: true },
      ],

      deleting_item_id: null,
      order_by: "ASC",
    };
  },

  computed: {
    dataList() {
      let list = this.data.sort((a, b) => {
        let x = a.value;
        let y = b.value;
        if (!isNaN(x) && !isNaN(y)) {
          x = +x;
          y = +y;
        }
        let result = x > y ? 1 : x < y ? -1 : 0;
        result = this.order_by === "ASC" ? result : result * -1;
        return result;
      });
      return list;
    },
  },

  methods: {
    addRow() {
      let uid = this.data.length + Date.now();
      this.data.push({
        id: uid,
        value: "",
        tmp_value: "",
        edit_disabled: false,
      });
      this.$nextTick(() => {
        let refs_last_index = this.$refs.input_values.length - 1;
        this.$refs.input_values[refs_last_index].focus();
      });
    },

    edit(id, index) {
      let item = this.findItemById(id);
      item.edit_disabled = false;
      this.$nextTick(() => {
        this.$refs.input_values[index].focus();
      });
    },

    cancelEditing(id) {
      let item = this.findItemById(id);
      item.edit_disabled = true;
      item.tmp_value = item.value;
    },

    save(id) {
      let item = this.findItemById(id);
      item.edit_disabled = true;
      item.value = item.tmp_value;
    },

    openDeleteModal(id) {
      this.deleting_item_id = id;
    },

    findItemById(id) {
      return this.data.find((item) => item.id === id);
    },

    toggleAscDesc() {
      this.order_by = this.order_by === "ASC" ? "DESC" : "ASC";
    },

    confirmDeleting() {
      this.data = this.data.filter((item) => item.id !== this.deleting_item_id);
      this.deleting_item_id = null;
    },

    cancelDeleting() {
      this.deleting_item_id = null;
    },
  },
};
</script>

<style lang="scss">
.table_container {
  height: calc(100vh - 50px);
  padding: 50px 0 0 0;
  background: var(--page_bg_color);
  .main_table {
    display: flex;
    flex-direction: column;
    width: 800px;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 0 9px 4px #1c3c52;
    @media only screen and (max-width: 1000px) {
      width: 700px;
    }
    @media only screen and (max-width: 750px) {
      width: 80vw;
    }
    .table_row {
      display: flex;
      &:nth-child(odd) {
        background: var(--row_bg_color_dark);
      }
      &:nth-child(even) {
        background: var(--row_bg_color_light);
      }

      .th,
      .td {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18%;
        height: 50px;
        color: #fff;
        cursor: pointer;
        &:first-child {
          width: 64%;
        }
      }
      input.td {
        background: transparent;
        border: none;
        text-align: center;
        font-size: 20px;
        outline: none;
        cursor: default;
      }
      input.td.editable {
        background: #cecece;
        color: #000;
      }
    }

    .add_btn_wrapper{
      background-color: #607d8b;
      border-radius: 5px 5px 0 0;
    }

    .add_btn,
    .edit_btn,
    .delete_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      // height: 30px;
      border-radius: 5px;
      padding: 8px 15px;
      &:hover {
        opacity: 0.8;
      }
    }

    .add_btn {
      background: green;
      width: fit-content;
      margin: 10px;
      color: #fff;
      cursor: pointer;
    }

    .delete_btn {
      background: var(--delete_btn_color);
    }

    .edit_btn {
      background: #007a80;
    }
  }

  .ordering_icon {
    margin: 2px 0 0 5px;
    width: 20px;
    height: 20px;
  }
  .ordering_icon.ordered_by_desc {
    transform: rotateX(180deg);
  }
}
</style>
