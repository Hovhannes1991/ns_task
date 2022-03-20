<template>
  <div class="result_modal full_page_modal">
    <div class="modal_body">
      <h1>{{ result === "draw" ? "Draw" : "Winner" }}</h1>
      <img v-if="result === 'x'" src="@/assets/svg/x.svg" alt="icon" />
      <img v-else-if="result === '0'" src="@/assets/svg/zero.png" alt="icon" />
      <img v-else src="@/assets/svg/draw.svg" alt="icon" />
      <div class="butons">
        <div @click="confirm" class="confirm_btn">Play Again</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TikTakToeResult-Modal",
  props: ["result"],

  methods: {
    confirm() {
      this.$emit("play_again");
    },
  },
};
</script>

<style lang="scss">
.result_modal {
  .modal_body {
    img {      
      margin: 10px auto 25px auto;
    }

    .butons {      
      .confirm_btn {
        background: #2998f1;
      }
    }
  }
}
</style>
