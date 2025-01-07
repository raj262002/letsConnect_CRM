<template>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <h1 class="title has-text-centered">Edit Note</h1>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form :model="note" @submit.prevent="submitForm">
            <el-form-item label="Name">
              <el-input v-model="note.name" />
            </el-form-item>
  
            <el-form-item label="Body">
              <el-input type="textarea" v-model="note.body" rows="4" />
            </el-form-item>
  
            <el-form-item>
              <el-button type="success" native-type="submit" :loading="isLoading">Update</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, onMounted, ref } from 'vue';
  import axios from 'axios';
  import { ElNotification } from 'element-plus';
  
  interface Note {
    id: number;
    name: string;
    body: string;
  }
  
  export default defineComponent({
    name: 'EditNote',
    data() {
      return {
        note: reactive<Note>({
          id: 0,
          name: '',
          body: ''
        }),
        isLoading: ref(false)
      };
    },
    mounted() {
      this.getNote();
    },
    methods: {
      async getNote() {
        this.isLoading = true;
        const noteID = this.$route.params.note_id;
        const clientID = this.$route.params.id;
  
        try {
          const response = await axios.get(`/api/v1/notes/${noteID}/?client_id=${clientID}`);
          this.note = response.data;
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      },
      async submitForm() {
        this.isLoading = true;
        const clientID = this.$route.params.id;
  
        try {
          const response = await axios.patch(`/api/v1/notes/${this.note.id}/?client_id=${clientID}`, this.note);
  
          ElNotification({
            message: 'The note was updated successfully.',
            type: 'success',
            duration: 2000,
            position: 'bottom-right',
          });
  
          this.$router.push({ name: 'Client', params: { id: this.$route.params.id } });
        } catch (error) {
          console.error(error);
  
          ElNotification({
            message: 'An error occurred while updating the note.',
            type: 'error',
            duration: 2000,
            position: 'bottom-right',
          });
        } finally {
          this.isLoading = false;
        }
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
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-input,
  .el-button {
    width: 100%;
  }
  </style>
  