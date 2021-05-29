<template>
  <div id="app">
    <div>
      <router-link :to="{ name: 'Home' }">Home</router-link>
    </div>
    <router-view />
  </div>
</template>
