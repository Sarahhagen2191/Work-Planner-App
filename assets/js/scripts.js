var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];


//Display the current date at the top of the application 
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//if we don't have any todos set up, let's set up the array of objects
function initializeSchedule(){

//for each time block
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      //set related todo hour to same as data-hour
      hour: thisBlockHr,
      //get text ready to accept string input
      text: "",
    }
    //add this todo object to todoitems array
    toDoItems.push(todoObj);
  });

  localStorage.setItem("todos", JSON.stringify(toDoItems));
}


function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      // Colour code the time block based on the curent time 
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}


function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  //see which item we need to update based on the hour of the button clicked matching
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// when the document loads
$(document).ready(function(){
  setUpTimeBlocks();
  if(!localStorage.getItem("todos")){
    initializeSchedule();
  } 
  $currentDay.text(currentDate);
  renderSchedule();
  $scheduleArea.on("click", "button", saveHandler);
  
});