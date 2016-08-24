---
layout: page
title: Projects
---

<div class="project__container">
	{% for project in site.projects %}
		<div class="project__item">
	    <h1 class="project__item--divider">{{ project.title }}</h3>
	    <h3>{{ project.work }}</h3>
	    <p>{{ project.description }}</p>
	    <button class="project__item--btn"><a href="{{ project.link }} ">Click here for more info</a></button>
			<div class="project__item--longdivider"></div>
		</div>
	{% endfor %}
</div>
