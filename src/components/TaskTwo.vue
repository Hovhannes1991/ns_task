<template>
  <div class="row cars_page_container">
    <div @click="changeTab('active_cars')" class="col-6 tab" :class="{'active': active_tab === 'active_cars'}">
      <span>Active {{ activeCars.length }}</span>
    </div>
    <div @click="changeTab('inactive_cars')" class="col-6 tab" :class="{'active': active_tab === 'inactive_cars'}">
      <span>Inactive {{ inactiveCars.length }}</span>
    </div>
    <table class="table">
      <thead>
        <tr>          
          <th v-for="title in table_titles" :key="title">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in activeTabCarsList" :key="car.id" class="active_cars">
          <td>{{ car.id }}</td>
          <td @click="moreInfo('mark')">{{ car.mark }}</td>
          <td @click="moreInfo('model')">{{ car.model }}</td>
          <td @click="moreInfo('color')">{{ car.color }}</td>
          <td @click="moreInfo('price')">{{ car.price }}</td>
          <td @click="toggle(car.id)">{{ car.is_active ? 'active' : 'inactive' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-show="more_info_key">
      <hr />
      <table class="table">
        <tr v-for="(value, key) in moreInfoGroup" :key="key">
          <td>{{ key }}</td>
          <td>{{ value.length }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task_2",

  data() {
    return {
      cars: [
        {
          id: 12,
          mark: "BMW",
          model: "m3",
          color: "red",
          price: 2500,
          is_active: true,
        },
        {
          id: 88,
          mark: "Ford",
          model: "m3",
          color: "blue",
          price: 785,
          is_active: false,
        },
        {
          id: 789,
          mark: "Dodge",
          model: "mustang",
          color: "black",
          price: 32485,
          is_active: true,
        },
        {
          id: 24,
          mark: "BMW",
          model: "m7",
          color: "red",
          price: 896,
          is_active: true,
        },
        {
          id: 15,
          mark: "Ford",
          model: "Transit",
          color: "green",
          price: 2500,
          is_active: false,
        },
      ],

      table_titles: ['#', 'Mark', 'Model', 'Color', 'Price', 'Status'],
      more_info_key: null,
      active_tab: 'active_cars'
    };
  },

  computed: {
    activeCars() {
      return this.cars.filter((car) => car.is_active);
    },
    inactiveCars() {
      return this.cars.filter((car) => !car.is_active);
    },
    activeTabCarsList(){
      return this.active_tab === 'active_cars' ? this.activeCars : this.inactiveCars;
    },

    moreInfoGroup() {
      if (!this.more_info_key) return {};

      return this.cars.reduce((rv, x) => {
        (rv[x[this.more_info_key]] = rv[x[this.more_info_key]] || []).push(x);
        return rv;
      }, {});
    },
  },

  methods: {
    toggle(id) {
      let car = this.cars.find((car) => car.id === id);
      car.is_active = !car.is_active;
    },

    moreInfo(key) {      
      this.more_info_key = this.more_info_key === key ? null : key;
    },

    changeTab(tab){
      this.active_tab = tab;
    }
  },
};
</script>

<style lang="scss">
.cars_page_container {  
  .tab {
    cursor: pointer;
    background-color: #fff;
  }
  .tab.active {
    background-color: #cecece;
  }
  .active_cars {
    td {
      cursor: pointer;
    }
    td:first-child {
      cursor: default;
    }
  }
}
</style>
