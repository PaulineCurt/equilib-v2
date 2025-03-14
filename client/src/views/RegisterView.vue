<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const form = ref({
    lastname: '',
    firstname: '',
    phone: '',
    email: '',
    password: ''
});

async function submit() {
    await auth.register(form);
    router.push({ name: 'home' });
}
</script>
<template>
    <form @submit.prevent="submit">
        <label>
            <span>Nom</span>
            <input type="text" v-model="form.lastname">
        </label>
        <label>
            <span>Prénom</span>
            <input type="text" v-model="form.firstname">
        </label>
        <label>
            <span>Téléphone</span>
            <input type="text" v-model="form.phone">
        </label>
        <label>
            <span>Email</span>
            <input type="email" v-model="form.email">
        </label>
        <label>
            <span>Mot de passe</span>
            <input type="password" v-model="form.password">
        </label>
        <button type="submit">S'inscrire</button>
    </form>
</template>