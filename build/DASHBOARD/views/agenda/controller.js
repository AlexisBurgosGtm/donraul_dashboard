async function fcnIniciarVista(){
    await IniciarAgenda();
}

var calendar;

async function IniciarAgenda(){
    var todayDate = moment().startOf('day');
    var YM = todayDate.format('YYYY-MM');
    var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
    var TODAY = todayDate.format('YYYY-MM-DD');
    var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

    
  
        var calendarEl = document.getElementById('calendar');

        calendar = new FullCalendar.Calendar(calendarEl,
        {
            plugins: ['dayGrid', 'list', 'timeGrid', 'interaction', 'bootstrap'],
            themeSystem: 'bootstrap',
            timeZone: 'UTC',
            dateAlignment: "month", //week, month
            buttonText:
            {
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Dia',
                list: 'Listado'
            },
            eventTimeFormat:
            {
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
            },
            navLinks: true,
            header:
            {
                left: 'prev,next todays',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            footer:
            {
                left: '',
                center: '',
                right: ''
            },
            //height: 700,
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            selectHelper: true,
            select: function(start, end) {
                $('#modalNuevoEvento').modal('show');
                console.log(start);

                /*
                let ins = document.getElementById('txtInicio');
                ins.value = start.startStr;
                */
                var date = new Date(start.startStr + 'T10:30:00');

                calendar.addEvent(
                    {
                        title: 'dynamic event',
                        start: date,
                        end: date,
                        allDay: false,
                        className: "border-warning bg-warning text-dark",//"border-warning bg-warning text-dark","bg-primary border-primary text-white","bg-success border-success text-white"
                        url:'http://localhost:3333',
                        id:1
                    });
            },
            events: [
            {
                title: 'All Day Event',
                start: YM + '-01',
                description: 'This is a test description', //this is currently bugged: https://github.com/fullcalendar/fullcalendar/issues/1795
                className: "border-warning bg-warning text-dark",
                id: 25
            },
            {
                title: 'Reporting',
                start: YM + '-14T13:30:00',
                end: YM + '-14',
                className: "bg-white border-primary text-primary"
            },
            {
                title: 'Company Trip',
                start: YM + '-02',
                end: YM + '-03',
                className: "bg-primary border-primary text-white"
            },
            {
                title: 'NextGen Expo 2019 - Product Release',
                start: YM + '-03',
                end: YM + '-05',
                className: "bg-info border-info text-white"
            },
            {
                title: 'Dinner',
                start: YM + '-12',
                end: YM + '-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: YM + '-09T16:00:00',
                className: "bg-danger border-danger text-white"
            },
            {
                id: 1000,
                title: 'Repeating Event',
                start: YM + '-16T16:00:00'
            },
            {
                title: 'Conference',
                start: YESTERDAY,
                end: TOMORROW,
                className: "bg-success border-success text-white"
            },
            {
                title: 'Meeting',
                start: TODAY + 'T10:30:00',
                end: TODAY + 'T12:30:00',
                className: "bg-primary text-white border-primary"
            },
            {
                title: 'Lunch',
                start: TODAY + 'T12:00:00',
                className: "bg-info border-info"
            },
            {
                title: 'Meeting',
                start: TODAY + 'T14:30:00',
                className: "bg-warning text-dark border-warning"
            },
            {
                title: 'Happy Hour',
                start: TODAY + 'T17:30:00',
                className: "bg-success border-success text-white"
            },
            {
                title: 'Dinner',
                start: TODAY + 'T20:00:00',
                className: "bg-danger border-danger text-white"
            },
            {
                title: 'Birthday Party',
                start: TOMORROW + 'T07:00:00',
                className: "bg-primary text-white border-primary text-white"
            },
            {
                title: 'Gotbootstrap Meeting',
                url: 'http://gotbootstrap.com/',
                start: YM + '-28',
                className: "bg-info border-info text-white"
            }],
            eventClick:  function(info) {
                
                console.log(info);
                
                let d = info.event.start;
                //$('#calendarModal .js-event-url').attr('href',info.event.url);
                //$('#calendarModal').modal();
                console.log(info.event.className);
                console.log(info.event.title);
                console.log(info.event.description);
                console.log(info.event.url);
                console.log(info.event.start.getUTCHours());
            },
            /*viewRender: function(view) {
                localStorage.setItem('calendarDefaultView',view.name);
                $('.fc-toolbar .btn-primary').removeClass('btn-primary').addClass('btn-outline-secondary');
            },*/
        });

        calendar.render();
 
}