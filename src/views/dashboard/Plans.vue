<template>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="8" v-for="plan in plans" :key="plan.name">
          <el-card>
            <h2 class="subtitle">{{ plan.name }}</h2>
            <h4 class="is-size-3">{{ plan.price }}</h4>
  
            <p>{{ plan.maxClients }} Clients</p>
            <p>{{ plan.maxLeads }} Leads</p>
  
            <el-button type="primary" @click="subscribe(plan.planKey)">Subscribe</el-button>
          </el-card>
        </el-col>
      </el-row>
  
      <hr />
  
      <el-button type="danger" @click="cancelPlan">Cancel plan</el-button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { ElCard, ElButton, ElRow, ElCol, ElNotification } from 'element-plus';
  
  export default defineComponent({
    name: 'Plans',
    components: {
      ElCard,
      ElButton,
      ElRow,
      ElCol,
    },
    setup() {
      const pubKey = ref('');
      const stripe = ref<any>(null);
      const plans = ref([
        {
          name: 'Free',
          price: '$0',
          maxClients: 'Max 5 clients',
          maxLeads: 'Max 5 leads',
          planKey: 'free',
        },
        {
          name: 'Small team',
          price: '$10',
          maxClients: 'Max 15 clients',
          maxLeads: 'Max 15 leads',
          planKey: 'smallteam',
        },
        {
          name: 'Big team',
          price: '$25',
          maxClients: 'Max 50 clients',
          maxLeads: 'Max 50 leads',
          planKey: 'bigteam',
        },
      ]);
  
      const getPubKey = async () => {
        try {
          const response = await axios.get('/api/v1/stripe/get_stripe_pub_key/');
          pubKey.value = response.data.pub_key;
          stripe.value = Stripe(pubKey.value);
        } catch (error) {
          console.error('Error fetching public key:', error);
        }
      };
  
      const cancelPlan = async () => {
        try {
          const response = await axios.post('/api/v1/teams/cancel_plan/');
          const { id, name, plan } = response.data;
          const teamData = {
            id,
            name,
            plan: plan.name,
            maxLeads: plan.max_leads,
            maxClients: plan.max_clients,
          };
          // Update Vuex state if necessary
          // this.$store.commit('setTeam', teamData);
  
          ElNotification({
            title: 'Success',
            message: 'The plan was cancelled!',
            type: 'success',
            duration: 2000,
          });
  
          // Assuming route change
          // this.$router.push('/dashboard/team');
        } catch (error) {
          console.error('Error canceling plan:', error);
  
          ElNotification({
            title: 'Error',
            message: 'Something went wrong while cancelling the plan.',
            type: 'error',
            duration: 2000,
          });
        }
      };
  
      const subscribe = async (planKey: string) => {
        try {
          const response = await axios.post('/api/v1/stripe/create_checkout_session/', { plan: planKey });
          await stripe.value.redirectToCheckout({ sessionId: response.data.sessionId });
        } catch (error) {
          console.error('Error during subscription:', error);
  
          ElNotification({
            title: 'Error',
            message: 'Something went wrong during the subscription process.',
            type: 'error',
            duration: 2000,
          });
        }
      };
  
      onMounted(() => {
        getPubKey();
      });
  
      return {
        plans,
        cancelPlan,
        subscribe,
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .subtitle {
    font-weight: bold;
  }
  
  .el-card {
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  