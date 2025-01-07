<template>
    <el-container>
      <el-header>
        <h1 class="title">Add Lead</h1>
      </el-header>
  
      <el-main>
        <el-form @submit.prevent="submitForm" ref="leadForm" label-width="150px">
          <el-form-item label="Company">
            <el-input v-model="company" placeholder="Enter company name" name="company" />
          </el-form-item>
  
          <el-form-item label="Contact Person">
            <el-input v-model="contact_person" placeholder="Enter contact person's name" name="contact_person" />
          </el-form-item>
  
          <el-form-item label="Email">
            <el-input v-model="email" type="email" placeholder="Enter email address" name="email" />
          </el-form-item>
  
          <el-form-item label="Phone">
            <el-input v-model="phone" placeholder="Enter phone number" name="phone" />
          </el-form-item>
  
          <el-form-item label="Website">
            <el-input v-model="website" placeholder="Enter website URL" name="website" />
          </el-form-item>
  
          <el-form-item label="Confidence">
            <el-input-number v-model="confidence" :min="0" :max="100" placeholder="Enter confidence level" name="confidence" />
          </el-form-item>
  
          <el-form-item label="Estimated Value">
            <el-input-number v-model="estimated_value" :min="0" placeholder="Enter estimated value" name="estimated_value" />
          </el-form-item>
  
          <el-form-item label="Status">
            <el-select v-model="status" placeholder="Select status" name="status">
              <el-option label="New" value="new" />
              <el-option label="Contacted" value="contacted" />
              <el-option label="In Progress" value="inprogress" />
              <el-option label="Lost" value="lost" />
              <el-option label="Won" value="won" />
            </el-select>
          </el-form-item>
  
          <el-form-item label="Priority">
            <el-select v-model="priority" placeholder="Select priority" name="priority">
              <el-option label="Low" value="low" />
              <el-option label="Medium" value="medium" />
              <el-option label="High" value="high" />
            </el-select>
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
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "AddLead",
  setup() {
    const company = ref<string>("");
    const contact_person = ref<string>("");
    const email = ref<string>("");
    const phone = ref<string>("");
    const website = ref<string>("");
    const confidence = ref<number>(0);
    const estimated_value = ref<number>(0);
    const status = ref<string>("new");
    const priority = ref<string>("medium");

    const submitForm = async () => {
      try {
        // Start loading
        this.$store.commit("setIsLoading", true);

        // Prepare lead data
        const lead = {
          company: company.value,
          contact_person: contact_person.value,
          email: email.value,
          phone: phone.value,
          website: website.value,
          confidence: confidence.value,
          estimated_value: estimated_value.value,
          status: status.value,
          priority: priority.value,
        };

        // Send data to API
        await axios.post("/api/v1/leads/", lead);

        // Show success message
        ElMessage({
          message: "The lead was added successfully.",
          type: "success",
        });

        // Navigate to leads list
        this.$router.push("/dashboard/leads");
      } catch (error) {
        console.error(error);
        ElMessage({
          message: "Failed to add the lead. Please try again.",
          type: "error",
        });
      } finally {
        // Stop loading
        this.$store.commit("setIsLoading", false);
      }
    };

    return {
      company,
      contact_person,
      email,
      phone,
      website,
      confidence,
      estimated_value,
      status,
      priority,
      submitForm,
    };
  },
});
</script>
