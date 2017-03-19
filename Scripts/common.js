var TW = {};
$().ready(function ()
{
	$('#back-top a').click(function ()
	{
		$('body,html').animate(
		{
			scrollTop: 0
		}, 800);
		return false;
	});
	$(window).on("scroll", function (e)
	{
		var yOffset = 0;
		if (typeof pageYOffset != "undefined")
		{
			yOffset = pageYOffset;
		}
		else
		{
			var B= document.body; //IE 'quirks'
			var D= document.documentElement; //IE with doctype
			D= (D.clientHeight)? D: B;
			yOffset = D.scrollTop;
		}
		var hideNav = (yOffset > 80);
		TW.toggleBackToTop(hideNav ? 1 : 0);
	});
	//if ($("#width").length === 0)
	//{
	//	$("body").prepend("<div id=\"width\"></div>");
	//}
	//$(window).resize(function(e)
	//{
	//	TW.showWidth();
	//});
	//TW.showWidth();
});

TW.showWidth = function ()
{
	$("#width").text("Width: " + $(document).width());
};

TW.toggleBackToTop = function (opacity)
{
	$('#back-top').stop(true).animate(
    {
    	opacity: opacity
    }, 400);
};

TW.scrollTo = function(path)
{
	$("html, body").animate(
	{
		scrollTop: $(path).offset().top
	}, 800);
};

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-40520697-1']);
_gaq.push(['_trackPageview']);