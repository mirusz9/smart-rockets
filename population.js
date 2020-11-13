function Population() {
    this.rockets = [];
    this.popSize = 100;
    this.matingPool = [];

    for (let i = 0; i < this.popSize; i++) {
        this.rockets[i] = new Rocket();
    }

    this.evaluate = function() {

        var maxFit = 0;
        for (let i = 0; i < this.popSize; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxFit) {
                maxFit = this.rockets[i].fitness;
            }
        }

        for (let i = 0; i < this.popSize; i++) {
            this.rockets[i].fitness /= maxFit;
        }
        
        this.matingPool = [];
        for (let i = 0; i < this.popSize; i++) {
            var n = this.rockets[i].fitness * 100;
            for (let j = 0; j < n; j ++) {
                this.matingPool.push(this.rockets[i]);
            }
        }

    }

    this.selection = function() {
        var newRockets = [];
        for (let i = 0; i < this.rockets.length; i ++) {
            var parentA = random(this.matingPool).dna;
            var parentB = random(this.matingPool).dna;
            var child = parentA.crossOver(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;

    }

    this.run = function() {
        for (let i = 0; i < this.popSize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
}