<template>
  <div class="min-h-screen bg-gray-100">
    <top-nav-bar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Form Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800">Submit School Details</h2>
        <p class="text-gray-600 mt-2">Step {{ currentStep }} of {{ totalSteps }}</p>
      </div>

      <!-- Stepper -->
      <div class="mb-8">
        <div class="flex items-center">
          <div
            v-for="step in steps"
            :key="step.id"
            class="flex items-center"
            :class="step.id < totalSteps ? 'flex-1' : ''"
          >
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                  currentStep > step.id ? 'bg-green-600 text-white' :
                  currentStep === step.id ? 'bg-red-900 text-white' :
                  'bg-gray-300 text-gray-600'
                ]"
              >
                <span v-if="currentStep > step.id" class="material-icons text-sm">check</span>
                <span v-else>{{ step.id }}</span>
              </div>
              <span
                :class="[
                  'text-xs mt-2 text-center hidden sm:block whitespace-nowrap',
                  currentStep === step.id ? 'text-red-900 font-semibold' : 'text-gray-600'
                ]"
              >
                {{ step.name }}
              </span>
            </div>
            <div
              v-if="step.id < totalSteps"
              :class="[
                'flex-1 h-1 mx-4',
                currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Step 1: School Details Section -->
          <div v-show="currentStep === 1">
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

              <!-- Gram Panchayat -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Gram Panchayat <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.gramPanchayat"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter gram panchayat"
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
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter village name"
                />
              </div>

              <!-- Distance between school and DB -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Distance between School and DB (km) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.distanceFromDB"
                  type="number"
                  step="0.1"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Enter distance in kilometers"
                />
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

              <!-- Category of School -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Category of School <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.schoolCategory"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="aided">Aided</option>
                  <option value="unaided">Unaided (Private)</option>
                  <option value="government">Government</option>
                  <option value="sponsored">Sponsored</option>
                </select>
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
                  <option value="visited-completed">Visited and Completed</option>
                  <option value="visited">Visited</option>
                  <option value="not-visited">Not Visited</option>
                </select>
              </div>

              <!-- Reasons for selecting the school -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Reasons for Selecting the School <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="formData.selectionReason"
                  rows="3"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  placeholder="Please explain why this school was selected..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Step 2: School Statistics Section -->
          <div v-show="currentStep === 2">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span class="material-icons text-red-900 mr-2">bar_chart</span>
              School Statistics
            </h2>

            <!-- Teachers Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Teachers Section</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Male Teaching Staff -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Male Teaching Staff <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.maleTeachingStaff"
                    type="number"
                    min="0"
                    required
                    @input="calculateTotalTeachers"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>

                <!-- Female Teaching Staff -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Female Teaching Staff <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.femaleTeachingStaff"
                    type="number"
                    min="0"
                    required
                    @input="calculateTotalTeachers"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>

                <!-- Third Gender Teaching Staff -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Third Gender Teaching Staff <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.thirdGenderTeachingStaff"
                    type="number"
                    min="0"
                    required
                    @input="calculateTotalTeachers"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>

                <!-- Total Teaching Staff -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total Teaching Staff
                  </label>
                  <input
                    v-model="formData.totalTeachingStaff"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            <!-- Class 6 Students Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Class 6 Students</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Boys <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class6Boys"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass6Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Girls <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class6Girls"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass6Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total
                  </label>
                  <input
                    v-model="formData.class6Total"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            <!-- Class 7 Students Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Class 7 Students</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Boys <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class7Boys"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass7Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Girls <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class7Girls"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass7Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total
                  </label>
                  <input
                    v-model="formData.class7Total"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            <!-- Class 8 Students Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Class 8 Students</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Boys <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class8Boys"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass8Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Girls <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class8Girls"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass8Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total
                  </label>
                  <input
                    v-model="formData.class8Total"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            <!-- Class 9 Students Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Class 9 Students</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Boys <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class9Boys"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass9Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Girls <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.class9Girls"
                    type="number"
                    min="0"
                    required
                    @input="calculateClass9Total"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total
                  </label>
                  <input
                    v-model="formData.class9Total"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            <!-- Grand Total of Students -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Grand Total of Students (Class 6-9)</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total Boys
                  </label>
                  <input
                    v-model="grandTotalBoys"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total Girls
                  </label>
                  <input
                    v-model="grandTotalGirls"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Grand Total
                  </label>
                  <input
                    v-model="grandTotal"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            <!-- Group Statistics Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Group Statistics</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Total Number of Groups <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model.number="formData.totalGroups"
                    type="number"
                    min="1"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    placeholder="Enter number of groups"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Strength in Each Group
                  </label>
                  <input
                    v-model="strengthPerGroup"
                    type="number"
                    readonly
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Stepper Navigation -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="previousStep"
              class="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span class="material-icons">arrow_back</span>
              Previous
            </button>
            <button
              v-if="currentStep < totalSteps"
              type="button"
              @click="nextStep"
              class="flex-1 bg-red-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Next
              <span class="material-icons">arrow_forward</span>
            </button>
            <button
              v-if="currentStep === totalSteps"
              type="submit"
              class="flex-1 bg-red-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span class="material-icons">send</span>
              Submit School Details
            </button>
          </div>
        </form>
      </div>

      <!-- Previous Submissions -->
      <div v-if="submissions.length > 0" class="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span class="material-icons text-red-900 mr-2">history</span>
          Submitted Schools
        </h2>

        <div class="space-y-4">
          <div
            v-for="(submission, index) in submissions"
            :key="index"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-800">{{ submission.schoolName }}</h3>
                <p class="text-sm text-gray-600">{{ submission.district }}, {{ submission.state }}</p>
                <p class="text-sm text-gray-500 mt-1">Category: {{ submission.schoolCategory }}</p>
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
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import TopNavBar from './TopNavBar.vue';
import statesDistrictsData from '../constants/indianStatesDistricts.json';

