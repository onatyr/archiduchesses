<template>
  <div class="flex flex-col justify-center w-full gap-10">
    <form @submit.prevent="submitForm">
      <TextInput
        v-if="state.isRegister"
        id="name"
        label="Name"
        v-model="form.name"
        required
        placeholder="Enter your name"
        :error="errors.name"
      />

      <TextInput
        id="email"
        label="Email"
        type="email"
        v-model="form.email"
        required
        placeholder="Enter your email"
        :error="errors.email"
      />

      <TextInput
        id="password"
        label="Password"
        type="password"
        v-model="form.password"
        required
        placeholder="Enter your password"
        :error="errors.password"
      />

      <TextInput
        v-if="state.isRegister"
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        v-model="form.confirmPassword"
        required
        placeholder="Confirm your password"
        :error="errors.confirmPassword"
      />

      <ErrorMessage
        :message="errors.form"
        variant="error"
        size="sm"
        :show-icon="true"
      />

      <div class="flex items-center justify-between">
        <button
          class="font-bold rounded focus:outline-none px-4 py-2 focus:shadow-outline bg-secondary dark:bg-dark-secondary hover:bg-secondaryVariant dark:hover:bg-dark-secondaryVariant text-onSecondary dark:text-dark-onSecondary shadow-sm"
          type="submit"
        >
          {{ state.isRegister ? 'Register' : 'Login' }}
        </button>
      </div>

      <button
        type="button"
        @click="toggleForm"
        class="inline-block align-baseline font-bold text-sm text-secondary dark:text-dark-secondary hover:text-secondaryVariant dark:hover:text-dark-secondaryVariant"
      >
        {{
          state.isRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Register"
        }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../services/';
import TextInput from './forms/TextInput.vue';
import FormButton from './forms/FormButton.vue';
import ErrorMessage from './forms/ErrorMessage.vue';

export default defineComponent({
  components: {
    TextInput,
    FormButton,
    ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      isRegister: false,
    });
    const form = reactive({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    });

    const authService = new AuthService();

    const errors = reactive({
      email: '',
      password: '',
      confirmPassword: '',
      form: '',
      name: '',
    });

    const clearErrors = () => {
      errors.email = '';
      errors.password = '';
      errors.confirmPassword = '';
      errors.form = '';
      errors.name = '';
    };

    const submitForm = async () => {
      clearErrors();

      if (state.isRegister) {
        // Registration validation
        if (!form.name) {
          errors.name = 'Name is required.';
        }
        if (!form.email) {
          errors.email = 'Email is required.';
        }
        if (!form.password) {
          errors.password = 'Password is required.';
        }
        if (form.password !== form.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match.';
        }

        // Check for any errors before registration
        if (
          errors.name ||
          errors.email ||
          errors.password ||
          errors.confirmPassword
        ) {
          return;
        }

        // Register logic
        try {
          const registerResponse = await authService.register(
            form.email,
            form.password,
            form.name
          );

          if (!registerResponse) {
            errors.form = 'Registration failed.';
            return;
          }

          alert('Registration successful');
        } catch (error) {
          console.error(error);
          errors.form = 'An error occurred during registration.';
        }
      } else {
        // Login logic
        if (!form.email) {
          errors.email = 'Email is required.';
        }
        if (!form.password) {
          errors.password = 'Password is required.';
        }

        // Check for any errors before login
        if (errors.email || errors.password) {
          return;
        }

        const isLogged = await authService.login(form.email, form.password);

        if (isLogged) {
          await router.push({ name: 'main' });
        } else {
          errors.form = 'Invalid username or password';
        }
      }
    };

    const toggleForm = () => {
      state.isRegister = !state.isRegister;
      console.log(state.isRegister);
    };

    return {
      state,
      form,
      submitForm,
      toggleForm,
      errors,
    };
  },
});
</script>
