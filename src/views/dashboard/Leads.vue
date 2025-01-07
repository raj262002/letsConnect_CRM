<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title">Leads</h1>
  
          <router-link 
            to="/dashboard/leads/add"
            v-if="$store.state.team.max_leads > num_leads"
          >
            <el-button type="primary">Add lead</el-button>
          </router-link>
  
          <el-notification 
            v-else
            title="Limit Reached"
            type="error"
          >
            You have reached the top of your limitations. Please upgrade!
          </el-notification>
  
          <hr>
  
          <form @submit.prevent="getLeads">
            <el-row>
              <el-col :span="18">
                <el-input v-model="query" placeholder="Search leads" />
              </el-col>
              <el-col :span="6">
                <el-button type="success" @click="getLeads">Search</el-button>
              </el-col>
            </el-row>
          </form>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24">
          <el-table :data="leads" style="width: 100%">
            <el-table-column prop="company" label="Company" />
            <el-table-column prop="contact_person" label="Contact person" />
            <el-table-column label="Assigned to">
              <template #default="{ row }">
                <span v-if="row.assigned_to">{{ row.assigned_to.first_name }} {{ row.assigned_to.last_name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="Status" />
            <el-table-column label="Actions">
              <template #default="{ row }">
                <router-link :to="{ name: 'Lead', params: { id: row.id }}">
                  <el-button type="text">Details</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
  
          <div class="buttons">
            <el-button type="text" @click="goToPreviousPage" v-if="showPreviousButton">Previous</el-button>
            <el-button type="text" @click="goToNextPage" v-if="showNextButton">Next</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import axios from 'axios';
  import { ElButton, ElInput, ElTable, ElTableColumn, ElRow, ElCol, ElNotification } from 'element-plus';
  
  interface Lead {
    id: number;
    company: string;
    contact_person: string;
    assigned_to: {
      first_name: string;
      last_name: string;
    } | null;
    status: string;
  }
  
  export default defineComponent({
    name: 'Leads',
    components: {
      ElButton,
      ElInput,
      ElTable,
      ElTableColumn,
      ElRow,
      ElCol,
      ElNotification
    },
    data() {
      return {
        leads: [] as Lead[],
        showNextButton: false,
        showPreviousButton: false,
        currentPage: 1,
        query: '',
        num_leads: 0
      };
    },
    mounted() {
      this.getLeads();
    },
    methods: {
      goToNextPage() {
        this.currentPage += 1;
        this.getLeads();
      },
      goToPreviousPage() {
        this.currentPage -= 1;
        this.getLeads();
      },
      async getLeads() {
        this.$store.commit('setIsLoading', true);
  
        this.showNextButton = false;
        this.showPreviousButton = false;
  
        try {
          const response = await axios.get(`/api/v1/leads/`);
          this.num_leads = response.data.count;
        } catch (error) {
          console.error(error);
        }
  
        try {
          const response = await axios.get(`/api/v1/leads/?page=${this.currentPage}&search=${this.query}`);
          this.leads = response.data.results;
  
          if (response.data.next) {
            this.showNextButton = true;
          }
  
          if (response.data.previous) {
            this.showPreviousButton = true;
          }
        } catch (error) {
          console.error(error);
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
  
  .buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  .el-table {
    margin-top: 20px;
  }
  </style>
  