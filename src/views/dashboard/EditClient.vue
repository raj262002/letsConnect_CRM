<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title has-text-centered">Edit {{ client.name }}</h1>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form @submit.prevent="submitForm" :model="client">
            <el-form-item label="Name">
              <el-input v-model="client.name" />
            </el-form-item>
  
            <el-form-item label="Contact person">
              <el-input v-model="client.contact_person" />
            </el-form-item>
  
            <el-form-item label="Email">
              <el-input v-model="client.email" />
            </el-form-item>
  
            <el-form-item label="Phone">
              <el-input v-model="client.phone" />
            </el-form-item>
  
            <el-form-item label="Website">
              <el-input v-model="client.website" />
            </el-form-item>
  
            <el-form-item>
              <el-button :loading="isLoading" type="success" native-type="submit">Update</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ElNotification } from 'element-plus';
  
  export default {
    name: 'EditClient',
    data() {
      return {
        client: {},
        isLoading: false, // Handle loading state
      };
    },
    mounted() {
      this.getClient();
    },
    methods: {
      async getClient() {
        this.isLoading = true;
        const clientID = this.$route.params.id;
  
        try {
          const response = await axios.get(`/api/v1/clients/${clientID}/`);
          this.client = response.data;
        } catch (error) {
          console.error(error);
          ElNotification({
            message: 'Failed to fetch client data',
            type: 'error',
            duration: 2000,
            position: 'bottom-right',
          });
        } finally {
          this.isLoading = false;
        }
      },
      async submitForm() {
        this.isLoading = true;
        const clientID = this.$route.params.id;
  
        try {
          await axios.patch(`/api/v1/clients/${clientID}/`, this.client);
  
          ElNotification({
            message: 'The client was updated successfully',
            type: 'success',
            duration: 2000,
            position: 'bottom-right',
          });
  
          this.$router.push(`/dashboard/clients/${clientID}`);
        } catch (error) {
          console.error(error);
  
          ElNotification({
            message: 'An error occurred while updating the client',
            type: 'error',
            duration: 2000,
            position: 'bottom-right',
          });
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
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
  