import { ref, type Ref } from 'vue'

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  submit?: string
}

interface AuthResponse {
  token: string
  email: string
}

export function useForm(isLogin: Ref<boolean>) {
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errors = ref<FormErrors>({})
  const loading = ref(false)

  async function handleSubmit(onSuccess: (response: AuthResponse) => void) {
    loading.value = true
    errors.value = {}

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/${isLogin.value ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      // Store token immediately upon successful response
      localStorage.setItem('userToken', data.token)
      
      // Call the success callback with the formatted response
      await onSuccess({
        token: data.token,
        email: email.value // Use the email from the form since it's not in the response
      })
    } catch (error: any) {
      errors.value.submit = error.message
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    confirmPassword,
    errors,
    loading,
    handleSubmit,
  }
}