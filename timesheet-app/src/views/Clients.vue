<template>
  <div>
    <h1 class="display-6">Clients</h1>
    <ClientsHeader
      :clientsChanged="clientsChanged"
      :setChanged="setChanged"
      :searchTerm="searchTerm"
      :setTerm="setTerm"
    />
    <ClientsList
      :clientsChanged="clientsChanged"
      :setChanged="setChanged"
      :searchTerm="searchTerm"
      :setTerm="setTerm"
    />
  </div>
</template>

<script>
import ClientsHeader from "../components/Clients/ClientsHeader.vue";
import ClientsList from "../components/Clients/ClientsList.vue";
export default {
  components: { ClientsHeader, ClientsList },
  data() {
    return {
      clientsChanged: false,
      searchTerm: "",
    };
  },
  methods: {
    setChanged(c) {
      this.clientsChanged = c;
    },
    setTerm(c) {
      this.searchTerm = c;
    },
  },
};
</script>

<style scoped></style>
