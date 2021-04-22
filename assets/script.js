var tasks = [];
var eventText = ""
var taskIndex = ""
var eventTime = ""
var storedTasks = []
var rowEl = ""
// $('"#"+ selectedTaskRow')
var textAreaEl = ""
var selectedTaskRow =""
var selectedTaskText = ""
var currentTime = parseInt(moment().format("k"))
var time = ""

//current date at top of calendar
$("#currentDay").html(function () {
    return moment().format("dddd, MMMM Do")
});


//push tasks to array
$(".row").on("click", "a", function (){
    eventText = $(this).siblings("textarea").val().trim();
    console.log(eventText)
    taskIndex = $(this).closest(".row").index();
    eventTime = $(this).closest(".row").attr("id");
    //check for task update. if updating, replace event of index in array
    // console.log(taskIndex)
    if (typeof tasks[taskIndex] === 'undefined') {
        tasks.push({
            event: eventText,
            time: eventTime
        });
    } else {
        tasks[taskIndex].event = eventText
    }
    saveTasks();
    console.log(tasks);
});

//save tasks in localstorage
var saveTasks = function () {
    localStorage.setItem("savedTasks", JSON.stringify(tasks));
}

//retrieve tasks from localstorage
var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("savedTasks"));

    if(!tasks) {
        tasks = []
    } else {
    for (var i = 0; i < tasks.length; i++) {
        selectedTaskRow = tasks[i].time
        selectedTaskText = tasks[i].event
        rowEl = $('#' + selectedTaskRow);
        $(rowEl).children("textarea").html(function () {
        return selectedTaskText})}
        // console.log(rowEl)
   }
}


setColor = function () {
    $("textarea").each(function () {
//reset background color at beginning of interval
    $(this).removeClass("past present future")

//grab time from id
    time = $(this).attr("id").replace("text-","")
    var textId = "text-" + time
    // console.log(textId);
    // console.log(currentTime)

//conditional formatting based on time
    if (time == currentTime) { 
        $('#' + textId).addClass('present');
    } else if (time > currentTime) {
        $('#' + textId).addClass('future');
    } else if (time < currentTime) {
        $('#' + textId).addClass('past');
}
})
}
//change color every hour
setInterval(function() {
    setColor();
    alert("hi");
}, (1000 * 60) * 60);

// load tasks for the first time
loadTasks();
setColor();