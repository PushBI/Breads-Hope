<template>
  <nav class="bg-red-950" style="background-color: #450a0a !important;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 lg:-ml-6">
            <router-link to="/forms" class="flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/breads-logo.png"
                alt="BREADS Logo"
                class="h-12 w-auto cursor-pointer"
                @error="handleImageError"
              />
            </router-link>
          </div>
          <!-- Admin Navigation -->
          <div v-if="store.userRole === 'admin'" class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#" class="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
              <a href="#" class="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium">Forms Manager</a>
              <a href="#" class="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium">Users</a>
              <a href="#" class="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium">Settings</a>
            </div>
          </div>

          <!-- User Navigation -->
          <div v-if="store.userRole === 'user'" class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/forms" class="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium">My Forms</router-link>
              <a href="#" class="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium">Help</a>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <button @click="handleLogout" class="text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <span class="material-icons text-lg">logout</span>
            Logout
          </button>
        </div>
        <div class="-mr-2 flex md:hidden">
          <button @click="toggleMobileMenu" class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-900 focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <div v-if="!isMobileMenuOpen" class="w-6 flex flex-col gap-1.5">
              <span class="w-full h-0.5 bg-white rounded"></span>
              <span class="w-full h-0.5 bg-white rounded"></span>
              <span class="w-full h-0.5 bg-white rounded"></span>
            </div>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div :class="{'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen}" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Admin Mobile Menu -->
        <template v-if="store.userRole === 'admin'">
          <a href="#" class="text-white hover:bg-red-900 block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
          <a href="#" class="text-white hover:bg-red-900 block px-3 py-2 rounded-md text-base font-medium">Forms Manager</a>
          <a href="#" class="text-white hover:bg-red-900 block px-3 py-2 rounded-md text-base font-medium">Users</a>
          <a href="#" class="text-white hover:bg-red-900 block px-3 py-2 rounded-md text-base font-medium">Settings</a>
        </template>

        <!-- User Mobile Menu -->
        <template v-if="store.userRole === 'user'">
          <router-link to="/forms" class="text-white hover:bg-red-900 block px-3 py-2 rounded-md text-base font-medium">My Forms</router-link>
          <a href="#" class="text-white hover:bg-red-900 block px-3 py-2 rounded-md text-base font-medium">Help</a>
        </template>

        <button @click="handleLogout" class="text-white hover:bg-red-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center gap-2">
          <span class="material-icons text-lg">logout</span>
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../store';

export default defineComponent({
  name: 'TopNavBar',
  setup() {
    const isMobileMenuOpen = ref(false);
    const router = useRouter();

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const handleLogout = () => {
      store.isLoggedIn = false;
      store.userRole = null;
      store.userName = '';
      router.push('/login');
    };

    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      target.style.display = 'none';
      // Fallback to text if image fails to load
      const fallback = document.createElement('span');
      fallback.textContent = 'BREADS';
      fallback.className = 'text-white text-2xl font-bold';
      target.parentElement?.appendChild(fallback);
    };

    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      handleLogout,
      handleImageError,
      store,
    };
  },
});
</script>
