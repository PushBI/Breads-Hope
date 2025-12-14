<template>
  <div class="min-h-screen bg-gray-100">
    <top-nav-bar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Consolidated Narrative Programme</h1>
        <p class="text-gray-600 mt-2">Submit consolidated narrative programme report</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span class="material-icons text-red-900 mr-2">assignment</span>
            Programme Details
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Date of Visit -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Date of Visit <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.dateOfVisit"
                type="date"
                required
                @change="updateMonth"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Month (Auto filled) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Month <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.month"
                type="text"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            <!-- Village Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Village Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.villageName"
                type="text"
                required
                placeholder="Enter village name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Topic -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Topic <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.topic"
                type="text"
                required
                placeholder="Enter topic"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Report Shared Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Report Shared Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.reportSharedDate"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- No of Participants (Male) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                No of Participants - Male <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.participantsMale"
                type="number"
                required
                min="0"
                placeholder="Enter number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- No of Participants (Female) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                No of Participants - Female <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.participantsFemale"
                type="number"
                required
                min="0"
                placeholder="Enter number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- No of Participants (Children) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                No of Participants - Children <span class="text-red-500">*</span>
              </label>
              <input
                v-model.number="formData.participantsChildren"
                type="number"
                required
                min="0"
                placeholder="Enter number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              />
            </div>

            <!-- Total Participants (Auto calculated) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Total Participants
              </label>
              <input
                :value="totalParticipants"
                type="number"
                readonly
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            <!-- Photos Uploaded -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Photos Uploaded <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.photosUploaded"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <!-- Remarks/Outcome -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Remarks/Outcome <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.remarks"
              required
              rows="5"
              placeholder="Enter remarks or outcome"
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
              Submit Programme
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
        Consolidated narrative programme submitted successfully!
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import TopNavBar from './TopNavBar.vue'

const router = useRouter()

const formData = reactive({
  dateOfVisit: '',
  month: '',
  villageName: '',
  topic: '',
  reportSharedDate: '',
  participantsMale: 0,
  participantsFemale: 0,
  participantsChildren: 0,
  photosUploaded: '',
  remarks: ''
})

const showNotification = ref(false)

// Auto-calculate total participants
const totalParticipants = computed(() => {
  return formData.participantsMale + formData.participantsFemale + formData.participantsChildren
})

// Auto-fill month from date of visit
const updateMonth = () => {
  if (formData.dateOfVisit) {
    const date = new Date(formData.dateOfVisit)
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    formData.month = monthNames[date.getMonth()]
  }
}

const handleSubmit = () => {
  console.log('Consolidated Narrative Programme Submitted:', formData)
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
    router.push('/forms')
  }, 2000)
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
