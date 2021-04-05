var gaTag = document.createElement('script');
gaTag.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=UA-154149980-1');
gaTag.async = true;
document.head.appendChild(gaTag);

var gaTag2 = document.createElement('script');
gaTag2.innerHTML= "  window.dataLayer = window.dataLayer || [];\n" +
	"  function gtag(){dataLayer.push(arguments);}\n" +
	"  gtag('js', new Date());\n" +
	"\n" +
	"  gtag('config', 'UA-154149980-1');";
document.head.appendChild(gaTag2);