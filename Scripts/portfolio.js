$().ready(function ()
{
	TW.adjustPageHeight();
	$(window).resize(function(e)
	{
		TW.adjustPageHeight();
	});
	if (window.location.hash)
	{
		TW.scrollTo(window.location.hash);
	}
	$("#portfolio").on("click", ".btnBuck", function(e)
	{
		$("#buckModal").modal({
					
		});
		$("#buckModal").on("shown", function()
		{
			TW.adjustModalImageHeight();
		});
	});
	
	$("#portfolio .nav-list a").click(function(e)
	{
		e.preventDefault();
		var path = $(this).attr("href");
		//not sure why this is necessary
		if (path === "#")
		{
			path = "#p4";
		}
		TW.scrollTo(path);
	});
			
	$("#buckSlider").responsiveSlides(
	{
		auto: true,
		pager: true,
		pause: true,
		nav: true,
		prevText: "&larr;",
		nextText: "&rarr;",
		pauseControls: true,
		maxwidth: 800,
		speed: 800
	});
	$("#buckModal .modal-body").on(
	{
		mouseenter: function()
		{
			$("#buckModal .prev, #buckModal .next").css("opacity", "1");
		},
		mouseleave: function()
		{
			$("#buckModal .prev, #buckModal .next").css("opacity", "0.1");
		}
	});
	$("body").scrollspy();
});

TW.getMaxModalHeight = function()
{
	var vHeight = $(window).height();
	return Math.round(vHeight * 0.8);
};

TW.adjustModalImageHeight = function()
{
	var maxModalHeight = TW.getMaxModalHeight();
	$("#buckModal .modal-body").css("max-height", maxModalHeight + "px").css("overflow", "hidden");
	$("#buckModal .rslides li img").each(function(i)
	{
		var img = $(this),
			origWidth = $(this).width(),
			origHeight = $(this).height();
		if (origHeight > maxModalHeight)
		{
			var newHeight = (maxModalHeight - 80);
			$(img).css("height", newHeight);
			$(img).css("width", Math.round((newHeight / origHeight) * origWidth));
		}
	});
};

TW.adjustPageHeight = function()
{
	$("#portfolio .page").each(function(i)
	{
		$(this).css("min-height", ($(window).height() + 20) + "px");
	});
};