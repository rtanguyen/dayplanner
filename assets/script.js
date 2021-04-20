var tasks = [];
var eventText = ""
var taskIndex = ""
var eventTime = ""


//current date at top of calendar
$("#currentDay").html(function () {
    return moment().format("dddd, MMMM Do")
});


//create task
$(".row").on("blur", "textarea", function () {
    eventText = $(this).val().trim();
    console.log(eventText)
    taskIndex = $(this).closest(".row").index();
    eventTime = $(this).closest(".row").attr("id");
    // console.log(index)
    // console.log(eventTime)
});


//push tasks to array
$(".row").on("click", ".saveBtn", function (){
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
    console.log(tasks)
});

//save tasks in localstorage
var saveTasks = function () {
    localStorage.setItem("savedTasks", JSON.stringify(tasks));
}

//retrieve tasks from localstorage
var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("savedTasks"));
    console.log(tasks)
    $.each(tasks, function() {
        $("#tasks[taskIndex].time").children("textarea").html(tasks[taskIndex].event);
    })
};



// load tasks for the first time
// loadTasks();
