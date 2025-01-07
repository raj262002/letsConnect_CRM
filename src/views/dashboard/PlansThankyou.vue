<template>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="12" class="column-center">
          <h1 class="title">Thank you</h1>
          <el-card>
            <p>Thank you for subscribing to a plan!</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import axios from 'axios';
  import { ElCard, ElNotification } from 'element-plus'; // Import ElNotification from Element UI
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'PlansThankyou',
    components: {
      ElCard,
    },
    setup() {
      const store = useStore();
  
      const handleSubscriptionResponse = async () => {
        try {
          const sessionId = new URLSearchParams(window.location.search).get('session_id');
          if (!sessionId) {
            throw new Error('Session ID is missing');
          }
  
          const response = await axios.post('/api/v1/stripe/check_session/', {
            session_id: sessionId,
          });
  
          console.log(response);
  
          // Using Element UI's ElNotification for success message
          ElNotification({
            title: 'Success',
            message: 'The plan was changed!',
            type: 'success',
            duration: 2000,
          });
  
          // Assuming Vuex for state management
          store.commit('setTeam', {
            id: response.data.id,
            name: response.data.name,
            plan: response.data.plan.name,
            max_leads: response.data.plan.max_leads,
            max_clients: response.data.plan.max_clients,
          });
        } catch (error) {
          // Using Element UI's ElNotification for error message
          ElNotification({
            title: 'Error',
            message: 'Something went wrong...',
            type: 'error',
            duration: 2000,
          });
  
          console.log('Error', error);
        }
      };
  
      onMounted(() => {
        handleSubscriptionResponse();
      });
  
      return {};
    },
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .column-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .title {
    font-weight: bold;
    text-align: center;
  }
  
  .el-card {
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  