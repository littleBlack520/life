function Clock(image, sprite, canvas, width, height, theme, age, oldage) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.scale = width / 375 * 2;
    this.age = age || 0;
    this.oldage = oldage || 0;
    this.theme = theme || "white";
    this.canvas.width = width * 2;
    this.canvas.height = height * 2;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
    this.image = image;
    this.sprite = sprite;
    this.init();

}
Clock.prototype.init = function() {
    var self = this;
    self.data = {
        bg: {
            x: self.cx - 100 * self.scale,
            y: self.cy - 100 * self.scale,
            sprite: self.sprite[self.theme]["bg"],
            width: 200,
            height: 200,
            angle: 0,
            offsetX:0
        },
        hours: {
            x: self.cx,
            y: self.cy,
            sprite: self.sprite[self.theme]["hours"],
            width: 7,
            height: -50,
            angle: 0,
            offsetX: -3.5

        },
        mintues: {
            x: self.cx,
            y: self.cy,
            sprite: self.sprite[self.theme]["mintues"],
            width: 6,
            height: -60,
            angle: 0,
            offsetX: -3 
        },
        second: {
            x: self.cx,
            y: self.cy,
            sprite: self.sprite.public.second,
            width: 4,
            height: -70,
            angle: 0,
            offsetX: -2 
        },
        round: {
            x: self.cx - 8 * self.scale,
            y: self.cy - 8 * self.scale,
            sprite: self.sprite.public.round,
            width: 16,
            height: 16,
            angle: 0,
            offsetX: 0
        }
    };

  
       self.draw();
    
}
Clock.prototype.draw = function() {

    var self = this,
        data = self.data;
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
    var day, hours, minutes, second;
    if (self.theme == "black") {
        time = (24 * (self.age / self.oldage)).toString().split(".");
        self.data.hours.angle = parseInt(time[0]) / 12 * 360;
        self.data.mintues.angle = Number("0." + time[1]) * 360;
        self.data.second.angle = 0;

    } else {
        time = new Date();
        hours = time.getHours();
        minutes = time.getMinutes();
        second = time.getSeconds();
        self.data.hours.angle = hours / 12 * 360;
        self.data.mintues.angle = minutes / 60 * 360;
        self.data.second.angle = second / 60 * 360;
        
    }
    for (var p in data) {
        self.ctx.save();
        self.ctx.translate(data[p].x, data[p].y);
        self.ctx.rotate(data[p].angle / 180 * Math.PI);
        self.ctx.scale(self.scale, self.scale);
        self.ctx.drawImage(self.image, data[p].sprite[0], data[p].sprite[1], data[p].sprite[2], data[p].sprite[3], data[p].offsetX, 0, data[p].width, data[p].height);
        self.ctx.restore();
    }

}

