export const auth = {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken')
  },

  getUserEmail(): string {
    return localStorage.getItem('userEmail') || ''
  },

  login(email: string, token: string): void {
    localStorage.setItem('userToken', token)
    localStorage.setItem('userEmail', email)
  },

  logout(): void {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userEmail')
  },

  getToken(): string {
    return localStorage.getItem('userToken') || ''
  }
} 