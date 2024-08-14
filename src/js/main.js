import $ from './lib/jquery-3.2.1.min';

var csInterface = new CSInterface();
// var socket = io.connect('http://localhost:9080');

// socket.on('toExtension', function (command) {
//   csInterface.evalScript(command);
//   //try typing app.activeDocument.close() in the browser
// });



var socket = io.connect('ws://localhost:10011');
// socket.on('clientReceiver', function(data)
// {
//   if( data.type == "completed" )
//   {
//     console.log("completedCode:" + data.clientId);

//     return;
//   }

//   console.log("connected completedCode:" + data.clientId);

// });