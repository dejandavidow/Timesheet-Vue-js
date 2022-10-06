<template>
  <div>
    <n-data-table :columns="columns" :data="reports" />
    <div class="bgtotal mt-5">
      <p class="totalcolors">Total:{{totalhours}}</p>
    </div>
  </div>
</template>

<script>
  const totalTimeHandler = (tsar) => {
    const timearray = [];
    {
      tsar.map((ts) => {
        return timearray.push(Number(ts.time));
      });
    }
    var sum = timearray.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  };
const createColumns = () => {
  return [
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Description",
      key: "description",
    },
    {
      title: "Time",
      key: "time",
    },
    {
      title: "Overtime",
      key: "overtime",
    },
    {
      title: "Category",
      key: "categoryname",
    },
    {
      title: "Project",
      key: "projectname",
    },
    {
      title: "Member",
      key: "name",
    },
  ];
};
export default {
  data() {
    return {
      reports: [],
      columns: createColumns(),
      totalhours:0
    };
  },
  methods: {
    async getTimesheets() {
      await fetch(`http://127.0.0.1:8000/api/Timesheets`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((x) => x.json())
        .then((res) => {
          this.reports = res;
          this.totalhours = totalTimeHandler(this.reports)
        });
    },
  },
  mounted() {
    this.getTimesheets();
  },
};
</script>

<style scoped>
  .bgtotal
  {
    background-color: whitesmoke;
    padding: 22px 0px;
  }
  .totalcolors
  {
    text-align: right;
    justify-content: right;
    color:orange;
    margin-right: 30px;
    font-weight: bold;
  }
</style>
