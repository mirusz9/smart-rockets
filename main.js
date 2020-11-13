var population;
var lifeSpan = 2000;
var lifeP;
var count = 0;
var target;
var obstacles;
var maxForce = 0.2;
var gen = 1;
var gotToTarget = 0;
var crashedCount = 0;
var bestTime = "N/A";
var checkpoints = [];

function setup() {
    createCanvas(400, 300);
    population = new Population();
    lifeP = createP();
    target = createVector(40, 40);
    obstacles = [
        new obstacle(0, 200, 150, 10),
        new obstacle(90, 250, 10, 50),
        new obstacle(150, 140, 10, 120), // vertical
        new obstacle(210, 200, 10, 100),
        new obstacle(160, 140, 160, 10),
        new obstacle(320, 100, 10, 155),
        new obstacle(220, 200, 50, 10),
        new obstacle(270, 245, 50, 10),
        new obstacle(90, 0, 10, 150),



    ];
    checkpoints = [
        new checkpoint(100, 250, 50, 10),
        new checkpoint(90, 210, 10, 40),
        new checkpoint(160, 250, 50, 10),
        new checkpoint(150, 260, 10, 40),
        new checkpoint(210, 150, 10, 50),
        new checkpoint(260, 150, 10, 50),
        new checkpoint(270, 200, 50, 10),
        new checkpoint(260, 210, 10, 45),
        new checkpoint(270, 255, 10, 45),
        new checkpoint(330, 245, 70, 10),
        new checkpoint(320, 255, 10, 45),
        new checkpoint(330, 100, 70, 10),
        new checkpoint(310, 0, 10, 140),
        new checkpoint(200, 0, 10, 140),
        new checkpoint(150, 90, 10, 50),
        new checkpoint(100, 140, 50, 10),
        new checkpoint(90, 150, 10, 50),
        new checkpoint(0, 140, 90, 10),
    ];
}

function draw() {
    frameRate(60);
    background(0);
    population.run();

    gotToTarget = 0;
    crashedCount = 0;
    for (let i = 0; i < population.rockets.length; i ++) {
        if (population.rockets[i].completed) {
            gotToTarget ++;
            
            if (bestTime == "N/A") {
                bestTime = population.rockets[i].completedTimeRaw;
            } else {
                if (population.rockets[i].completedTimeRaw < bestTime) {
                    bestTime = population.rockets[i].completedTimeRaw;
                }
            }


        }
        if (population.rockets[i].crashed) {
            crashedCount ++;
        }
    }
    lifeP.html("Current generation process: " + count + "</br>Gen: " + gen + "</br> Rockets got to target: " + gotToTarget + "</br> Rockets crashed: " + crashedCount + "</br> Best time: " + bestTime);
    count ++;

    if (count == lifeSpan || gotToTarget + crashedCount == 100) {
        population.evaluate();
        population.selection();
        for (let i = 0; i < checkpoints.length; i ++) {
            checkpoints[i].gotThrough = [];
        }
        count = 0;
        gen ++;
    }

    for (let i = 0; i < obstacles.length; i ++) {
        obstacles[i].show();
    }

    for (let i = 0; i < checkpoints.length; i ++) {
        checkpoints[i].show();
    }

    fill(255);
    ellipse(target.x, target.y, 16, 16);
}