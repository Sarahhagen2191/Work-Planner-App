//Display the current date at the top of the application 
var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
console.log(currentHour);
currentHour = 13;

// Create the time blocks for each hour of the working day 9 - 5
$currentDay.text(currentDate); 

$timeBlocks.each(function(){
  var $thisBlock = $(this);
  console.log($thisBlock.attr("data-hour"));
  console.log(currentHour);

  if( $thisBlock.attr("data-hour") == currentHour){
    $thisBlock.addClass("present").removeClass("past future");
  }
  if ($thisBlock.attr("data-hour") < currentHour){
    $thisBlock.addClass("past").removeClass("present future");
  }
  if ($thisBlock.attr("data-hour") > currentHour){

    $thisBlock.addClass("future").removeClass("past present");
  }
});



// Colour code the time block based on the curent time - using css classes? 

// allow the user to add text to the textarea 

//save the event via local storage


//Bring any data from localStorage into the timeblocks when the page loads






// var thisMoment = moment().format();
// console.log(moment());
// console.log(thisMoment);