$(document).ready(function(){

$("#currentDay").html(moment().format('dddd') + ", " + moment().format('MMMM Do'));
createTimeSlots();

function createTimeSlots(){
    var hr = 9;
    var cls = "";

    while(hr < 22){
        var currHour = moment().hour();

        if((hr - currHour) < 0){
            cls = "past";
        } else if(hr === currHour){
            cls = "present"
        } else{
            cls = "future"
        }

        $('.timeSlots').append(`
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">${moment().hour(hr).format('h a')}</span>
                </div>
                <textarea class="form-control ${cls}" aria-label="With textarea"></textarea>
                <div class="input-group-append">
                <button class="input-group-text bg-primary text-white" id="save">Save</button>
            </div>
            </div>`);
        hr++;
    }
}


});