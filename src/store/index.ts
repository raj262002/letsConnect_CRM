import { createStore } from 'vuex';

// Define types for the state
interface User {
  id: number;
  username: string;
}

interface Team {
  id: number;
  name: string;
  plan: string;
  max_leads: number;
  max_clients: number;
}

interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string;
  user: User;
  team: Team;
}

// Initial state with type annotations
const state: State = {
  isLoading: false,
  isAuthenticated: false,
  token: '',
  user: {
    id: 0,
    username: '',
  },
  team: {
    id: 0,
    name: '',
    plan: '',
    max_leads: 0,
    max_clients: 0,
  },
};

// Vuex store
const store = createStore<State>({
  state,
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token') || '';
        state.isAuthenticated = true;
        state.user.username = localStorage.getItem('username') || '';
        state.user.id = Number(localStorage.getItem('userid')) || 0;
        state.team.name = localStorage.getItem('team_name') || '';
        state.team.id = Number(localStorage.getItem('team_id')) || 0;
        state.team.plan = localStorage.getItem('team_plan') || '';
        state.team.max_leads = Number(localStorage.getItem('team_max_leads')) || 0;
        state.team.max_clients = Number(localStorage.getItem('team_max_clients')) || 0;
      } else {
        state.token = '';
        state.isAuthenticated = false;
        state.user.id = 0;
        state.user.username = '';
        state.team.id = 0;
        state.team.name = '';
        state.team.plan = '';
        state.team.max_leads = 0;
        state.team.max_clients = 0;
      }
    },
    setIsLoading(state, status: boolean) {
      state.isLoading = status;
    },
    setToken(state, token: string) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = '';
      state.isAuthenticated = false;
    },
    setUser(state, user: User) {
      state.user = user;
    },
    setTeam(state, team: Team) {
      state.team = team;

      localStorage.setItem('team_id', team.id.toString());
      localStorage.setItem('team_name', team.name);
      localStorage.setItem('team_plan', team.plan);
      localStorage.setItem('team_max_leads', team.max_leads.toString());
      localStorage.setItem('team_max_clients', team.max_clients.toString());
    },
  },
  actions: {},
  modules: {},
});

export default store;
