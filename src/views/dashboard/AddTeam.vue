<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title">Add team</h1>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24">
          <el-form @submit.prevent="submitForm" label-position="top">
            <el-form-item label="Team name" :label-width="'100px'">
              <el-input v-model="name" placeholder="Enter team name"></el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button type="success" native-type="submit">Submit</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import axios from "axios";
  import { ElMessage } from "element-plus";
  
  export default defineComponent({
    name: "AddTeam",
    setup() {
      const name = ref<string>("");
  
      const submitForm = async () => {
        try {
          // Start loading
          this.$store.commit("setIsLoading", true);
  
          // Prepare team data
          const team = {
            name: name.value,
          };
  
          // Send data to API
          const response = await axios.post("/api/v1/teams/", team);
  
          // Show success message
          ElMessage({
            message: "The team was added successfully.",
            type: "success",
          });
  
          // Commit team data to store
          this.$store.commit("setTeam", { id: response.data.id, name: name.value });
  
          // Navigate to dashboard
          this.$router.push("/dashboard");
        } catch (error) {
          console.error(error);
          ElMessage({
            message: "Failed to add the team. Please try again.",
            type: "error",
          });
        } finally {
          // Stop loading
          this.$store.commit("setIsLoading", false);
        }
      };
  
      return {
        name,
        submitForm,
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .el-row {
    margin-bottom: 20px;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-button {
    width: 100%;
  }
  </style>
  