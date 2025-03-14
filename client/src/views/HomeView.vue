<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import TheWelcome from '../components/TheWelcome.vue'
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

auth.me();

async function logout() {
  await auth.logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <main>
    <div v-if="auth.user">
      <span>
        Welcome, {{ auth.user.firstname }} {{ auth.user.lastname }}
      </span>

      <form @submit.prevent="logout">
        <button type="submit">Se déconnecter</button>
      </form>
    </div>
    <div v-else>No user found...</div>
  </main>
</template>
