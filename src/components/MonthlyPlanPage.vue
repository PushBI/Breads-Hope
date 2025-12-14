<template>
  <div class="min-h-screen bg-gray-100">
    <top-nav-bar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">My Monthly Plan</h1>
        <p class="text-gray-600 mt-2">Create and manage your monthly plan</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span class="material-icons text-red-900 mr-2">calendar_today</span>
            Plan Details
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.date"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.status"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.description"
              required
              rows="6"
              placeholder="Enter plan description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="pt-6">
            <button
              type="submit"
              class="w-full bg-red-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span class="material-icons mr-2">send</span>
              Submit Plan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Notification -->
    <Transition name="slide">
      <div
        v-if="showNotification"
        class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
      >
        Monthly plan submitted successfully!
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import TopNavBar from './TopNavBar.vue'

const router = useRouter()

const formData = reactive({
  date: '',
  description: '',
  status: ''
})

const showNotification = ref(false)

const handleSubmit = () => {
  console.log('Monthly Plan Submitted:', formData)
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
    router.push('/forms')
  }, 2000)
}

const goBack = () => {
  router.push('/forms')
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
