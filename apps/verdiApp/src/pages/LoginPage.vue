<template>
  <div
    class="login-page bg-cover bg-center flex flex-col items-center justify-center min-h-screen"
  >
    <div class="absolute top-1/4 flex flex-col justify-center items-center">
      <h1 class="text-2xl font-bold mb-6">Welcome to Turbo Plant</h1>

      <button
        class="mb-6 px-4 py-2 bg-white rounded hover:bg-gray-200"
        @click="toggleLogin"
      >
        {{ showLogin ? 'Hide' : 'Show' }} Login
      </button>

      <LoginComponent v-if="showLogin" />
    </div>
  </div>
</template>

<script>
import { LoginComponent } from '@/components';

export default {
  components: {
    LoginComponent,
  },
  data() {
    return {
      showLogin: false,
    };
  },
  methods: {
    toggleLogin() {
      this.showLogin = !this.showLogin;
    },
  },
};
</script>

<style scoped>
.login-page {
  background-image: url('../assets/login.png');
  background-repeat: no-repeat;
  background-position: bottom;
}
</style>
