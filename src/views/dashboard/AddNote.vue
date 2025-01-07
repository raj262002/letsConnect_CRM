<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title">Add note</h1>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24">
          <el-form @submit.prevent="submitForm" label-position="top">
            <el-form-item label="Name" :label-width="'100px'">
              <el-input v-model="name" placeholder="Enter note name"></el-input>
            </el-form-item>
  
            <el-form-item label="Body" :label-width="'100px'">
              <el-input type="textarea" v-model="body" placeholder="Enter note body"></el-input>
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
    name: "AddNote",
    setup() {
      const name = ref<string>("");
      const body = ref<string>("");
  
      const submitForm = async () => {
        try {
          // Start loading
          this.$store.commit("setIsLoading", true);
  
          // Prepare note data
          const note = {
            name: name.value,
            body: body.value,
            client_id: this.$route.params.id,
          };
  
          // Send data to API
          await axios.post("/api/v1/notes/", note);
  
          // Show success message
          ElMessage({
            message: "The note was added successfully.",
            type: "success",
          });
  
          // Navigate to client details
          this.$router.push({ name: "Client", params: { id: this.$route.params.id } });
        } catch (error) {
          console.error(error);
          ElMessage({
            message: "Failed to add the note. Please try again.",
            type: "error",
          });
        } finally {
          // Stop loading
          this.$store.commit("setIsLoading", false);
        }
      };
  
      return {
        name,
        body,
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
  