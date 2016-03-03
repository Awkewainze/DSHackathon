var gpio = require("pi-gpio");

gpio.open(11, "output", function(err) {
    gpio.write(11, 1, function() {
        setTimeout(function() {
        }, 5000);
        gpio.close(11);
    });
});
