import { reactive } from 'vue'

export const store = reactive({
  isLoggedIn: false,
  userRole: null as 'user' | 'admin' | null, // Track user role
  userName: '' as string
})
