<template>
  <div class="min-h-screen bg-gray-100">
    <top-nav-bar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">My Forms</h1>
        <p class="text-gray-600 mt-2">Manage and submit forms</p>
      </div>

      <!-- Form Buttons -->
      <div class="mb-8 space-y-4 flex flex-col items-start sm:items-center">
        <button
          @click="openForm"
          class="group relative w-full sm:w-80 bg-gradient-to-r from-red-900 to-red-800 text-white font-bold py-4 px-10 rounded-xl hover:from-red-800 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span class="material-icons text-2xl relative z-10">school</span>
          <span class="text-lg relative z-10">Add School Details</span>
        </button>

        <button
          @click="openMonthlyReport"
          class="group relative w-full sm:w-80 bg-gradient-to-r from-red-900 to-red-800 text-white font-bold py-4 px-10 rounded-xl hover:from-red-800 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span class="material-icons text-2xl relative z-10">description</span>
          <span class="text-lg relative z-10">Monthly School Report</span>
        </button>

        <button
          @click="openMonthlyPlan"
          class="group relative w-full sm:w-80 bg-gradient-to-r from-red-900 to-red-800 text-white font-bold py-4 px-10 rounded-xl hover:from-red-800 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span class="material-icons text-2xl relative z-10">calendar_today</span>
          <span class="text-lg relative z-10">My Monthly Report</span>
        </button>

        <button
          @click="openAwarenessProgramme"
          class="group relative w-full sm:w-80 bg-gradient-to-r from-red-900 to-red-800 text-white font-bold py-4 px-6 rounded-xl hover:from-red-800 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <span class="material-icons text-xl relative z-10">assignment</span>
          <span class="text-base relative z-10">Awareness Programme</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import TopNavBar from './TopNavBar.vue';

const router = useRouter();

// Function to navigate to form creation
const openForm = () => {
  router.push('/school-forms');
};

// Function to navigate to monthly report
const openMonthlyReport = () => {
  router.push('/monthly-report');
};

// Function to navigate to monthly plan
const openMonthlyPlan = () => {
  router.push('/monthly-plan');
};

// Function to navigate to awareness programme
const openAwarenessProgramme = () => {
  router.push('/consolidated-narrative');
};
</script>
