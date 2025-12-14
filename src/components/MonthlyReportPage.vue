<template>
  <div class="min-h-screen bg-gray-100">
    <top-nav-bar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Monthly School Report</h1>
        <p class="text-gray-600 mt-2">Submit monthly school report</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span class="material-icons text-red-900 mr-2">description</span>
            Monthly Report Details
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- School Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                School Name <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.schoolName"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              >
                <option value="">Select School</option>
                <option value="GHPS Ainalli Kurubarahatti">GHPS Ainalli Kurubarahatti</option>
                <option value="GHS DS Hall">GHS DS Hall</option>
                <option value="GHS JN Kote">GHS JN Kote</option>
                <option value="GHS Haikal">GHS Haikal</option>
              </select>
            </div>

            <!-- Visit Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Visit Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.visitDate"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Type of Visit -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Type of Visit <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.typeOfVisit"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              >
                <option value="">Select Visit Type</option>
                <option value="Follow up">Follow up</option>
                <option value="Initial Visit">Initial Visit</option>
              </select>
            </div>

            <!-- Number of MINDS Group established -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Number of MINDS Group Established <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.mindsGroupEstablished"
                type="number"
                required
                min="0"
                placeholder="Enter number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Children in MINDS Groups -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Children in MINDS Groups <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.childrenInMindsGroups"
                type="number"
                required
                min="0"
                placeholder="Enter number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Module Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Module Number <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.moduleNumber"
                type="number"
                required
                min="0"
                placeholder="Enter module number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Children Attended -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Children Attended <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.childrenAttended"
                type="number"
                required
                min="0"
                placeholder="Enter number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Children Referred for counselling -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Children Referred for Counselling <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.childrenReferred"
                type="number"
                required
                min="0"
                placeholder="Enter number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Follow-up Action Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Follow-up Action Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.followUpDate"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Action Points -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Action Points <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.actionPoints"
              required
              rows="3"
              placeholder="Enter action points"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- School Challenges -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              School Challenges <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.schoolChallenges"
              required
              rows="3"
              placeholder="Enter school challenges"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Notes for next modules -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Notes for Next Modules <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.notesForNextModules"
              required
              rows="5"
              placeholder="Enter notes for next modules"
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
              Submit Report
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
        Monthly report submitted successfully!
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
  schoolName: '',
  visitDate: '',
  typeOfVisit: '',
  mindsGroupEstablished: 0,
  childrenInMindsGroups: 0,
  moduleNumber: 0,
  childrenAttended: 0,
  childrenReferred: 0,
  followUpDate: '',
  actionPoints: '',
  schoolChallenges: '',
  notesForNextModules: ''
})

const showNotification = ref(false)

const handleSubmit = () => {
  console.log('Monthly Report Submitted:', formData)
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
