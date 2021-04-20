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

//current date at top of calendar
$("#currentDay").html(function () {
    return moment().format("dddd, MMMM Do")
});


//push tasks to array
$(".row").on("click", "a", function (){
    // console.log("parent", $(".row"));
    // console.log("clicktop", $(this));
    //turn into variables
    //save to local storage with parent id as key
    //save input value 
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
    console.log(tasks)
});

//save tasks in localstorage
var saveTasks = function () {
    localStorage.setItem("savedTasks", JSON.stringify(tasks));
}

//retrieve tasks from localstorage
var loadTasks = function () {
    storedTasks = JSON.parse(localStorage.getItem("savedTasks"));

    if(!storedTasks) {
        tasks = []
    }

    for (var i = 0; i < storedTasks.length; i++) {
        selectedTaskRow = storedTasks[i].time
        selectedTaskText = storedTasks[i].event
        rowEl = $('#' + selectedTaskRow);
        $(rowEl).children("textarea").html(function () {
        return selectedTaskText})}
        console.log(rowEl)
   }


// load tasks for the first time
loadTasks();
