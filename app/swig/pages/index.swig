
{% extends '../layout/layout-base.swig' %}

				{# Start Main #}
				{% block content %}

					<div id="left_nav">
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
						</ul>
					</div>

					<script>
						$(document).ready(function(){
							$('#left_nav').stickydiv();
						});
					</script>

				{% endblock %}

