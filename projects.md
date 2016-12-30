---
layout: page
title: Projects
---

<div class="project__container">
	{% for project in site.projects %}
		<div class="project__item">
	    <h1>{{ project.title }}</h1>
	    <h3>{{ project.work }}</h3>
	    <p>{{ project.description }}</p>
			<a href="{{ project.link }}" class="project__item--btn">Click here for more info</a>
		</div>
	{% endfor %}
</div>
