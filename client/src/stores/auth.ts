import { ref, unref } from "vue";
import { defineStore } from "pinia";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
}

interface AuthResult {
  token: string;
  // Ajoutez d'autres propriétés si nécessaire
  // user?: UserType;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref< User | null>(null)
    const token = ref(localStorage.getItem('token'))

    async function api<T = any>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', 
        url: string, 
        payload: Record<string, any> = {}
    ): Promise<T> {
        const response = await fetch(`http://localhost:3333/api/v1${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: method !== 'GET' ? JSON.stringify(unref(payload)) : null
        })

        return response.json()
    }

    function authenticate(result: AuthResult): void {
        token.value = result.token
        localStorage.setItem('token', token.value)
    }

    async function login(payload: Record<string, any>): Promise<void> {
        const result = await api<AuthResult>('POST', '/auth/login', payload)
        authenticate(result)
    }

    async function register(payload: Record<string, any>): Promise<void> {
        const result = await api<AuthResult>('POST', '/auth/register', payload)
        authenticate(result)
    }

    async function logout(): Promise<void> {
        await api('DELETE', '/auth/logout')
        token.value = null
        user.value = null
        localStorage.removeItem('token')
    }

    async function me(): Promise<User | null> {
        const result = await api('GET', '/auth/me')
        user.value = result.user
        return user.value
    }

    return {
        user,
        login,
        register,
        logout,
        me
    }
})