$(document).ready(function(){

//Intializing global variables for saving activies to local storage
var localActivities = localStorage.getItem("activities");
var activities = [];
if(localActivities !== null && localActivities !== ""){
    activities = JSON.parse(localActivities);
} 


//Set todays date at top of page
var day = moment().format('MMMM Do');
var dayOfWeek = moment(day, 'MMMM Do').format('dddd');
$("#currentDay").html(dayOfWeek + ", " + day);
//sets current date
createTimeSlots();
//calls function to write activities for this day to the page
writeActivities();

//creates the daily timeslots on the page starting from 9am until 5 pm. Sets classes based on if it's the current, past, or future hour/day
function createTimeSlots(){
    var hr = 9;
    var cls = "";
    $(".timeSlots").html("");

    while(hr < 18){
        var currHour = moment().hour();
        var calDayFormat = moment(day, 'MMMM Do');

        if(moment().format('MMMM Do') === day){
            if((hr - currHour) < 0){
                cls = "past";
            } else if(hr === currHour){
                cls = "present";
            } else{
                cls = "future";
            }
        } else if(moment().isBefore(calDayFormat)) {
            cls = "future";
        } else{
            cls = "past";
        }

        $('.timeSlots').append(`
            <div class="input-group timeSlot">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="${hr}">${moment().hour(hr).format('h a')}</span>
                </div>
                <textarea class="form-control event ${cls} ${hr}" id="event" aria-label="With textarea"></textarea>
                <div class="input-group-append">
                <button class="input-group-text bg-primary text-white" id="save">Save</button>
            </div>
            </div>`);
        hr++;
    }
}

//sets necessary values for a new item to be added, calls new activity to add to the array
$('.timeSlots').on("click", '#save', function(){
    var item = $(this).closest(".timeSlot").find("textarea[id='event'").val();
    var hour = $(this).closest(".timeSlot").find("span").attr('id');
    var day = $('#currentDay').text();
    addNewActivity(item, hour, day);
    
});

//creates a new variable to be added to the array, first checks if something already exists in the array, so it can be removed and new one added
function addNewActivity(it, hr, dy){
        var newToDo = {
        id: dy + hr,
        day: dy,
        hour: hr,
        text: it
    };
    var arrayIndex = activities.findIndex(x => x.id === newToDo.id);
    if (arrayIndex > -1){
        activities.splice(arrayIndex, 1);
    }
    activities.push(newToDo);
    localStorage.setItem("activities", JSON.stringify(activities));
}

//writes the activities of the day to the page upon load
//set to only add itmes for this particular day
function writeActivities(){
    for(act of activities){
        if(act.day === $('#currentDay').text()){
            var id = "." + act.hour;
            $(id).text(act.text);
        } 
    }
}

//move calendar back on day to see past events, creates time slots and writes items for that day
$('#back').on('click', function(){
    day = moment(day, 'MMMM Do').subtract(1, 'days').format('MMMM Do');
    dayOfWeek = moment(day, 'MMMM Do').format('dddd');
    $("#currentDay").html(dayOfWeek + ", " + day);
    createTimeSlots();
    writeActivities();
});

//move calendar forward a day, creates time slots for that day and writes items for that day
$('#forward').on('click', function(){
    day = moment(day, 'MMMM Do').add(1, 'days').format('MMMM Do');
    dayOfWeek = moment(day, 'MMMM Do').format('dddd');
    $("#currentDay").html(dayOfWeek + ", " + day);
    createTimeSlots();
    writeActivities();
});

});