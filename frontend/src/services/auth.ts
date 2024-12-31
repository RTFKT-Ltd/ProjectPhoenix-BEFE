interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // add other user fields as needed
  };
}

interface AuthError {
  message: string;
  errors?: Record<string, string>;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: AuthError = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

export async function registerUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: AuthError = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
} 