// var gpio = require("pi-gpio");
var gpio = require('node-gpio');
//
// gpio.open(11, "output", function(err) {
//     gpio.write(11, 1, function() {
//         setTimeout(function() {
//             gpio.close(11);
//         }, 5000);
//     });
// });

function waitAndDo(times, funct) {
  if(times < 1) {
    return;
  }

  setTimeout(function() {
    funct(times, arguments.slice(2))
    waitAndDo(times-1, funct, arguments.slice(2));
  }, 1000);
}

function myFun(times, led, x){
    led.dutyCycle = x - times;
}

var PWM = gpio.PWM;

var led = new PWM("11");
led.open();
led.setMode(gpio.OUT);
led.frequency = 100;
led.dutyCycle = 50;
led.start();
waitAndDo(100, myFun, led, x);
led.stop();
