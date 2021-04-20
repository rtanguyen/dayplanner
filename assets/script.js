//current date at top of calendar
$("#currentDay").html(function () {
    return moment().format("dddd, MMMM Do")
});


