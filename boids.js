var width = 1000;
var height = 1000;

var size = {
    length: 20,
    width: 10
}

var borderMargin = {
    x: 10,
    y: 10
};

function sizeCanvas() {
    const canvas = document.getElementById("cvs");
    width = window.innerWidth - 2*(borderMargin.x);
    height = window.innerHeight - 2*(borderMargin.y);
    canvas.width = width;
    canvas.height = height;
}

var boids = [];

function spawnBoids()
{
    for(var i=0; i<100; i++)
    {
        //console.log(i)
        boids.push({
            x: Math.random()*width,
            y: Math.random()*height,
            speed: 
            {
                x: Math.random()*10-5,
                y: Math.random()*10-5
            }
        })
    }
}

function drawBoid(ctx, boid) {
    const angle = Math.atan2(boid.speed.y, boid.speed.x);
    ctx.translate(boid.x, boid.y);
    ctx.rotate(angle);
    ctx.translate(-boid.x, -boid.y);
    ctx.fillStyle = "#558cf4";
    ctx.beginPath();
    ctx.moveTo(boid.x + size.length, boid.y);
    ctx.lineTo(boid.x, boid.y + size.width/2);
    ctx.lineTo(boid.x, boid.y - size.width/2);
    ctx.lineTo(boid.x + size.length, boid.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function keepWithinBounds(boid) {
  const margin = 20;
  const turnFactor = 1;

  if (boid.x < margin) {
    boid.speed.x += turnFactor;
  }
  if (boid.x > width - margin) {
    boid.speed.x -= turnFactor
  }
  if (boid.y < margin) {
    boid.speed.y += turnFactor;
  }
  if (boid.y > height - margin) {
    boid.speed.y -= turnFactor;
  }
}

function distance(boid1, boid2)
{
	return Math.sqrt((boid2.x-boid1.x)**2, (boid2.y-boid1.y)**2);
}

function getClosest(boid)
{
	var smallest = 1000;
	var current;
	for(var i in boids)
	{
		if(boids[i]!=boid)
		{
			var dist = distance(boid, boids[i]);
			if (dist<smallest)
			{
				smallest=dist;
				current = boids[i]
			}
		}
	}
	return [current, smallest];
}

function computeBoids()
{
	for(var i in boids)
	{
		keepWithinBounds(boids[i]);
	}
}

var x = 0;
var count = 0;
function mainLoop()
{
    //Update stuff go brrr
    if(count%60==0)
    {
        //spawnBoids();
    }
    computeBoids();
    for(var i in boids)
    {
        if(boids[i].x<0 | boids[i].x>width | boids[i].y<0 | boids[i].y>height)
        {
            boids.splice(i, 1);
            continue
        }
        boids[i].x+=boids[i].speed.x;
        boids[i].y+=boids[i].speed.y;
    }
    const ctx = document.getElementById("cvs").getContext("2d");
    // Clear screen go aussi brrrrr
    ctx.clearRect(0, 0, width, height);
    
    // Drawing go toujours brrrr
    for(var j in boids)
    {
        drawBoid(ctx, boids[j]);
    }
    count+=1;
    window.requestAnimationFrame(mainLoop);
}

window.onload = () => {
    window.addEventListener("resize", sizeCanvas, false);
    sizeCanvas();

    spawnBoids();  
    window.requestAnimationFrame(mainLoop);
  };
