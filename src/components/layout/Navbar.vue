<template>
    <el-header class="navbar is-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <strong>LetsConnect</strong>
            </router-link>
        </div>

        <el-menu mode="horizontal" class="navbar-menu" :router="true">
        <div class="navbar-end">
            <template v-if="$store.state.isAuthenticated">
                <el-menu-item index="/dashboard/leads">Leads</el-menu-item>
                <el-menu-item index="/dashboard/clients">Clients</el-menu-item>
                <el-menu-item index="/dashboard/team">Team</el-menu-item>
            </template>

            <div class="navbar-item buttons">
            <template v-if="!$store.state.isAuthenticated">
                <el-button type="success" class="button">
                    <router-link to="/sign-up"><strong>Sign up</strong></router-link>
                </el-button>
                <el-button type="primary" plain class="button">
                <router-link to="/log-in">Log in</router-link>
                </el-button>
            </template>

                <template v-else>
                    <el-button type="info" class="button">
                    <router-link to="/dashboard/my-account">My Account</router-link>
                    </el-button>
                </template>
            </div>
        </div>
        </el-menu>
  </el-header>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: #333; /* Replace with your preferred dark color */
  color: #fff;
}

.navbar-brand .navbar-item {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-end {
  display: flex;
  align-items: center;
}

.buttons .el-button {
  margin-left: 8px;
}

.buttons a {
  color: inherit;
  text-decoration: none;
}
</style>