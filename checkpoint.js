function checkpoint(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.gotThrough = [];

    this.show = function() {
        fill(color("rgba(11, 252, 3, 0.5)"));
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }

    this.collides = function(rocket) {
        if (rocket.pos.x > this.x && rocket.pos.x < this.x + this.width && rocket.pos.y > this.y && rocket.pos.y < this.y + this.height) {
            if (!this.checkGotThrough(rocket)) {
                this.gotThrough.push(rocket);
                return true;
            }

        }
        return false;
    }

    this.checkGotThrough = function(obj) {
        for (let i = 0; i < this.gotThrough.length; i++) {
            if (this.gotThrough[i] === obj) {
                return true;
            }
        }
    
        return false;
    }
 
}