$().ready(function ()
{
	if (window.location.hash)
	{
		TW.scrollTo(window.location.hash);
	}
	
	$("#resume .nav-list a").click(function(e)
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
			
	$("body").scrollspy();
});