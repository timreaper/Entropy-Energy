<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="favicon" href="/assets/images/icons/favicon.png">
	<link rel="apple-touch-icon" href="/assets/images/icons/favicon2.png">
	<title>Entropy & Energy</title>
	<meta name="description" content="Entropy & Energy.">
	<meta content="Imaginary Forces, Sleep Codes, Basic Rhythm, Type, Fang Bomb, Bedouin" name="keywords">
	<link rel="stylesheet" href="/assets/css/libraries.css">
	<link rel="stylesheet" href="/assets/css/app.css">
</head>

<body>
<?php
/* Short and sweet */
define('WP_USE_THEMES', false);
require('../blog/wp-blog-header.php');
?>

<div class="container news">
	<div class="top-space"></div>
	<nav class="menu col-xs-12 col-sm-2">
		<ul>
			<li><a href="/news">News</a></li>
			<li><a href="/biography">Biography</a></li>
			<li><a href="/discography">Discography</a></li>
			<li><a href="/events">Events</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</nav>
	<div class="col-xs-12 col-sm-10">
		<?php if (have_posts()) : while (have_posts()) :
		the_post(); ?>

		<!-- The following tests if the current post is in category 3. -->
		<!-- If it is, the div box is given the CSS class "post-cat-three". -->
		<!-- Otherwise, the div box will be given the CSS class "post". -->
		<?php if (in_category('3')) { ?>
		<div class="post-cat-three">
			<?php } else { ?>
			<div class="post">
				<?php } ?>


				<!-- Display the Post's Content in a div box. -->
				<div class="entry">
					<?php the_content(); ?>
				</div>

			</div> <!-- closes the first div box -->

			<!-- Stop The Loop (but note the "else:" - see next line). -->
			<?php endwhile; else: ?>

				<!-- The very first "if" tested to see if there were any Posts to -->
				<!-- display.  This "else" part tells what do if there weren't any. -->
				<p>Sorry, no posts matched your criteria.</p>

				<!-- REALLY stop The Loop. -->
			<?php endif; ?>

		</div>
	</div>
</div>
</body>
</html>