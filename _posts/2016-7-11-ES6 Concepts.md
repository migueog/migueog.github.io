---
layout: post
title: ES6 Concepts
---

This post is designed to help out myself to cement the concepts of ES6 but also to provide a helpful document that explains ES6 in a different way.

### Arrow Functions

Arrow functions are great. They're a shorthand way of setting up a function.

Let's look at how we normally create a function in JS.

{% highlight javascript %}
	var a = [
		"Hydrogen",
		"Helium",
		"Lithium",
		"Beryllium"
	];

	var a2 = a.map(function(s){return s.length});
{% endhighlight %}


What the code sample above is doing is creating an array called "a" and we are mapping a new array that contains the length of each element in the array.

Let's rewrite this using the arrow function!

{% highlight javascript %}
	var a = [
		"Hydrogen",
		"Helium",
		"Lithium",
		"Beryllium"
	];

	var a3 = a.map( s => s.length);
{% endhighlight %}

We're doing the same thing but a whole lot shorter! The arrow function doesn't only just make functions shorter to write but it also defines it's own "this" value.

For example,

{% highlight javascript %}
	function Person() {
		this.age = 0;
		
		setInterval(() => {
			this.age++;
		}, 1000);
	}

	var p = new Person();

{% endhighlight %}

OK so! We created a constructor called Person that when it is created, it has an age of 0. setInterval is a cool built in JS function. It's basically a looping function that takes in two parameters. The first parameter is what should the loop do and the second parameter is how often should the first parameter be activated.

If we didn't use the arrow function, we would need to create a separate function that increases the age of the person that is wrapped in the setInterval function. This creates a global "this" instead of one that is specific to the person object that we create.


### Classes

A class in JS is a way for people with a background in OO design to use the same methodology in their programs. However, this does not replace JS's prototyped based inheritance model. It is just a way to create a cleaner and simpler syntax to creating objects and dealing with inheritance.

Here's an example 

{% highlight javascript %}

	class Polygon {
		constructor(height, width) {
			this.height = height;
			this.width = width;
		}
	}
{% endhighlight %}

