---
layout: post
title: Flask and MongoDB
---

I recently was given a gig working with the Flask framework and PyMongo. During development,
I found that it was irritating to follow the Flask tutorial and the documentation
for Flask-PyMongo wasn't descriptive enough for me.
I've gone ahead to adapt parts of the Flask tutorial with PyMongo.

###Step 1: Bringing Flask-PyMongo into your project ###
Let's install Flask-PyMongo.

$ pip install Flask-PyMongo

Now let's bring this into the project file
{% highlight ruby %}
from flask import Flask
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
mongo = PyMongo(app)
{% endhighlight %}

OK cool, now that this is set up. Let's bring this into the original Flask tutorial
and how you manipulate the database with PyMongo!

###Step 2: Application Setup Code ###

{% highlight ruby %}
from flask import Flask
from PyMongo import MongoClient

app = Flask(__name__)
db_name = 'database'
database = MongoClient()[db_name]
post_collection = database.posts
{% endhighlight %}

At this point we can start adding to the post_collection.

{% highlight ruby %}
@app.route("/addpost", methods=('POST')
def add_post():
  post_collection.insert_one("posts":"post1")
  return render_template('/')
{% endhighlight %}

Now let's try removing stuff

{% highlight ruby %}
@app.route("deletepost", methods=('GET')
def delete_post():
  post_collection.delete_one("posts":"post1")
  return render_template('/')
{% endhighlight %}

Now let's try finding posts and then updating them!

{% highlight ruby %}
@app.route("findandupdatepost", methods=('POST')
def find_and_update_post():
  post_collection.find_one("posts":"post1")
  post_collection.update_one("posts": "$set":{
                                              "post1":"posttext"
                                              })
  return render_template('/')
{% endhighlight %}
