<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title has-text-centered">Edit Member</h1>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form :model="user" @submit.prevent="submitForm">
            <el-form-item label="First Name">
              <el-input v-model="user.first_name" />
            </el-form-item>
  
            <el-form-item label="Last Name">
              <el-input v-model="user.last_name" />
            </el-form-item>
  
            <el-form-item>
              <el-button type="success" native-type="submit">Update</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue';
  import axios from 'axios';
  import { ElNotification } from 'element-plus';
  
  interface User {
    first_name: string;
    last_name: string;
  }
  
  export default defineComponent({
    name: 'EditMember',
    data() {
      return {
        user: reactive<User>({
          first_name: '',
          last_name: ''
        })
      };
    },
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        this.$store.commit('setIsLoading', true);
  
        const userID = this.$route.params.id;
  
        try {
          const response = await axios.get(`/api/v1/teams/member/${userID}/`);
          this.user = response.data;
        } catch (error) {
          console.log(error);
        } finally {
          this.$store.commit('setIsLoading', false);
        }
      },
      async submitForm() {
        this.$store.commit('setIsLoading', true);
  
        const userID = this.$route.params.id;
  
        try {
          const response = await axios.put(`/api/v1/teams/member/${userID}/`, this.user);
  
          ElNotification({
            title: 'Success',
            message: 'The user was updated successfully!',
            type: 'success',
            duration: 2000
          });
  
          this.$router.push({ name: 'MyAccount' });
        } catch (error) {
          console.log(error);
  
          ElNotification({
            title: 'Error',
            message: 'Failed to update the user. Please try again.',
            type: 'error',
            duration: 2000
          });
        } finally {
          this.$store.commit('setIsLoading', false);
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .title {
    margin-bottom: 20px;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  </style>
  