import RPi.GPIO as GPIO
from time import sleep

class Color:
    def __init__(self, r, g, b):
        self.r = float(r)
        self.g = float(g)
        self.b = float(b)

class Colors:
    def __init__(self):
        self.off = Color(0, 0, 0)
        self.red = Color(20, 0, 0)
        self.green = Color(0, 20, 0)
        self.blue = Color(0, 0, 20)
        self.orange = Color(25, 1, 0)
        self.pink = Color(50, 0, 0.1)
        self.turquoise = Color(0, 50, 10)
        self.aqua = Color(20, 20, 20)
        self.light_blue = Color(15, 25, 55)

class Light:
    def __init__(self):
        self.led_gpio_red = 17 # red
        self.led_gpio_green = 27 # green
        self.led_gpio_blue = 22 # blue
        self.r = 0.0
        self.g = 0.0
        self.b = 0.0
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.led_gpio_red, GPIO.OUT)
        GPIO.setup(self.led_gpio_green, GPIO.OUT)
        GPIO.setup(self.led_gpio_blue, GPIO.OUT)
        GPIO.output(self.led_gpio_red, True)
        GPIO.output(self.led_gpio_green, True)
        GPIO.output(self.led_gpio_blue, True)
        self.pwm_red = GPIO.PWM(self.led_gpio_red, 100)
        self.pwm_green = GPIO.PWM(self.led_gpio_green, 100)
        self.pwm_blue = GPIO.PWM(self.led_gpio_blue, 100)
        self.pwm_red.start(0)
        self.pwm_green.start(0)
        self.pwm_blue.start(0)

    def setColor(self, color, hard=False):
        def rgbToDuty(value):
            value = ((255.0-value)/255.0)*100.0
            # value = value * 1.2
            if value > 100.0:
                value = 100.0
            return value
        if(hard):
            self.r = color.r
            self.g = color.g
            self.b = color.b
            self.pwm_red.ChangeDutyCycle(rgbToDuty(color.r))
            self.pwm_green.ChangeDutyCycle(rgbToDuty(color.g))
            self.pwm_blue.ChangeDutyCycle(rgbToDuty(color.b))
        else:
            print("soft")
            def weightedAverage(value1, value2, weightOf1):
                return (weightOf1*value1) + ((1-weightOf1)*value2)
            colorCurrent = Color(self.r, self.g, self.b)
            redSet = False
            greenSet = False
            blueSet = False
            while(not redSet or not greenSet or not blueSet):
                if(abs(colorCurrent.r - color.r) < 1.0):
                    redSet = True
                    colorCurrent.r = color.r
                else:
                    colorCurrent.r = weightedAverage(colorCurrent.r, color.r, .92)

                if(abs(colorCurrent.g - color.g) < 1.0):
                    greenSet = True
                    colorCurrent.g = color.g
                else:
                    colorCurrent.g = weightedAverage(colorCurrent.g, color.g, .92)

                if(abs(colorCurrent.b - color.b) < 1.0):
                    blueSet = True
                    colorCurrent.b = color.b
                else:
                    colorCurrent.b = weightedAverage(colorCurrent.b, color.b, .92)
                self.setColor(colorCurrent, hard=True)
                sleep(.3)

    def cleanup(self):
        GPIO.cleanup()

light = Light()
colors = Colors()
try:
    light.setColor(colors.off, True)
    while(True):
        rgb = raw_input("rgb: ")
        if rgb is "q":
            break
        _rgb = rgb.split()
        light.setColor(Color(float(_rgb[0]), float(_rgb[1]), float(_rgb[2])))
finally:
    light.cleanup()
