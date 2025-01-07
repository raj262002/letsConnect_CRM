<script lang="ts">
export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      errors: [] as string[],
      emailError: '',
      password1Error: '',
      password2Error: '',
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      this.emailError = '';
      this.password1Error = '';
      this.password2Error = '';

      if (!this.username) {
        this.emailError = 'Email is required.';
        this.errors.push(this.emailError);
      }

      if (!this.password1) {
        this.password1Error = 'Password is required.';
        this.errors.push(this.password1Error);
      }

      if (this.password1 !== this.password2) {
        this.password2Error = 'Passwords do not match.';
        this.errors.push(this.password2Error);
      }

      if (!this.errors.length) {
        console.log('Form submitted successfully!');
        // You can proceed with form submission logic
      }
    },
  },
};
</script>

<template>
  <el-container style="height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f5f5f5;">
    <el-card class="signup-card" shadow="hover">
      <h1 class="title">Sign Up</h1>
      <el-form @submit.prevent="submitForm" label-width="120px">
        <el-form-item label="Email" :error="emailError">
          <el-input type="email" v-model="username" placeholder="Enter your email" />
        </el-form-item>

        <el-form-item label="Password" :error="password1Error">
          <el-input type="password" v-model="password1" placeholder="Enter your password" />
        </el-form-item>

        <el-form-item label="Repeat Password" :error="password2Error">
          <el-input type="password" v-model="password2" placeholder="Repeat your password" />
        </el-form-item>

        <el-alert v-if="errors.length" type="error" :description="errors.join(', ')" style="margin-bottom: 16px;" />

        <el-form-item>
          <el-button type="primary" native-type="submit" class="submit-button">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<style scoped>
.signup-card {
  width: 400px;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.submit-button {
  width: 100%;
}
</style>
