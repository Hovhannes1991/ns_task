<template>
  <div class="tic_tak_toe">
    <table>
      <tbody>
        <tr v-for="(y_axis, index) in matrix" :key="'y' + index">
          <td
            v-for="(x_axis, ind) in matrix[index]"
            @click="addIcon(index, ind)"
            :key="'x' + ind"
          >
            <div v-if="matrix[index][ind] === 'x'" class="x_icon">X</div>
            <div v-else-if="matrix[index][ind] === '0'" class="o_icon">O</div>
          </td>
        </tr>
      </tbody>
    </table>

    <result-modal v-if="game_is_over" :result="result" @play_again="restart"/>
  </div>
</template>

<script>
import ResultModal from './../modals/TikTakToeResultModal.vue';
export default {
  name: "Task_1",
  components: { ResultModal },

  data() {
    return {
      matrix: [],
      current_player: 1,
      game_is_over: false,
      result: ''
    };
  },

  computed: {
    emptyFields() {
      return this.matrix.flat().filter((f) => f === "").length;
    },
  },

  created(){
    this.initData();
  },

  methods: {
    initData(){
      this.current_player = 1,
      this.game_is_over = false,
      this.result = '',
      this.matrix = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]
    },

    addIcon(y, x) {
      if (this.matrix[y][x] === "") {
        let icon = this.current_player === 1 ? "x" : "0";
        this.matrix[y][x] = icon;
        this.current_player = this.current_player === 1 ? 2 : 1;

        this.checkWinner(y, x, icon);
      }
    },

    checkWinner(y, x, player_sign) {
      let winner = this.checkDiagonals(player_sign);
      
      if(!winner){
        winner = this.checkByColumn(x, player_sign);
      }
      if(!winner){
        winner = this.checkByRow(y, player_sign);
      }
      if (winner) {        
        this.gameOver(player_sign);
      }
      else if(this.emptyFields === 0){
        this.gameOver('draw');
      }
    },

    checkDiagonals(icon) {
      let arr = this.matrix.flat();
      let ltr = [arr[0], arr[4], arr[8]].join("");
      let rtl = [arr[2], arr[4], arr[6]].join("");
      return ltr === icon.repeat(3) || rtl === icon.repeat(3);
    },

    checkByColumn(x, icon) {
      for (let i = 0; i < this.matrix.length; i++) {
        if (this.matrix[i][x] !== icon) {
          return false;
        }
      }
      return true;
    },

    checkByRow(y, icon) {      
      for (let i = 0; i < this.matrix[y].length; i++) {
        if (this.matrix[y][i] !== icon) {
          return false;
        }
      }
      return true;
    },

    gameOver(result) {
      this.result = result;      
      this.game_is_over = true;
    },

    restart(){
      this.initData();
    }
  },
};
</script>

<style lang="scss">
.tic_tak_toe {
  background-color: var(--page_bg_color);
  height: calc(100vh - 50px);
  padding: 100px 0;
  table {
    margin: 0 auto;
    background-color: #fff;
    border-collapse: unset;
  }
  td {
    border: 2px solid green;
    width: 100px;
    height: 100px;
    align-items: center;
    text-align: center;
    cursor: pointer;

    .x_icon,
    .o_icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 2em;
      cursor: default;
    }
    .x_icon {
      background-color: green;
    }
    .o_icon {
      background-color: lightblue;
    }
  }
}
</style>
