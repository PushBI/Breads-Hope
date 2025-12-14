<template>
  <div>
    <top-nav-bar />
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800">Welcome to the Dashboard!</h1>
        <p class="text-gray-600 mt-2">You have successfully logged in.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopNavBar from './TopNavBar.vue';
</script>
