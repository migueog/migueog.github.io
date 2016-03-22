---
layout: post
title: Generative Art
---

I spent this past weekend at a Generative Hack party making art using p5.js. I've had past experience using processing and so it was easy and painless to jump into p5.js. Having gone to a handful of hackathons in the past, this one was by far the best one. The space was non competitive, quiet and lots of space. I want to stress the idea of not having to make an app to win the competition. It was just a great space to code at your own speed and hang out with like minded people. 

Here's one of the projects that I made for the art party.

http://art3.genarthackparty.com/live/ShhhJustListen/

I attempted to make a synthesia machine that consisted of generating sounds based off of random values and then creating visuals based off the sounds. I've included the code below:

{% highlight javascript %}
var osc, analyzer, delay;

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0.5);
  osc.start();

  analyzer = new p5.Amplitude();
  delay = new p5.Delay();

  analyzer.setInput(osc);

}

function Shape(){
	this.x = height/2;
	this.y = 50;
	this.width = width;
	this.height = 50;

	this.display = function(){
		rect(this.x, this.y, this.width, this.height);
	}
}

function draw() {
  background(255);
  var rms = analyzer.getLevel();
 	fill('green');
  stroke('green');
  var rand = random(0.1,5);
  x = osc.amp(rand);
  var rand2 = random(0, 255);
  var rand3 = random(0,255);
  y = osc.freq(rand2);
  var derp = 50+rms*500;
  delay.process(osc, 5, .7, 4000);
  env = new p5.Env(.01, 0.4, .2, .5);

  env.play(osc);

  for(var i = 0; i < 2500; i++){
  	if(i <= 2500){
  		stroke(rand3, rand2, derp, i);
			line(i, 5, rand3, i);
			stroke(rand2, rand3, derp, i);
			line(rand3, i*PI, derp, i);
			stroke(rand3, rand2, derp, i);
			line(-derp, -rand, -PI, -i);
			stroke(rand3, rand2, derp, i);
			line(derp, PI, rand3, i);
			stroke(rand2, rand3, derp, i);
			line(rand3, PI, derp, i);
			stroke(rand3, rand2, derp, i);
			line(-derp, -rand, -PI, -i);
  	}else{
  		i = 0;
  	}
  }
}
{% endhighlight %}
