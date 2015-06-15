{#
Swig description	: Base Layout
Swig author			: Marc Andrew San Buenaventra
Created date		: 12.02.2015
#}
<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" lang="en">
<![endif]-->
<!--[if IE 7]>
<html id="ie7" lang="en">
<![endif]-->
<!--[if IE 8]>
<html id="ie8" lang="en">
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html lang="en">
<!--<![endif]-->
<head>
	<meta charset="UTF-8" />

	<meta name="description"	content="{{ description }}" />

	<link rel="stylesheet" type="text/css" href="css/style.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="js/jquery.stickydiv.js"></script>

	<title>{{ title }}</title>
</head>

<body id="{{ page }}" class="{{ category }}">

	<div id="page">

		<!-- Start Header -->
		{% include '../layout/header/layout-header.swig' %}
		<!-- End Header -->

		<!-- Start Main -->
		<div id="main" class="container">

			{% block content %}{% endblock %}

		</div>
		<!-- End Main -->

		<!-- Start Footer -->
		{% include '../layout/footer/layout-footer.swig' %}
		<!-- End Footer -->

	</div>

</body>
</html>
