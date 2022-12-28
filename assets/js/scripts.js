var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];

//each object has a hour property and a text property

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");


//Display the current date at the top of the application 
$currentDay.text(currentDate); 

// Colour code the time block based on the curent time - using css classes? 
$timeBlocks.each(function(){
  var $thisBlock = $(this);
  var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

  if( thisBlockHr == currentHour){
    $thisBlock.addClass("present").removeClass("past future");
  }

  if (thisBlockHr < currentHour){
    $thisBlock.addClass("past").removeClass("present future");
  }

  if (thisBlockHr > currentHour){
    $thisBlock.addClass("future").removeClass("past present");
  }
});


/*var todos = localStorage.getItem("todos");
var parsedTodos = JSON.parse(todos);
console.log(parsedTodos);*/
function initializeTodos(){
    //just in case we want to update with more timeblock, i will not hardcode timeblocks num here
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var toDoObject = {};
      toDoObject.hour = parseInt($thisBlock.attr("data-hour"));
      toDoItems.push(toDoObject);
    }); //this might not be the best bc this is will be set if theres nothing in local storage... but if there IS something in local storage.
  
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    //console.log(toDoItems);
  }

  function renderSchedule(){toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  //loop thru array then assign the text to the timeBlock with data-hour equal to hour. 
  //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
    console.log(itemHour + "|" + itemText);
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

}

function saveHandler(){
    //event.preventDefault();
    if (event.target.matches("button")){
      var hourToUpdate = event.target.parentElement.getAttribute("data-hour");
      var itemToAdd = (($(event.target).parent()).children("textarea")).val();
      //i was having issues bc i was mixing javascript selectors with jquery functions... lets fix his
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

}

//add event listener to buttons
$().ready(function(){
  //initializeTodos();
  renderSchedule();
  $scheduleArea.click(saveHandler);

});

// Colour code the time block based on the curent time - using css classes? 

// allow the user to add text to the textarea 

//save the event via local storage


//Bring any data from localStorage into the timeblocks when the page loads


