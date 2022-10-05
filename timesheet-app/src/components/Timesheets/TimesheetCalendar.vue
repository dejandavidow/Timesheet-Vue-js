<script>
    import '@fullcalendar/core/vdom' // solves problem with Vite
    import FullCalendar from '@fullcalendar/vue3'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import bootstrap5Plugin from "@fullcalendar/bootstrap5";
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
import TimesheetsVue from '@/views/Timesheets.vue';
    export default {
      components: {
        FullCalendar // make the <FullCalendar> tag available
      },
      data() {
        return {
          calendarOptions: {
            plugins: [ dayGridPlugin, interactionPlugin,bootstrap5Plugin ],
            initialView: 'dayGridMonth',
            height:"600px",
            hiddenDays:[0],
            headerToolbar:{
              left: "prev",
              right: "next",
              center: "title",
          },
            footerToolbar:{
              left: "dayGridMonth",
              right: "dayGridWeek",
            },
            themeSystem:"bootstrap5",
            selectable:true,
            eventsSources:[this.timesheets]
          },
          timesheets:[],
          eventContent:RenderContent
        }
      },
      methods: {
       async getTimesheets() {
            await fetch(`http://127.0.0.1:8000/api/Timesheets/`,{method:"GET",headers:{'Content-Type':'application/json'}})
            .then(res =>res.json())
            .then(res =>{
                this.timesheets = res.data;
            })
        },
        RenderContent()
        {
            return <p>Hours:</p>
        }
      },
      mounted () {
        this.getTimesheets();
      },
    }
    </script>
    <template>
      <FullCalendar :options="calendarOptions" />
    </template>