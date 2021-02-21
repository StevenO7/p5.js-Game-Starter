CONST_SPEED = 15;
STARTER_MONEY = 10000;
let screen_height = window.innerHeight;
let screen_width = window.innerWidth;
let gasRoad, EVroad;
let electricCar, gasCar;
let gasTanks = [];
let EVcharger = [];
function preload() {
  road = loadImage("./images/road.jpg");
}

function setup() {
  createCanvas(screen_width - 10, screen_height - 20);
  gasRoad = drawingRoad(screen_width / 6.5, 0);
  EVroad = drawingRoad((screen_width * 1.95) / 3, 0);
  gasCar = new Car(width / 4, height / 1.5, "electric");
  electricCar = new Car((3 * width) / 4, height / 1.5, "gas");
}

function draw() {
  background("rgb(59,68,75)");
  for (let i = 0; i < gasRoad.length; i++) {
    gasRoad[i].show();
    EVroad[i].show();
  }

  electricCar.show();
  gasCar.show();
  line(screen_width / 2, 0, screen_width / 2, screen_height);
  gasCar.move(gasRoad);
  electricCar.move(EVroad);
  for (let i = 0; i < EVcharger.length; i++) {
    EVcharger[i].move();
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (electricCar.x <= (3 * width) / 4 + 150) {
      electricCar.x += 5;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (electricCar.x >= (3 * width) / 4 - 150) {
      electricCar.x -= 5;
    }
  }

  if (gasTanks.length == 0) {
    let side = Math.round(Math.random() * 150);
    if (side == 0) {
      let gasTank = new GasStation(width / 4 - 150, 0, 1.05);
      gasTanks.push(gasTank);
    } else if (side == 1) {
      let gasTank = new GasStation(width / 4 + 150, 0, 1.05);
      gasTanks.push(gasTank);
    }
  }
  if (EVcharger.length == 0) {
    let side = Math.round(Math.random() * 450);
    if (side == 0) {
      let gasTank = new ChargingStation((3 * width) / 4 - 150, 0, 1.05);
      EVcharger.push(gasTank);
    } else if (side == 1) {
      let gasTank = new ChargingStation((3 * width) / 4 + 150, 0, 1.05);
      EVcharger.push(gasTank);
    }
  }
  for (let i = 0; i < gasTanks.length; i++) {
    gasTanks[i].show();
    gasTanks[i].move();
  }
  for (let i = 0; i < EVcharger.length; i++) {
    EVcharger[i].show();
  }
}

function drawingRoad(x, y) {
  roads = [];
  let road = new Road(x, -screen_height);
  let road2 = new Road(x, y);
  let road3 = new Road(x, screen_height);
  roads.push(road);
  roads.push(road2);
  roads.push(road3);
  return roads;
}

function Car(x, y, type) {
  this.x = x;
  this.y = y;
  this.fuel = 100;
  this.speed = CONST_SPEED;
  this.money = STARTER_MONEY;
  this.type = type;

  this.show = function () {
    rectMode(CENTER);
    rect(this.x, this.y, 50, 75);
  };
  this.move = function (roads) {
    for (let i = 0; i < roads.length; i++) {
      roads[i].y += this.speed;
      if (roads[i].y > screen_height) {
        roads[i].y = -screen_height + 25;
      }
    }
  };
}

function GasStation(x, y, cost) {
  this.x = x;
  this.y = y;
  this.cost = cost;

  this.fueling = function (car) {
    // FUELS UP CAR, CHECKS IF ITS GAS
  };

  this.show = function () {
    rect(this.x, this.y, 50, 75);
  };
  this.move = function () {
    this.y += CONST_SPEED;
    if (this.y >= screen_height) {
      gasTanks.pop();
    }
  };
}

function ChargingStation(x, y, cost) {
  this.x = x;
  this.y = y;
  this.cost = cost;

  this.fueling = function (car) {
    // FUELS UP CAR, CHECKS IF ITS ELECTRIC
  };
  this.show = function () {
    rect(this.x, this.y, 50, 75);
  };
  this.move = function () {
    this.y += CONST_SPEED;
    if (this.y >= screen_height) {
      EVcharger.pop();
    }
  };
}

function Road(x, y) {
  this.x = x;
  this.y = y;

  this.show = function () {
    image(road, this.x, this.y, 365, screen_height);
  };
}
