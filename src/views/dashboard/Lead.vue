<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title has-text-centered">{{ lead.company }}</h1>
          <div class="buttons">
            <el-button type="text" @click="navigateToEditLead">Edit</el-button>
            <el-button type="primary" @click="convertToClient">Convert to client</el-button>
            <el-button type="danger" @click="deleteLead">Delete</el-button>
          </div>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="12">
          <div class="box">
            <h2 class="subtitle">Details</h2>
  
            <template v-if="lead.assigned_to">
              <p><strong>Assigned to: </strong>{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</p>
            </template>
            <p><strong>Status: </strong>{{ lead.status }}</p>
            <p><strong>Priority: </strong>{{ lead.priority }}</p>
            <p><strong>Confidence: </strong>{{ lead.confidence }}</p>
            <p><strong>Estimated value: </strong>{{ lead.estimated_value }}</p>
            <p><strong>Created at: </strong>{{ lead.created_at }}</p>
            <p><strong>Modified at: </strong>{{ lead.modified_at }}</p>
          </div>
        </el-col>
  
        <el-col :span="12">
          <div class="box">
            <h2 class="subtitle">Contact information</h2>
            <p><strong>Contact person: </strong>{{ lead.contact_person }}</p>
            <p><strong>Email: </strong>{{ lead.email }}</p>
            <p><strong>Phone: </strong>{{ lead.phone }}</p>
            <p><strong>Website: </strong>{{ lead.website }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import axios from 'axios';
  import { ElButton } from 'element-plus';
  
  interface Lead {
    id: number;
    company: string;
    assigned_to: {
      first_name: string;
      last_name: string;
    } | null;
    status: string;
    priority: string;
    confidence: number;
    estimated_value: number;
    created_at: string;
    modified_at: string;
    contact_person: string;
    email: string;
    phone: string;
    website: string;
  }
  
  export default defineComponent({
    name: 'Lead',
    components: {
      ElButton
    },
    data() {
      return {
        lead: reactive<Lead>({
          id: 0,
          company: '',
          assigned_to: null,
          status: '',
          priority: '',
          confidence: 0,
          estimated_value: 0,
          created_at: '',
          modified_at: '',
          contact_person: '',
          email: '',
          phone: '',
          website: ''
        })
      };
    },
    mounted() {
      this.getLead();
    },
    methods: {
      async getLead() {
        this.$store.commit('setIsLoading', true);
        const leadID = this.$route.params.id;
  
        try {
          const response = await axios.get(`/api/v1/leads/${leadID}/`);
          this.lead = response.data;
        } catch (error) {
          console.error(error);
        } finally {
          this.$store.commit('setIsLoading', false);
        }
      },
      async deleteLead() {
        this.$store.commit('setIsLoading', true);
  
        const leadID = this.$route.params.id;
  
        try {
          await axios.post(`/api/v1/leads/delete_lead/${leadID}/`);
          this.$router.push('/dashboard/leads');
        } catch (error) {
          console.error(error);
        } finally {
          this.$store.commit('setIsLoading', false);
        }
      },
      async convertToClient() {
        this.$store.commit('setIsLoading', true);
  
        const leadID = this.$route.params.id;
        const data = { lead_id: leadID };
  
        try {
          await axios.post(`/api/v1/convert_lead_to_client/`, data);
          this.$router.push('/dashboard/clients');
        } catch (error) {
          console.error(error);
        } finally {
          this.$store.commit('setIsLoading', false);
        }
      },
      navigateToEditLead() {
        const leadID = this.$route.params.id;
        this.$router.push({ name: 'EditLead', params: { id: leadID } });
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
  
  .subtitle {
    margin-bottom: 10px;
  }
  
  .box {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .buttons {
    margin-bottom: 20px;
  }
  
  .el-button {
    margin-right: 10px;
  }
  </style>
  