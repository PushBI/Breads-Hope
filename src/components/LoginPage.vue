<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden md:flex">
      <!-- Left side - Gradient Background -->
      <div class="hidden md:block md:w-1/2 bg-gradient-to-br from-red-950 to-red-800"></div>

      <!-- Right side - Login Form -->
      <div class="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div class="text-center mb-8 flex flex-col items-center">
          <img
            src="/breads-logo.png"
            alt="BREADS Logo"
            class="h-16 w-auto mb-2"
            @error="handleImageError"
          />
        </div>
        <div class="flex justify-center mb-6">
          <div class="flex items-center bg-gray-200 rounded-full p-1">
            <button
              @click="activeTab = 'user'"
              :class="[
                'flex items-center justify-center w-28 py-3 px-4 rounded-full font-semibold text-sm transition-all duration-300',
                activeTab === 'user'
                  ? 'bg-white text-gray-800 shadow'
                  : 'text-gray-500'
              ]"
            >
              <span class="material-icons mr-2">person</span>
              User
            </button>
            <button
              @click="activeTab = 'admin'"
              :class="[
                'flex items-center justify-center w-28 py-3 px-4 rounded-full font-semibold text-sm transition-all duration-300',
                activeTab === 'admin'
                  ? 'bg-white text-gray-800 shadow'
                  : 'text-gray-500'
              ]"
            >
              <span class="material-icons mr-2">admin_panel_settings</span>
              Admin
            </button>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="activeTab === 'user'" class="flex items-center bg-gray-100 rounded-lg p-3 focus-within:bg-gray-200">
            <span class="material-icons text-gray-400">email</span>
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              class="w-full ml-3 focus:outline-none bg-transparent"
              required
            />
          </div>
          <div v-if="activeTab === 'admin'" class="flex items-center bg-gray-100 rounded-lg p-3 focus-within:bg-gray-200">
            <span class="material-icons text-gray-400">badge</span>
            <input
              v-model="form.adminId"
              type="text"
              placeholder="Admin ID"
              class="w-full ml-3 focus:outline-none bg-transparent"
              required
            />
          </div>
          
          <div class="flex items-center bg-gray-100 rounded-lg p-3 focus-within:bg-gray-200">
             <span class="material-icons text-gray-400">lock</span>
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="w-full ml-3 focus:outline-none bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <span class="material-icons mr-2">login</span>
            Login
          </button>

          <div class="text-center text-sm text-gray-500">
            <a href="#" class="hover:text-blue-600">Forgot Password?</a>
            <span class="mx-2">|</span>
            <a href="#" class="hover:text-blue-600">Sign Up</a>
          </div>
        </form>

        <!-- Footer -->
        <div class="mt-6 text-center text-gray-400 text-xs">
          <!-- <p>© 2024 HOPE Platform. All rights reserved.</p> -->
        </div>
      </div>
    </div>
    
    <!-- Toast Notification -->
    <Transition name="slide">
      <div
        v-if="notification.show"
        :class="[
          'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all',
          notification.type === 'success'
            ? 'bg-green-500'
            : 'bg-red-500'
        ]"
      >
        {{ notification.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()

const activeTab = ref('user')

const form = reactive({
  email: '',
  adminId: '',
  password: '',
})

const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const handleLogin = () => {
  if (activeTab.value === 'user') {
    handleUserLogin();
  } else {
    handleAdminLogin();
  }
}

const handleUserLogin = () => {
  if (!form.email || !form.password) {
    showNotification('Please fill in all fields', 'error')
    return
  }

  showNotification('User login successful!', 'success')
  store.isLoggedIn = true;
  store.userRole = 'user';
  store.userName = form.email;
  setTimeout(() => {
    router.push('/forms')
  }, 500)
}

const handleAdminLogin = () => {
  if (!form.adminId || !form.password) {
    showNotification('Please fill in all fields', 'error')
    return
  }

  showNotification('Admin login successful!', 'success')
  store.isLoggedIn = true;
  store.userRole = 'admin';
  store.userName = form.adminId;
  setTimeout(() => {
    router.push('/dashboard')
  }, 500)
}

const handleImageError = (event) => {
  // Fallback to text if image fails to load
  event.target.outerHTML = '<h1 class="text-3xl font-bold text-gray-800 mb-2">BREADS</h1>'
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
