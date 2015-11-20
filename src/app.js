/**
 * IoT Control Watch 
 *
 * Lex Dreitser
 */
var ajax = require('ajax');
//var Clock = require('clock');
//var Accel = require('ui/accel');
var UI = require('ui');
//var Vector2 = require('vector2');
var Vibe = require('ui/vibe');


var DEVICE_ID = "54ff6d066672524815131267";//FROM SPARKCORE IDE
var ACCESS_TOKEN = "7ed9f984ddc9ad8d5de336f5a679f45763b55385";//FROM SPARKCORE IDE

/**
Accel.init();  
Accel.on('data', function(e) {
  console.log('Just received ' + e.samples + ' from the accelerometer.');
}); 
*/

var showResponse = new UI.Card({
  title:'Response',
  subtitle:'fetching....', 
  scrollable:true
});

function DoPost(function_name,function_value){
  //make url based on function being called and device tokens
  var URL = 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/' + function_name +'?access_token=' + ACCESS_TOKEN; //identify which sparkcore and function
  
  //log data being used
  console.log("function_name: " + function_name);
  console.log("function_value: " + function_value);
  console.log("URL: " + URL);
  
  ajax(
    {
      url: URL,
      method: 'post',
      type: 'json',
      data: { "args": function_value} //string to send to the sparkcore function, can be named whatever
    },
    function(data) {
      // Success
      console.log("Success: " + JSON.stringify(data));
      Vibe.vibrate('short');
      
      //setTimeout(GetIsClosed(), 30000);
    },
    function(error) {
      // Failure
      console.log('Failed: ' + error.toString());
      Vibe.vibrate('long');
    }
  );
}
function DoGet(function_name){
  console.log("DoGet(): " + new Date().getTime());  
  
  //make url based on function being called and device tokens
  var URL = 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/' + function_name +'?access_token=' + ACCESS_TOKEN; //identify which sparkcore and function
  
  //log data being used
  console.log("function_name: " + function_name);
  console.log("URL: " + URL);
  
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success
      console.log("Success: " + JSON.stringify(data));
      Vibe.vibrate('short');
      showResponse.title('GET Response'+function_name);
      showResponse.subtitle('Result = ' + JSON.stringify(data.result));
      showResponse.body(JSON.stringify(data));
      showResponse.show();
    },
    function(error) {
      // Failure
      console.log('Failed: ' + error.toString());
      Vibe.vibrate('long');
    }
    
  );
  
  console.log("Comleted DoGet(): " + new Date().getTime());  
}


var controls = [
  {
    title: "Sprinkler Status",
    subtitle: "Check Status of UberSprinkler System"
  },
  {
    title: "Core Status",
    subtitle: "CHeck Status of Core"
  }
];


var ubersprinklerMenu = new UI.Menu({
  sections: [{
    title: 'UberSprinkler',
    items: controls
  }]
});

ubersprinklerMenu.show();

// Ubersprinkler Menu
ubersprinklerMenu.on('select', function(event) {
   if(event.itemIndex ===0){
     DoGet('station');
   }else if(event.itemIndex ===1){
     DoGet('');
   }
});
