<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap-icons/font/bootstrap-icons.css";
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        height: "600px",
        hiddenDays: [0],
        headerToolbar: {
          left: "prev",
          right: "next",
          center: "title",
        },
        footerToolbar: {
          left: "dayGridMonth",
          right: "dayGridWeek",
        },
        themeSystem: "bootstrap",
        selectable: true,
        events: "http://127.0.0.1:8000/api/Timesheets/",
        eventClassNames: "event",
        eventTextColor: "black",
        select: this.handleDateSelect,
      },
      date: "",
      showModal: false,
      time: "",
      overtime: "",
      description: "",
      categoryid: "",
      clientid: "",
      projectid: "",
      categories: [],
      clients: [],
      projects: [],
      loaded: false,
      createdTS: false,
    };
  },
  methods: {
    handleDateSelect(e) {
      this.date = e.startStr;
      this.showModal = true;
    },
    async getClients() {
      await fetch(`http://127.0.0.1:8000/api/Clients`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((x) => x.json())
        .then((res) => {
          this.clients = res.data;
        });
    },
    async handleCategories() {
      await fetch(`http://127.0.0.1:8000/api/Categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((x) => x.json())
        .then((res) => {
          this.categories = res.data;
        });
    },
    async getProjects() {
      fetch("http://127.0.0.1:8000/api/Projects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => (this.projects = res));
    },
    async createTimesheet() {
      await fetch("http://127.0.0.1:8000/api/Timesheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: this.description,
          time: this.time,
          overtime: this.overtime,
          date: this.date,
          project_id: this.projectid,
          category_id: this.categoryid,
          client_id: this.clientid,
        }),
      }).then((x) => {
        this.createdTS = true;
        this.loaded = true;
        this.showModal = false;
      });
      // const req ={
      //   description:this.description,
      //     time:this.time,
      //     overtime:this.overtime,
      //     date:this.date,
      //     projectid:this.projectid,
      //     categoryid:this.categoryid,
      //     clientid:this.clientid
      // }
      // console.log(req);
    },
  },
  watch: {
    createdTS() {},
  },
};
</script>
<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent="arg">
      <div :class="arg.event.extendedProps.time > 5 ? 'green' : 'red'">
        <b>Hours:{{ arg.event.extendedProps.time }}</b>
      </div>
    </template>
  </FullCalendar>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="New Timesheet"
      :bordered="false"
      size="large"
      role="dialog"
      aria-modal="true"
    >
      <n-form inline :label-width="80">
        <n-space vertical>
          <n-form-item label="Description">
            <n-input v-model:value="description" />
          </n-form-item>
          <n-form-item label="Hours">
            <n-input v-model:value="time" />
          </n-form-item>
          <n-form-item label="Overhours">
            <n-input v-model:value="overtime" />
          </n-form-item>
          <n-form-item label="Project">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="projectid"
              @click="getProjects"
            >
              <option selected>Open this select menu</option>
              <option v-for="project in projects" :value="project.id">
                {{ project.projectname }}
              </option>
            </select>
          </n-form-item>
          <n-form-item label="Category">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="categoryid"
              @click="handleCategories"
            >
              <option selected>Open this select menu</option>
              <option v-for="category in categories" :value="category.id">
                {{ category.categoryname }}
              </option>
            </select>
          </n-form-item>
          <n-form-item label="Client">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="clientid"
              @click="getClients"
            >
              <option selected>Open this select menu</option>
              <option v-for="client in clients" :value="client.id">
                {{ client.clientname }}
              </option>
            </select>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="createTimesheet">
              Create
            </n-button>
          </n-form-item>
        </n-space>
      </n-form>
    </n-card>
  </n-modal>
</template>
<style>
.event {
  background: none;
  border: none;
}
.green {
  background-color: lightgreen;
  padding: 8px 0px;
}
.red {
  padding: 8px 0px;
  background-color: red;
}
</style>
