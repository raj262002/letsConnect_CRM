<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title">{{ client.name }}</h1>
          <div class="buttons">
            <router-link :to="{ name: 'EditClient', params: { id: client.id }}" class="button is-light">Edit</router-link>
            <el-button type="danger" @click="deleteClient">Delete</el-button>
          </div>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="12">
          <el-card>
            <h2 class="subtitle">Details</h2>
            <p><strong>Created at: </strong>{{ client.created_at }}</p>
            <p><strong>Modified at: </strong>{{ client.modified_at }}</p>
          </el-card>
        </el-col>
  
        <el-col :span="12">
          <el-card>
            <h2 class="subtitle">Contact information</h2>
            <p><strong>Contact person: </strong>{{ client.contact_person }}</p>
            <p><strong>Email: </strong>{{ client.email }}</p>
            <p><strong>Phone: </strong>{{ client.phone }}</p>
            <p><strong>Website: </strong>{{ client.website }}</p>
          </el-card>
        </el-col>
      </el-row>
  
      <el-divider></el-divider>
  
      <el-row>
        <el-col :span="24">
          <h2 class="subtitle">Notes</h2>
          <router-link :to="{ name: 'AddNote', params: { id: client.id }}" class="button is-success mb-6">Add note</router-link>
  
          <el-card v-for="note in notes" :key="note.id" class="mb-4">
            <h3 class="is-size-4">{{ note.name }}</h3>
            <p>{{ note.body }}</p>
            <router-link :to="{ name: 'EditNote', params: { id: client.id, note_id: note.id }}" class="button is-success mt-6">Edit note</router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import axios from "axios";
  
  export default {
    name: "Client",
    data() {
      return {
        client: {},
        notes: [],
      };
    },
    mounted() {
      this.getClient();
    },
    methods: {
      async deleteClient() {
        this.$store.commit("setIsLoading", true);
  
        const clientID = this.$route.params.id;
  
        try {
          await axios.post(`/api/v1/clients/delete_client/${clientID}/`);
          this.$router.push("/dashboard/clients");
        } catch (error) {
          console.error(error);
        }
  
        this.$store.commit("setIsLoading", false);
      },
      async getClient() {
        this.$store.commit("setIsLoading", true);
  
        const clientID = this.$route.params.id;
  
        try {
          const clientResponse = await axios.get(`/api/v1/clients/${clientID}/`);
          this.client = clientResponse.data;
  
          const notesResponse = await axios.get(`/api/v1/notes/?client_id=${clientID}`);
          this.notes = notesResponse.data;
        } catch (error) {
          console.error(error);
        }
  
        this.$store.commit("setIsLoading", false);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .subtitle {
    margin-bottom: 10px;
  }
  
  .el-card {
    margin-bottom: 20px;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
  }
  
  button, .el-button {
    margin-top: 10px;
  }
  </style>
  