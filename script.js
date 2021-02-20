CONST_SPEED = 80
STARTER_MONEY = 10000
let screen_height = window.innerHeight;
let screen_width = window.innerWidth;

function preload() {
  let road = loadImage("./images/road.jpg");
}

function setup() {
	createCanvas(screen_width - 10, screen_height - 20);
}


function draw() {
	background(225);
  let electricCar = new Car(width/4, height/2, "electric")
  let gasCar = new Car(3*width/4, height/2, "gas")
  electricCar.show()
  gasCar.show()
  line(screen_width/2, 0, screen_width/2, screen_height);
  let street = new Road(50, 50)
  street.show()
}


function Car(x, y, type) {
  this.x = x
  this.y = y
  this.fuel = 100
  this.speed = CONST_SPEED
  this.money = STARTER_MONEY
  this.type = type

  this.show = function() {
    rectMode(CENTER);
    rect(this.x, this.y, 50, 75)
  }
}


function GasStation(x, y, cost) {
  this.x = x
  this.y = y
  this.cost = cost

  this.fueling = function(car) {
    // FUELS UP CAR, CHECKS IF ITS GAS
  }
}

function ChargingStation(x, y, cost) {
  this.x = x
  this.y = y
  this.cost = cost

  this.fueling = function(car) {
    // FUELS UP CAR, CHECKS IF ITS ELECTRIC
  }
}

function Road(x, y) {
  this.x = x
  this.y = y

  this.show = function() {
    image(road, this.x, this.y)
  }
}
