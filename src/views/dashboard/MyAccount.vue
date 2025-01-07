<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title">My Account</h1>
        </el-col>
  
        <el-col :span="24">
          <div class="buttons">
            <router-link 
              :to="{ name: 'EditMember', params: { id: $store.state.user.id }}"
              >
              <el-button type="primary" plain>Edit</el-button>
            </router-link>
  
            <el-button 
              type="danger" 
              @click="logout"
              >Log out</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { ElButton, ElRow, ElCol } from 'element-plus';
  
  export default defineComponent({
    name: 'MyAccount',
    components: {
      ElButton,
      ElRow,
      ElCol
    },
    methods: {
      async logout() {
        try {
          await axios.post('/api/v1/token/logout/');
          console.log('Logged out');
        } catch (error) {
          console.log(JSON.stringify(error));
        }
  
        axios.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        localStorage.removeItem('team_name');
        localStorage.removeItem('team_id');
        this.$store.commit('removeToken');
  
        this.$router.push('/');
      }
    }
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  </style>
  