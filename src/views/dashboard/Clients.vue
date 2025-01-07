<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title">Clients</h1>
  
          <router-link 
            to="/dashboard/clients/add" 
            v-if="$store.state.team.max_clients > num_clients"
            class="button is-primary mb-4"
          >
            Add client
          </router-link>
  
          <el-notification
            v-else
            title="Limit Reached"
            type="error"
            :duration="0"
          >
            You have reached the top of your limitations. Please upgrade!
          </el-notification>
  
          <hr>
  
          <el-form @submit.prevent="getClients">
            <el-row>
              <el-col :span="18">
                <el-input 
                  placeholder="Search clients..." 
                  v-model="query" 
                  clearable
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="success" @click="getClients" class="w-full">
                  Search
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24">
          <template v-if="clients.length">
            <el-table :data="clients" style="width: 100%">
              <el-table-column prop="name" label="Name"></el-table-column>
              <el-table-column prop="contact_person" label="Contact person"></el-table-column>
              <el-table-column label="Actions">
                <template slot-scope="scope">
                  <router-link :to="{ name: 'Client', params: { id: scope.row.id } }" class="button is-light">Details</router-link>
                </template>
              </el-table-column>
            </el-table>
  
            <div class="buttons">
              <el-button 
                type="primary" 
                @click="goToPreviousPage" 
                v-if="showPreviousButton"
                class="mr-2"
              >
                Previous
              </el-button>
              <el-button 
                type="primary" 
                @click="goToNextPage" 
                v-if="showNextButton"
              >
                Next
              </el-button>
            </div>
          </template>
  
          <template v-else>
            <p>You don't have any clients yet...</p>
          </template>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Clients",
    data() {
      return {
        clients: [],
        showNextButton: false,
        showPreviousButton: false,
        currentPage: 1,
        query: "",
        num_clients: 0,
      };
    },
    mounted() {
      this.getClients();
    },
    methods: {
      goToNextPage() {
        this.currentPage += 1;
        this.getClients();
      },
      goToPreviousPage() {
        this.currentPage -= 1;
        this.getClients();
      },
      async getClients() {
        this.$store.commit("setIsLoading", true);
  
        this.showNextButton = false;
        this.showPreviousButton = false;
  
        await axios
          .get(`/api/v1/clients/`)
          .then((response) => {
            this.num_clients = response.data.count;
          });
  
        await axios
          .get(`/api/v1/clients/?page=${this.currentPage}&search=${this.query}`)
          .then((response) => {
            this.clients = response.data.results;
  
            if (response.data.next) {
              this.showNextButton = true;
            }
  
            if (response.data.previous) {
              this.showPreviousButton = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
  
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
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  