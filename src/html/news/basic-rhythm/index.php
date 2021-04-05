<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="favicon" href="../../assets/images/icons/favicon.png">
	<link rel="apple-touch-icon" href="../../assets/images/icons/favicon2.png">
	<title>News (Basic Rhythm) | Entropy & Energy</title>
	<meta content="Imaginary Forces, East Man, Hi Tek Sounds, Sleep Codes, Basic Rhythm, Type, Fang Bomb, Bedouin, Planet Mu" name="keywords">
	<link rel="stylesheet" href="../../assets/css/libraries.css">
	<link rel="stylesheet" href="../../assets/css/app.css">
</head>
<body> 
	<?php
	/* Short and sweet */
	define('WP_USE_THEMES', false);
	require('../../wp-blog-header.php');
	?>
	<div class="container news">
	<div class="top-space"></div>
	<nav class="menu col-xs-12 col-sm-2">
	<ul>
		<li><a href="/news">News</a></li>
		<li><a href="/events">Events</a></li>
		<li><a href="/discography">Discography</a></li>
		<li><a href="/biography">Biography</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
	<ul style="margin-left: 90px;">
		<li>
			<a href="/news/basic-rhythm">Basic Rhythm</a>
		</li>
		<li>
			<a href="/news/east-man">East Man</a>
		</li>
	</ul>
	</nav>
	<div class="col-xs-12 col-sm-10"> <?php
		if ( have_posts() ) :
	
			/* Start the Loop */
			while ( have_posts() ) : the_post();
	
				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template-parts/post/content', get_post_format() );
	
			endwhile;
	
			the_posts_pagination( array(
				'prev_text' => twentyseventeen_get_svg( array( 'icon' => 'arrow-left' ) ) . '<span class="screen-reader-text">' . __( 'Previous page', 'twentyseventeen' ) . '</span>',
				'next_text' => '<span class="screen-reader-text">' . __( 'Next page', 'twentyseventeen' ) . '</span>' . twentyseventeen_get_svg( array( 'icon' => 'arrow-right' ) ),
				'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentyseventeen' ) . ' </span>',
			) );
	
		else :

			get_template_part( 'template-parts/post/content', 'none' );
	
		endif;
		?> </div>
	</div>
	<script src="../../assets/js/libraries.js"></script>
	<script src="../../assets/js/app.js"></script>
</body>
</html>