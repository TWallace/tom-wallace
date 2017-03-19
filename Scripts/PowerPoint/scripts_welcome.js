$(document).ready(function ()
{
	$("#gallery_body").bind("click", galleryClick);
	//setup scrollable
	//var api = $("#gallery").scrollable({ circular: true }).navigator({ navi: '.welcome_nav_bar' }).autoscroll({ autoplay: true, interval: 4000 });
	var api = $("#gallery").scrollable({ circular: true }).navigator({ navi: '.welcome_nav_bar' }).autoscroll({ autoplay: true, interval: 4000 });
	$(".welcome_nav_bar li a").mouseover(function ()
	{
		api.pause;
	});
	api.scrollable().onBeforeSeek(function (event, i)
	{
		$(".welcome_nav_bar li img").each(function (i)
		{
			$(this).attr("src", $(this).attr("src").replace("_active.jpg", ".jpg"));
		});
		var img;
		img = ".seek" + parseInt((i < 6) ? (i + 1) : 1) + " img";
		$(img).attr("src", $(img).attr("src").replace(".jpg", "_active.jpg"));
	});
});

function btnLikeClick(evt) 
{
    $("#btnLike").toggleClass("active");
    $("#btnDownload").toggleClass("active");
}
function galleryClick(evt) 
{
    $("#btnLike").animate({ color: "#ff9900" }, 600);
    $("#btnLike").animate({ color: "#000000" }, 600);
}