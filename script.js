const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cw = canvas.width;
const ch = canvas.height;

let mouse = {
	x: 0,
	y: 0,
}
console.log("hitgub")
document.addEventListener("keydown", function(event) {
	if (event.key == "r") {
		for(let thing of boxList) {
			if (thing.drag == true) {
				let mo = thing.width + thing.x - mouse.x;
				var ow = thing.width;
				thing.width = thing.height;
				thing.height = ow;
				let od = thing.xD;
				thing.xD = thing.yD;
				thing.yD = od;
				thing.x = mouse.x + thing.xD;
				thing.y = mouse.y + thing.yD;
			}
		}
	}
})
document.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
	for(let thing of boxList) {
		if (thing.drag == true) {
			thing.x = mouse.x + thing.xD;
			thing.y = mouse.y + thing.yD;
		}
	}
})
document.addEventListener("mousedown", function(click) {
	for(let thing of boxList) {
		if (thing.x < mouse.x && thing.x + thing.width > mouse.x && thing.y < mouse.y && thing.y + thing.height > mouse.y) {
			thing.drag = !thing.drag;
			thing.xD = thing.x - mouse.x;
			thing.yD = thing.y - mouse.y;
		}
	}
})
			
let boxList = [];
function box(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.xD = 0;
	this.yD = 0;
	this.width = width;
	this.height = height;
	this.color = "red";
	this.drag = false;

	this.draw = function() {
		c.strokeStyle = this.color;
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.stroke();
		c.closePath();
	};
	this.update = function() {
		if (this.x  < mouse.x && this.x + this.width > mouse.x && this.y < mouse.y && this.y + this.height > mouse.y) {
			this.color = "blue";
		} else {
			this.color = "red";
		}
		this.draw();
	};
};

function addBox() {
	let width = (Math.random() * 140) + 10;
	let height = (Math.random() * 140) + 10;
	let x = Math.random() * (cw - width);
	let y = Math.random() * (ch - height);
	boxList.push(new box(x, y, width, height));
}

function int() {
	for(let i=0; i < 20; i++) {
		addBox();
	}

	requestAnimationFrame(update);
}

function update() {
	c.clearRect(0, 0, cw, ch);
	for(let i=0; i < boxList.length; i++) {
		boxList[i].update();
	}
	requestAnimationFrame(update);
}

int();