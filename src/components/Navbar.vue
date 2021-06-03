<template>
  <div>
    <div>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Shiritori' }">Shiritori</router-link>
      <router-link :to="{ name: 'MonsterSlayer' }">Monster Slayer</router-link>
    </div>
    <router-view />
  </div>
</template>
