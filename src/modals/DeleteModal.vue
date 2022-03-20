<template>
  <div class="delete_modal full_page_modal">
    <div class="modal_body">
      <img src="@/assets/svg/warning.svg" alt="warning icon" />
      <h1>Համոզվա՞ծ եք</h1>
      <div class="butons">
        <div @click="confirm" class="confirm_btn">Այո</div>
        <div @click="cancel" class="cancel_btn">Ոչ</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Delete-Modal",

  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
.delete_modal {
  .modal_body {
    h1 {
      margin: 10px auto 25px auto;
    }
    .butons {
      .cancel_btn {
        background: #c1c1c1;
      }
      .confirm_btn {
        background: var(--delete_btn_color);
      }
    }
  }
}
</style>
