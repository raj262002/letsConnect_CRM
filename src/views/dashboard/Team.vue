<template>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 class="title">{{ team.name }}</h1>
  
          <el-divider></el-divider>
  
          <p><strong>Plan: </strong>{{ $store.state.team.plan }}</p>
          <p><strong>Max clients: </strong>{{ $store.state.team.max_clients }}</p>
          <p><strong>Max leads: </strong>{{ $store.state.team.max_leads }}</p>
          <p v-if="$store.state.team.plan !== 'Free'"><strong>Plan end date: </strong>{{ team.plan_end_date }}</p>
  
          <p>
            <router-link :to="{ name: 'Plans' }">
              <el-button type="text">Change plan</el-button>
            </router-link>
          </p>
  
          <el-divider></el-divider>
  
          <template v-if="team.created_by.id === parseInt($store.state.user.id)">
            <router-link :to="{ name: 'AddMember' }">
              <el-button type="primary">Add member</el-button>
            </router-link>
          </template>
        </el-col>
  
        <el-col :span="24">
          <h2 class="subtitle">Members</h2>
  
          <el-table :data="team.members" border>
            <el-table-column label="Username" prop="username"></el-table-column>
            <el-table-column label="Full name">
              <template #default="{ row }">
                {{ row.first_name }} {{ row.last_name }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import axios from 'axios';
  import { ElButton, ElRow, ElCol, ElTable, ElTableColumn, ElDivider } from 'element-plus';
  
  export default defineComponent({
    name: 'Team',
    components: {
      ElButton,
      ElRow,
      ElCol,
      ElTable,
      ElTableColumn,
      ElDivider,
    },
    data() {
      return {
        team: {
          members: [],
          created_by: {},
          name: '',
          plan_end_date: '',
        },
      };
    },
    mounted() {
      this.getTeam();
    },
    methods: {
      async getTeam() {
        this.$store.commit('setIsLoading', true);
  
        try {
          const response = await axios.get('/api/v1/teams/get_my_team/');
          this.team = response.data;
        } catch (error) {
          console.log(error);
        }
  
        this.$store.commit('setIsLoading', false);
      },
    },
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .title {
    font-weight: bold;
  }
  
  .subtitle {
    font-weight: bold;
  }
  
  .el-divider {
    margin: 20px 0;
  }
  </style>
  