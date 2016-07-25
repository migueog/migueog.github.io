---

layout: post
title: Todo Web app using the MEAN stack

---

As a way for me to learn the MEAN stack better, I figured that I should make a small tutorial to cement my knowledge and hopefully help someone out in the process.

Let's get started with the project structure.

# Project Structure

{% highlight markup %}
	- public <-- Folder where you'll put your stuff
		- index.html	
		- style.css
		- app.js
	- package.json
	- server.js
{% endhighlight %}

### Installing Node Modules

Let's set up and install the dependencies of our app. In our package.json file, we'll list out the dependencies and afterwards we'll run npm install to have all the dependencies installed and ready to go!

{% highlight markup %}
	{ 
		"name" : "todo-app",
		"version" : "0.0.0",
		"description" : "Simple Todo App",
		"main" : "server.js",
		"author" : "Miguel OG",
		"dependencies" : {
			"body-parser" : "^1.4.3",
			"express"        : "^4.13.4",
	    "method-override": "^2.1.3",
	    "mongoose"       : "^4.4.12",
	    "morgan"         : "^1.1.1"
		}
	} 
{% endhighlight %}

Now let's run npm install to grab all the dependencies. 

# Node Config

In our package.json file, we listed "server.js" as our main file. This is what our Node app will look to for all the configurations for our app. Let's write out the configuration and we can walk through it slowly and talk about what each part does.

{% highlight js %}

	//Server.js

	//Set up
	var express = require('express');
	var app = express();
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');

	//configuration
	mongoose.connect(database.localUrl);
	
	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(methodOverride());

	//App listening
	app.listen(8080);
	console.log('It's working on port 8080');

{% endhighlight %}

OK! Now that we got that out of the way, let's walk through each section so we understand what is happening in each spot.

### Set Up
This part sets up the requirements that make sure that all the dependencies that we installed earlier are included in our app.

### Configuration
Here we connect mongoose to our localUrl. If you run this right now, the app won't work :(. We'll get this working once we've gone through everything.

The rest of this section is telling the app to use all of the dependencies

### App Listening
Finally, we set our app to listen to 8080. 8080 refers to the portnumber when we run a local server.

### Back to Configuration
Let's fix our small problem of local.Url. Let's add another variable to our setup section. 

{% highlight js %}

	//Server.js

	//Set up
	var express = require('express');
	var app = express();
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var localUrl = 'mongodb://localhost/todoapptutorial' // Add this part!

	//configuration
	mongoose.connect(localUrl);
	
	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(methodOverride());

	//App listening
	app.listen(8080);
	console.log('It's working on port 8080');

{% endhighlight %}

That should do it! Let's see if everything works! 

Go into your terminal and access your project directory. run `node server.js`

# Setup our Node API

Before we start working on the frontend, we need to create our API that will be able to create, lookup, and delete our todos!

Let's first create our model. But first, what is a model? The model directly manages the data, logic and rules of the application. We're storing all of our data through mongoose and the model is what accesses and makes use of that data. So cool!

Let's create our model!

### Model setup
{% highlight js %}
	//server.js
	//Put this in between the Setup and Config sections

	//Model
	var ToDo = mongoose.model('Todo', {
		text:string
	});
{% endhighlight %}

Now that we have our model set up. Let's create the API routes.

### API Routes

{% highlight js %}

//server.js
//Put this in after the config section

	app.get('/api/todos', function(req, res) {
		Todo.find(function(err, todos) {
			if(err) {
				res.send(err)
			}
			res.json(todos);
		});
	});

	app.post('/api/todos', function(req, res) {
		Todo.create({
			text: req.body.text,
			done: false;
		}, function(err, todo) {
			if (err) 
				res.send(err);
			
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	app.delete('api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function (err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err);
				res.json(todos);
			});
		});
	});

{% endhighlight %}


# Making The Front End with Angular

Now that the API is set up with the appropriate routes, we can now start working with our front end to interact with the API.

Let's add just a bit of code to server.js so that angular can see our server. Put the following line in between the routes that we just added and the listen section.

{% highlight js %}
	//server.js

	//application
	app.get('*', function(req, err) {
		res.sendfile('./public/index.html');
	})

{% endhighlight %}

### Setting up our Angular file

Enough with working with server.js. Let's go over to app.js and start coding!

{% highlight js %}
	//app.js

	var app = angular.module('todo', []);

	function mainCtrl($scope, $http) {
		$scope.formData = {};

		$http.get('/api/todos')
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error' + data);
			});

		$scope.createTodo = function() {
			$http.post('/api/todos', $scope.formData)
				.success(function(data){
					$scope.formData = {};
					$scope.todos = data;
				});
				.error(function(data){
					console.log('Error' + data);
				});
		}

		$scope.deleteTodo = function(id) {
			$http.delete('/api/todos' + id)
				.success(function(data){
					$scope.todos = data;
				})
				.error(function(data) {
					console.log('Error' + data);
				})

		};
	};
{% endhighlight %}

### Let's make this pretty!

{% highlight html %}

	// index.html

	<!doctype html>

	<html ng-app="todo">
	<head>
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1">

	    <title>Node/Angular Todo App</title>

	    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
	    <style>
	        html                    { overflow-y:scroll; }
	        body                    { padding-top:50px; }
	        #todo-list              { margin-bottom:30px; }
	    </style>

	    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js"></script>
	    <script src="app.js"></script>

	</head>
	<body ng-controller="mainController">
	    <div class="container">

	        <div class="jumbotron text-center">
	            <h1>This is a todo list <span class="label label-info">{{ todos.length }}</span></h1>
	        </div>

	        <div id="todo-list" class="row">
	            <div class="col-sm-4 col-sm-offset-4">

	                <div class="checkbox" ng-repeat="todo in todos">
	                    <label>
	                        <input type="checkbox" ng-click="deleteTodo(todo._id)"> {{ todo.text }}
	                    </label>
	                </div>

	            </div>
	        </div>

	        <div id="todo-form" class="row">
	            <div class="col-sm-8 col-sm-offset-2 text-center">
	                <form>
	                    <div class="form-group">

	                        <input type="text" class="form-control input-lg text-center" placeholder="Enter a Todo Here" ng-model="formData.text">
	                    </div>

	                    <button type="submit" class="btn btn-primary btn-lg" ng-click="createTodo()">Add</button>
	                </form>
	            </div>
	        </div>

	    </div>

	</body>
	</html>
{% endhighlight %}

### Almost there! Let's run the app!

Now that we have finished with the front end, let's do the following in our terminal:
 - npm install
 - node server.js
 - view in your browser at http://localhost:8080






