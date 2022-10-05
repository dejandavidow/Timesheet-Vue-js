<template>
  <div v-if="loaded">
    <div class="accordion accordion-flush border" id="accordionFlushExample">
      <div v-for="client in clients" class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#a${client.id}`"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            {{ client.clientname }}
          </button>
        </h2>
        <div
          :id="`a${client.id}`"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <n-form inline :label-width="80">
              <n-form-item label="Client name">
                <n-input v-model:value="client.clientname" />
              </n-form-item>
              <n-form-item label="Adress">
                <n-input v-model:value="client.adress" />
              </n-form-item>
              <n-form-item label="City">
                <n-input v-model:value="client.city" />
              </n-form-item>
              <n-form-item label="Postal Code">
                <n-input v-model:value="client.postalcode" />
              </n-form-item>
              <n-form-item label="Country">
                <n-input v-model:value="client.country" />
              </n-form-item>
              <n-form-item>
                <n-button
                  type="primary"
                  @click="updateClient(client.id, client)"
                >
                  Update
                </n-button>
                <n-button
                  class="mleft"
                  type="error"
                  @click="deleteClient(client.id)"
                >
                  Delete
                </n-button>
              </n-form-item>
            </n-form>
          </div>
        </div>
      </div>
    </div>
    <n-pagination class="mt-3" v-model:page="page" :page-count="pagecount" />
  </div>
  <div v-else class="d-flex justify-content-center">
    <n-spin size="large" />
  </div>
  <div v-if="clientsChangeds">
    <n-result status="success" title="Success">
    <template #footer>
    </template>
  </n-result>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clients: [],
      loaded: false,
      page: 1,
      pagecount: 1,
    };
  },
  props: {
    clientsChanged: Boolean,
    setChanged: Function,
    searchTerm: String,
    setTerm: Function,
  },
  methods: {
    async getClients() {
      await fetch(`http://127.0.0.1:8000/api/Clients?page=${this.page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.clients = res.data;
          this.pagecount = Math.ceil(res.total / 5);
          this.loaded = true;
        });
    },
    async updateClient(id, body) {
      await fetch(`http://127.0.0.1:8000/api/Clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    async deleteClient(id) {
      await fetch(`http://127.0.0.1:8000/api/Clients/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((res) => this.setChanged(true));
      setTimeout(() => {
        this.setChanged(false);
      }, 2000);
    },
    async SearchClients() {
      await fetch(
        `http://127.0.0.1:8000/api/Search/Clients?page=${this.page}&search=${this.searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.clients = res.data;
          this.pagecount = Math.ceil(res.total / 5);
          this.loaded = true;
        });
    },
  },
  mounted() {
    this.getClients();
  },
  watch: {
    clientsChanged() {
      if (this.clientsChanged === true) this.getClients();
    },
    page() {
      this.getClients();
    },
    searchTerm() {
      this.SearchClients();
    },
  },
};
</script>

<style scoped>
.listcolor {
  background-color: whitesmoke;
}

.border {
  border: 1px solid black;
}

.mleft {
  margin-left: 20px;
}
</style>
