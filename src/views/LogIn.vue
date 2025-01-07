<template>
    <el-container>
      <el-header>
        <h1 class="title">Log in</h1>
      </el-header>
  
      <el-main>
        <el-form @submit.prevent="submitForm" ref="loginForm" label-width="100px">
          <el-form-item label="Email">
            <el-input
              type="email"
              v-model="username"
              placeholder="Enter your email"
              name="email"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="Password">
            <el-input
              type="password"
              v-model="password"
              placeholder="Enter your password"
              name="password"
            ></el-input>
          </el-form-item>
  
          <el-alert
            v-if="errors.length"
            title="Please fix the errors below:"
            type="error"
            show-icon
            class="mb-4"
          >
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </el-alert>
  
          <el-form-item>
            <el-button type="primary" native-type="submit">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    name: "LogIn",
    setup() {
      const username = ref<string>("");
      const password = ref<string>("");
      const errors = ref<string[]>([]);
  
      const submitForm = async () => {
        errors.value = [];
        const formData = {
          username: username.value,
          password: password.value,
        };
  
        // Reset token and local storage
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");
  
        try {
          // Log in request
          const response = await axios.post("/api/v1/token/login/", formData);
          const token = response.data.auth_token;
  
          // Store token in Vuex and localStorage
          this.$store.commit("setToken", token);
          axios.defaults.headers.common["Authorization"] = `Token ${token}`;
          localStorage.setItem("token", token);
  
          // Fetch user details
          const userResponse = await axios.get("/api/v1/users/me");
          const user = {
            id: userResponse.data.id,
            username: userResponse.data.username,
          };
          this.$store.commit("setUser", user);
          localStorage.setItem("username", user.username);
          localStorage.setItem("userid", String(user.id));
  
          // Fetch team details
          const teamResponse = await axios.get("/api/v1/teams/get_my_team/");
          const team = {
            id: teamResponse.data.id,
            name: teamResponse.data.name,
            plan: teamResponse.data.plan.name,
            max_leads: teamResponse.data.plan.max_leads,
            max_clients: teamResponse.data.plan.max_clients,
          };
          this.$store.commit("setTeam", team);
  
          // Navigate to dashboard
          this.$router.push("/dashboard/my-account");
        } catch (error: any) {
          if (error.response) {
            for (const property in error.response.data) {
              errors.value.push(`${property}: ${error.response.data[property]}`);
            }
          } else if (error.message) {
            errors.value.push("Something went wrong. Please try again!");
          }
        } finally {
          this.$store.commit("setIsLoading", false);
        }
      };
  
      return {
        username,
        password,
        errors,
        submitForm,
      };
    },
  });
  </script>
  

<style scoped>
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .mb-4 {
    margin-bottom: 20px;
  }
  </style>
  