function Rocket(dna) {
    this.pos = createVector(50, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.completedTime = 1;
    this.color = color("rgba(255, 255, 255, 0.5)")
    this.completedTimeRaw = 400;
    this.checkPointCount = 0;

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.update = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            if (!this.completed) {
                this.completedTimeRaw = count;
                this.completedTime = map(count, 1, 400, 20, 1);
            }
            this.completed = true;
            this.color = color("rgba(11, 252, 3, 0.5)")
            this.pos = target.copy();
        }

        for (let i = 0; i < obstacles.length; i ++) {
            if (obstacles[i].collides(this)) {
                this.crashed = true;
                this.color = color("rgba(209, 0, 0, 0.5)")
            }
        }

        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.crashed = true;
            this.color = color("rgba(209, 0, 0, 0.5)")
        }


        for (let i = 0; i < checkpoints.length; i ++) {
            if (checkpoints[i].collides(this)) {
                this.checkPointCount ++;
            }
        }

        this.applyForce(this.dna.genes[count])
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }

    }

    this.show = function() {
        push();
        noStroke();
        fill(this.color)
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }

    this.calcFitness = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);

        for (let i = 0; i < this.checkPointCount; i ++) {
            this.fitness *= 3;
        }

        if (this.completed) {
            this.fitness *= this.completedTime;
        }
        if (this.crashed) {
            this.fitness /= 10;
        }


    }

}