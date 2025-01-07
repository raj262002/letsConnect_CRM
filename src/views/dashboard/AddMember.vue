<template>
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h1 class="title">Add member</h1>
        </div>
  
        <div class="column is-12">
          <form @submit.prevent="submitForm">
            <div class="field">
              <label>Email</label>
              <div class="control">
                <input type="email" name="email" class="input" v-model="username" />
              </div>
            </div>
  
            <div class="field">
              <label>Password</label>
              <div class="control">
                <input type="password" name="password1" class="input" v-model="password1" />
              </div>
            </div>
  
            <div class="field">
              <label>Repeat password</label>
              <div class="control">
                <input type="password" name="password2" class="input" v-model="password2" />
              </div>
            </div>
  
            <div v-if="errors.length" class="notification is-danger">
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
  
            <div class="field">
              <div class="control">
                <button class="button is-success">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'AddMember',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const username = ref<string>('');
      const password1 = ref<string>('');
      const password2 = ref<string>('');
      const errors = ref<string[]>([]);
  
      const submitForm = async () => {
        errors.value = [];
  
        if (username.value === '') {
          errors.value.push('The username is missing');
        }
  
        if (password1.value === '') {
          errors.value.push('The password is too short');
        }
  
        if (password1.value !== password2.value) {
          errors.value.push('The passwords are not matching');
        }
  
        if (errors.value.length === 0) {
          try {
            store.commit('setIsLoading', true);
  
            const formData = {
              username: username.value,
              password: password1.value,
            };
  
            const response = await axios.post('/api/v1/users/', formData);
  
            ElMessage({
              message: 'The member was added',
              type: 'success',
            });
  
            const emailData = { email: username.value };
  
            await axios.post('/api/v1/teams/add_member/', emailData);
  
            router.push({ name: 'Team' });
          } catch (error) {
            if (error.response) {
              for (const property in error.response.data) {
                errors.value.push(`${property}: ${error.response.data[property]}`);
              }
            } else if (error.message) {
              errors.value.push('Something went wrong. Please try again!');
            }
          } finally {
            store.commit('setIsLoading', false);
          }
        }
      };
  
      return {
        username,
        password1,
        password2,
        errors,
        submitForm,
      };
    },
  });
  </script>
  
  <style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.columns {
  display: flex;
  flex-wrap: wrap;
}

.column {
  width: 100%;
  padding: 10px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 1.5rem;
}

label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.control {
  display: flex;
  flex-direction: column;
}

input.input {
  font-size: 14px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

button.button {
  background-color: #409eff;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.button:hover {
  background-color: #66b1ff;
}

.notification {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
}

.is-danger {
  border-color: #f5c6cb;
}

.is-success {
  background-color: #d4edda;
  color: #155724;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .columns {
    flex-direction: column;
  }
}
</style>
