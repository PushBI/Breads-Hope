<template>
  <div class="min-h-screen bg-gray-100">
    <top-nav-bar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Submit Application Form</h1>
        <p class="text-gray-600 mt-2">Please fill out all required fields below.</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- School Details Section -->
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span class="material-icons text-red-900 mr-2">school</span>
              School Details
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- State -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  State <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.state"
                  @change="onStateChange"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option v-for="state in indianStates" :key="state" :value="state">{{ state }}</option>
                </select>
              </div>

              <!-- District -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  District <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.district"
                  required
                  :disabled="!formData.state"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{{ formData.state ? 'Select District' : 'Select State First' }}</option>
                  <option v-for="district in availableDistricts" :key="district" :value="district">{{ district }}</option>
                </select>
              </div>

              <!-- School Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  School Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.schoolName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter school name"
                />
              </div>

              <!-- School Address -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  School Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.schoolAddress"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter school address"
                />
              </div>

              <!-- Grade/Class -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Grade/Class <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.grade"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="e.g., 10th Grade"
                />
              </div>

              <!-- Student ID -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Student ID <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.studentId"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter student ID"
                />
              </div>
            </div>
          </div>

          <!-- Personal Information Section -->
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span class="material-icons text-red-900 mr-2">person</span>
              Personal Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.fullName"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <!-- Date of Birth -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.dateOfBirth"
                  type="date"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Address Section -->
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span class="material-icons text-red-900 mr-2">home</span>
              Address Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Street Address -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Street Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.streetAddress"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>

              <!-- City -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  City/Town <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.city"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter city or town"
                />
              </div>

              <!-- PIN Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.zipCode"
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  maxlength="6"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter 6-digit PIN code"
                />
              </div>
            </div>
          </div>

          <!-- Additional Information Section -->
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span class="material-icons text-red-900 mr-2">description</span>
              Additional Information
            </h2>

            <div class="grid grid-cols-1 gap-6">
              <!-- Purpose of Application -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Application <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.purpose"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                >
                  <option value="">Select a purpose</option>
                  <option value="housing">Housing Assistance</option>
                  <option value="education">Education Support</option>
                  <option value="employment">Employment Services</option>
                  <option value="healthcare">Healthcare Access</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <!-- Comments/Notes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  v-model="formData.comments"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Please provide any additional information..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              class="flex-1 bg-red-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span class="material-icons">send</span>
              Submit Application
            </button>
            <button
              type="button"
              @click="resetForm"
              class="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span class="material-icons">refresh</span>
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <!-- Previous Submissions -->
      <div v-if="submissions.length > 0" class="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span class="material-icons text-red-900 mr-2">history</span>
          Your Submissions
        </h2>

        <div class="space-y-4">
          <div
            v-for="(submission, index) in submissions"
            :key="index"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-800">{{ submission.fullName }}</h3>
                <p class="text-sm text-gray-600">{{ submission.email }}</p>
                <p class="text-sm text-gray-500 mt-1">Purpose: {{ getPurposeLabel(submission.purpose) }}</p>
              </div>
              <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Submitted
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-2">Submitted on {{ formatDate(submission.submittedAt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="slide">
      <div
        v-if="notification.show"
        :class="[
          'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all',
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        ]"
      >
        {{ notification.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import TopNavBar from './TopNavBar.vue';
import statesDistrictsData from '../constants/indianStatesDistricts.json';

const formData = reactive({
  schoolName: '',
  schoolAddress: '',
  grade: '',
  studentId: '',
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  streetAddress: '',
  city: '',
  state: '',
  district: '',
  zipCode: '',
  purpose: '',
  comments: ''
});

const submissions = ref<any[]>([]);

const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

// Import states and districts from JSON file
const indianStates = Object.keys(statesDistrictsData).sort();
const districtsByState: Record<string, string[]> = statesDistrictsData;

const availableDistricts = ref<string[]>([]);

const onStateChange = () => {
  // Reset district when state changes
  formData.district = '';
  // Update available districts
  availableDistricts.value = districtsByState[formData.state] || [];
};

const showNotification = (message: string, type = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

const handleSubmit = () => {
  // Create submission object
  const submission = {
    ...formData,
    submittedAt: new Date().toISOString(),
    id: Date.now()
  };

  // Add to submissions list
  submissions.value.unshift(submission);

  // Show success notification
  showNotification('Application submitted successfully!', 'success');

  // Reset form
  resetForm();
};

const resetForm = () => {
  formData.schoolName = '';
  formData.schoolAddress = '';
  formData.grade = '';
  formData.studentId = '';
  formData.fullName = '';
  formData.email = '';
  formData.phone = '';
  formData.dateOfBirth = '';
  formData.streetAddress = '';
  formData.city = '';
  formData.state = '';
  formData.district = '';
  formData.zipCode = '';
  formData.purpose = '';
  formData.comments = '';
  availableDistricts.value = [];
};

const getPurposeLabel = (purpose: string) => {
  const labels: Record<string, string> = {
    housing: 'Housing Assistance',
    education: 'Education Support',
    employment: 'Employment Services',
    healthcare: 'Healthcare Access',
    other: 'Other'
  };
  return labels[purpose] || purpose;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
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
