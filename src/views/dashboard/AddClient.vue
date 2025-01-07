<template>
    <el-container>
      <el-header>
        <h1 class="title">Add Client</h1>
      </el-header>
  
      <el-main>
        <el-form @submit.prevent="submitForm" ref="clientForm" label-width="150px">
          <el-form-item label="Name">
            <el-input
              v-model="name"
              placeholder="Enter client name"
              name="name"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="Contact Person">
            <el-input
              v-model="contact_person"
              placeholder="Enter contact person name"
              name="contact_person"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="Email">
            <el-input
              v-model="email"
              type="email"
              placeholder="Enter email address"
              name="email"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="Phone">
            <el-input
              v-model="phone"
              placeholder="Enter phone number"
              name="phone"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="Website">
            <el-input
              v-model="website"
              placeholder="Enter website URL"
              name="website"
            ></el-input>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" native-type="submit">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AddClient",
  setup() {
    const name = ref<string>("");
    const contact_person = ref<string>("");
    const email = ref<string>("");
    const phone = ref<string>("");
    const website = ref<string>("");

    const submitForm = async () => {
      try {
        // Start loading
        this.$store.commit("setIsLoading", true);

        // Prepare client data
        const client = {
          name: name.value,
          contact_person: contact_person.value,
          email: email.value,
          phone: phone.value,
          website: website.value,
        };

        // Send data to API
        await axios.post("/api/v1/clients/", client);

        // Show success toast
        this.$message({
          message: "The client was added successfully.",
          type: "success",
        });

        // Navigate to clients list
        this.$router.push("/dashboard/clients");
      } catch (error) {
        console.error(error);
        this.$message({
          message: "Failed to add the client. Please try again.",
          type: "error",
        });
      } finally {
        // Stop loading
        this.$store.commit("setIsLoading", false);
      }
    };

    return {
      name,
      contact_person,
      email,
      phone,
      website,
      submitForm,
    };
  },
});
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