const router = useRouter();

const formData = reactive({
  schoolName: '',
  schoolAddress: '',
  state: '',
  district: '',
  gramPanchayat: '',
  villageName: '',
  distanceFromDB: '',
  schoolCategory: '',
  status: '',
  selectionReason: '',
  maleTeachingStaff: '',
  femaleTeachingStaff: '',
  thirdGenderTeachingStaff: '',
  totalTeachingStaff: '',
  class6Boys: '',
  class6Girls: '',
  class6Total: '',
  class7Boys: '',
  class7Girls: '',
  class7Total: '',
  class8Boys: '',
  class8Girls: '',
  class8Total: '',
  class9Boys: '',
  class9Girls: '',
  class9Total: '',
  totalGroups: ''
});

const submissions = ref<any[]>([]);

const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

// Stepper state
const currentStep = ref(1);
const totalSteps = ref(2);
const steps = ref([
  { id: 1, name: 'School Details' },
  { id: 2, name: 'School Statistics' }
]);

// Stepper navigation
const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

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

// Auto-calculation functions
const calculateTotalTeachers = () => {
  const male = Number(formData.maleTeachingStaff) || 0;
  const female = Number(formData.femaleTeachingStaff) || 0;
  const thirdGender = Number(formData.thirdGenderTeachingStaff) || 0;
  formData.totalTeachingStaff = (male + female + thirdGender).toString();
};

const calculateClass6Total = () => {
  const boys = Number(formData.class6Boys) || 0;
  const girls = Number(formData.class6Girls) || 0;
  formData.class6Total = (boys + girls).toString();
};

const calculateClass7Total = () => {
  const boys = Number(formData.class7Boys) || 0;
  const girls = Number(formData.class7Girls) || 0;
  formData.class7Total = (boys + girls).toString();
};

const calculateClass8Total = () => {
  const boys = Number(formData.class8Boys) || 0;
  const girls = Number(formData.class8Girls) || 0;
  formData.class8Total = (boys + girls).toString();
};

const calculateClass9Total = () => {
  const boys = Number(formData.class9Boys) || 0;
  const girls = Number(formData.class9Girls) || 0;
  formData.class9Total = (boys + girls).toString();
};

// Grand Total computed properties
const grandTotalBoys = computed(() => {
  const class6 = Number(formData.class6Boys) || 0;
  const class7 = Number(formData.class7Boys) || 0;
  const class8 = Number(formData.class8Boys) || 0;
  const class9 = Number(formData.class9Boys) || 0;
  return class6 + class7 + class8 + class9;
});

const grandTotalGirls = computed(() => {
  const class6 = Number(formData.class6Girls) || 0;
  const class7 = Number(formData.class7Girls) || 0;
  const class8 = Number(formData.class8Girls) || 0;
  const class9 = Number(formData.class9Girls) || 0;
  return class6 + class7 + class8 + class9;
});

const grandTotal = computed(() => {
  return grandTotalBoys.value + grandTotalGirls.value;
});

// Strength per group computed property (ceiling of grand total / total groups)
const strengthPerGroup = computed(() => {
  const total = grandTotal.value;
  const groups = Number(formData.totalGroups) || 0;
  if (groups === 0) return 0;
  return Math.ceil(total / groups);
});

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
  showNotification('School details submitted successfully!', 'success');

  // Reset form
  resetForm();
};

const resetForm = () => {
  formData.schoolName = '';
  formData.schoolAddress = '';
  formData.state = '';
  formData.district = '';
  formData.gramPanchayat = '';
  formData.villageName = '';
  formData.distanceFromDB = '';
  formData.schoolCategory = '';
  formData.status = '';
  formData.selectionReason = '';
  formData.maleTeachingStaff = '';
  formData.femaleTeachingStaff = '';
  formData.thirdGenderTeachingStaff = '';
  formData.totalTeachingStaff = '';
  formData.class6Boys = '';
  formData.class6Girls = '';
  formData.class6Total = '';
  formData.class7Boys = '';
  formData.class7Girls = '';
  formData.class7Total = '';
  formData.class8Boys = '';
  formData.class8Girls = '';
  formData.class8Total = '';
  formData.class9Boys = '';
  formData.class9Girls = '';
  formData.class9Total = '';
  formData.totalGroups = '';
  availableDistricts.value = [];
  currentStep.value = 1;
  router.push('/forms');
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
