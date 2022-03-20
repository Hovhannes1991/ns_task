<template>
  <nav>
    <router-link :to="{name: 'task_1'}" exact-active-class="active_link">Task 1</router-link>
    <router-link :to="{name: 'task_2'}" exact-active-class="active_link">Task 2</router-link> 
    <router-link :to="{name: 'task_3'}" exact-active-class="active_link">Task 3</router-link>
  </nav>
  <router-view/>
</template>

<style>
@import url(~/main.styles.css); 
*{
  box-sizing: border-box;
}
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;  
  justify-content: center;
  align-items: center;
  height: 50px;
  gap: 20px;
  background: #414a4c;  
}

nav a {
  text-decoration: none;
  color: #fff;
  font-size: 24px;
}
nav a.active_link{
  color: #ffd700;
}
</style>
