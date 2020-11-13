function obstacle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.show = function() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }

    this.collides = function(rocket) {
        if (rocket.pos.x > this.x && rocket.pos.x < this.x + this.width && rocket.pos.y > this.y && rocket.pos.y < this.y + this.height) {
            return true;
        }
        return false;
    }


}