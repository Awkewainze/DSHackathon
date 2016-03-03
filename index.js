var gpio = require("pi-gpio");

gpio.open(11, "output", function(err) {
    gpio.write(11, 1, function() {
        gpio.close(11);
    });
});

setTimeout(function() {
}, 5000);
