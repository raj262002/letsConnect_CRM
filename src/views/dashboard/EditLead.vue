<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title has-text-centered">Edit {{ lead.company }}</h1>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form :model="lead" @submit.prevent="submitForm">
            
            <el-form-item label="Company">
              <el-input v-model="lead.company" />
            </el-form-item>
  
            <el-form-item label="Contact Person">
              <el-input v-model="lead.contact_person" />
            </el-form-item>
  
            <el-form-item label="Email">
              <el-input v-model="lead.email" type="email" />
            </el-form-item>
  
            <el-form-item label="Phone">
              <el-input v-model="lead.phone" />
            </el-form-item>
  
            <el-form-item label="Website">
              <el-input v-model="lead.website" />
            </el-form-item>
  
            <el-form-item label="Confidence">
              <el-input v-model="lead.confidence" type="number" />
            </el-form-item>
  
            <el-form-item label="Estimated Value">
              <el-input v-model="lead.estimated_value" type="number" />
            </el-form-item>
  
            <el-form-item label="Status">
              <el-select v-model="lead.status">
                <el-option value="new" label="New" />
                <el-option value="contacted" label="Contacted" />
                <el-option value="inprogress" label="In progress" />
                <el-option value="lost" label="Lost" />
                <el-option value="won" label="Won" />
              </el-select>
            </el-form-item>
  
            <el-form-item label="Priority">
              <el-select v-model="lead.priority">
                <el-option value="low" label="Low" />
                <el-option value="medium" label="Medium" />
                <el-option value="high" label="High" />
              </el-select>
            </el-form-item>
  
            <el-form-item label="Assigned To">
              <el-select v-model="lead.assigned_to">
                <el-option value="" label="Select member" />
                <el-option
                  v-for="member in team.members"
                  :key="member.id"
                  :value="member.id"
                  :label="member.username"
                />
              </el-select>
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
    name: 'EditLead',
    data() {
      return {
        lead: {},
        team: {
          members: []
        },
        isLoading: false, // Handle loading state
      };
    },
    mounted() {
      this.getLead();
      this.getTeam();
    },
    methods: {
      async getLead() {
        this.isLoading = true;
        const leadID = this.$route.params.id;
  
        try {
          const response = await axios.get(`/api/v1/leads/${leadID}/`);
          this.lead = response.data;
        } catch (error) {
          console.error(error);
          ElNotification({
            message: 'Failed to fetch lead data',
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
        const leadID = this.$route.params.id;
  
        try {
          await axios.patch(`/api/v1/leads/${leadID}/`, this.lead);
  
          ElNotification({
            message: 'The lead was updated successfully',
            type: 'success',
            duration: 2000,
            position: 'bottom-right',
          });
  
          this.$router.push(`/dashboard/leads/${leadID}`);
        } catch (error) {
          console.error(error);
  
          ElNotification({
            message: 'An error occurred while updating the lead',
            type: 'error',
            duration: 2000,
            position: 'bottom-right',
          });
        } finally {
          this.isLoading = false;
        }
      },
      async getTeam() {
        this.isLoading = true;
  
        try {
          const response = await axios.get('/api/v1/teams/get_my_team/');
          this.team = response.data;
        } catch (error) {
          console.error(error);
          ElNotification({
            message: 'Failed to fetch team data',
            type: 'error',
            duration: 2000,
            position: 'bottom-right',
          });
        } finally {
          this.isLoading = false;
        }
      }
    }
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
  