---
layout: post
title: Hatch Extension and Pair programming
---

#Hatch Extension and Pair programming
I've always been pretty curious with how a chrome extension works. Dallis, my girlfriend, works at a great company called Hatch Canada where they teach kids how to program. She needed to create an extension where you can take a screenshot of a kids project and then create a new tab with a nice layout so the student could print the project out. Dallis eventually came to me for help. It ended up being a great time since we pair programmed through the project and I got learn about chrome extensions.

Let's walk through our solution. We start off by setting an id which we'll be using to create a unique tab. We then create 3 event listeners that grabs the 3 things we'll need from the project page. We're grabbing the project title, it's URL, and the canvas.

Initially, Dallis had the extension set up so that it would take a screenshot of the whole browser window and then she would crop out the image. We changed it so that we use toDataURL() on the canvas to get a data URI of the image.  

{% highlight javascript %}
var id = 100;

chrome.browserAction.onClicked.addListener( function() {
	
  chrome.tabs.executeScript(
    { 
      code: " document.getElementsByClassName('project')[0].getElementsByTagName('h2')[0].innerHTML;"
    }, 
    function (ps1) {
		  chrome.runtime.onConnect.addListener(function(port){
			port.postMessage({text: ps1, type : "title"});
		});
    }
  );
});

chrome.browserAction.onClicked.addListener( function() {
  chrome.tabs.executeScript(
    { 
      code: "document.URL"
    }, 
    function (ps2) {
		  chrome.runtime.onConnect.addListener(function(port){
			port.postMessage({text:ps2, type:"url"});
		});
    }
  );
});

chrome.browserAction.onClicked.addListener( function() {
  chrome.tabs.executeScript(
    { 
      code: " document.getElementsByClassName('project')[0].getElementsByTagName('canvas')[0].toDataURL();"
    }, 
    function (ps3) {
      chrome.runtime.onConnect.addListener(function(port){
      port.postMessage({text:ps3, type:"canvas"});
    });
    }
  );
});

chrome.browserAction.onClicked.addListener(function() {
	
  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
    var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
    var targetId = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {

      if (tabId != targetId || changedProps.status != "complete")
        return;

      chrome.tabs.onUpdated.removeListener(listener);

      var views = chrome.extension.getViews();
      for (var i = 0; i < views.length; i++) {
        var view = views[i];
        if (view.location.href == viewTabUrl) {
			     view.setScreenshotUrl(screenshotUrl);
          break;
        }
      }
    });

    chrome.tabs.create({url: viewTabUrl}, function(tab) {
      targetId = tab.id;
    });
  });
});

{% endhighlight %} 

The second JS script grabs the project title, URL, and canvas and then writes it into our html. We set up a port variable that connects to background.js and then we listen for the three messages and we put throw them into our newly created tab.

{% highlight javascript %}
	var port = chrome.runtime.connect({name:"screenshot"});
	port.onMessage.addListener(function(message,sender){
	if (message.type == "title") {
		document.getElementById('titleText').innerHTML = message.text;
	}
	if (message.type == "url") {
		document.getElementById('website').innerHTML = message.text;
	}
	if (message.type == "canvas"){
		document.getElementById('target').src = message.text;
	}
});

{% endhighlight %}

With the scripting done, I decided to show Dallis how flex boxes and BEM work. It's pretty easy to read but for those who don't know how flexboxes work then what this stylesheet is doing is setting up a parent container which defines the direction of how its children will be laid out and then we wrote the children classes for the three sections. 

{% highlight css%}

.container{
  display: flex;
  flex-direction: column;
  height: 550px;
  width: 500px;
}

.container__title{
  order: 1;
  background-color:rgb(0,118,165);
  height:100px;
  width: 100%;
  margin: auto;
  padding: 5px 0;
}

.container__image{
  order: 2;
  height: 100%;
  width: 100%;
  margin:auto;
}

img{
  width: 500px;
  height: 100%;
}

.container__url{  
  order: 3;
  height: 100px; 
  width: 100%;
  background-color:rgb(0,118,165);
  margin: auto;
  padding: 4px 0;
}

{% endhighlight %}

It was a great little project for the two of us to work on. Learning something new is a great feeling but it's even better to help someone out in a bind.



