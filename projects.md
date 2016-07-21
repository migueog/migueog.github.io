---
layout: page
title: Projects

---

<div class="project__container">
	{% for project in site.projects  %}
		<div class="item">
	    <h3>{{ project.title }}</h3>
	    <p>{{ project.work }}</p>
	    <p>{{ project.description }}</p>
	    <p><a href="{{ project.link }} ">Click here for more info</a></p>
	    <p><img src="{{ project.pic }}"></p>
		</div>
	{% endfor %}
</div>


