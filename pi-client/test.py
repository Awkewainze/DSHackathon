import RPi.GPIO as GPIO
from time import sleep

def do_fade(pwm, start, end, step=2):
    if start > end:
        step *= -1
        end -= 1
    else:
        end += 1
    for duty in range(start, end, step):
        pwm.ChangeDutyCycle(duty)
        sleep(0.1)

GPIO.setmode(GPIO.BCM)
led_gpio = 4
GPIO.setup(led_gpio, GPIO.OUT)

pwm = GPIO.PWM(led_gpio, 50)
pwm.start(0)

for _ in range(2):
    do_fade(pwm, 0, 100)
    do_fade(pwm, 100, 0)

GPIO.cleanup()
