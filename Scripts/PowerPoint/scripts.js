$(document).ready(function ()
{
	var hover_speed = 300;
	var fade_speed = 800;
	//setup scrollable
	$(function ()
	{
		var current_slide = 0;
		var root = $("#gallery").scrollable({ circular: true }).navigator({ navi: '#modal ul' });
		root.scrollable().onSeek(function (event, i)
		{
			$("#status li").removeClass("active").eq(i).addClass("active");
			$("#artist_bio_text img").removeClass("active").eq(i).addClass("active");
			$("#artist_bio_text div").removeClass("active").eq(i).addClass("active");
			$("#artist_bio_img img").removeClass("active").eq(i).addClass("active");
			//$(".download a").removeClass("active").eq(i).addClass("active");
			$("#gallery_header div").removeClass("active").eq(i).addClass("active");
			current_slide = i;

			//hide all artist name unless it's the one we're looking at
			$("#modal_artist_name span").each(function (i)
			{
				if (i == current_slide)
					$(this).removeClass("hidden");
				else
					$(this).addClass("hidden");
			});

			$("#gallery_header h1").each(function (i)
			{
				if (i == current_slide)
					$(this).removeClass("hidden");
				else
					$(this).addClass("hidden");
			});
		});
		root.scrollable().onBeforeSeek(function (event, i)
		{
			$.modal.close();
		});
		$("#more_artist_templates .btnDownloadEnabled a").click("click", function(e)
		{
			e.preventDefault();
			return false;
		});
		//setup trigger for modal
		$("#nav_all_templates a").click(function ()
		{
			$("#modal").modal(
			{
				overlayClose: true,
				opacity: 90,
				closeClass: "modal_close",
				escClose: true,
				position: [170, 150],
				onOpen: function (dialog)
				{
					dialog.overlay.fadeIn(hover_speed);
					dialog.container.fadeIn(hover_speed);
					dialog.data.fadeIn(hover_speed);

				},
				onClose: function (dialog)
				{
					dialog.overlay.fadeOut(hover_speed);
					dialog.container.fadeOut(hover_speed);
					dialog.data.fadeOut(hover_speed, function () { $.modal.close(); });
				}
			});
			//set the appropriate thumb in the modal to active, based on which slide we're currently viewing
			$("#modal ul a").each(function (i)
			{
				if (i == current_slide)
				{
					var img = $(this).find("img");
					var imgSrc = $(img).attr("src");
					$(img).attr("src", imgSrc.replace(".jpg", "_active.jpg"));
				}
					
			});
		});
		$("#modal ul a").each(function (i)
		{
			$(this).click(function ()
			{
				//we need to change the src images for the navigation thumbnails
				//first remove "_active" from the file name of all of them
				$("#modal ul a").each(function (i)
				{
					$("img", this).attr("src", $("img", this).attr("src").replace("_active", ""));
				});
				var orig_src = $("img", this).attr("src");
				$("img", this).attr("src", orig_src.replace(".jpg", "_active.jpg"));
			});
		});
	});

	//setup hover functions for slides within the scrollable

	$(".gallery_li").hover(
		function () //mouseover
		{
			//first stop any existing animation on the objects we are animating. this prevents them being queued after repeated mouseenter/mouseleave events happen too quickly
			$("#" + (this).id + " .gallery_thumbs").stop().animate();

			$("#" + (this).id + " .gallery_thumbs").animate({
				opacity: 1.00,
				height: "114px",
				top: "456px",
				queue: false
			}, hover_speed, function ()
			{
				//$("#lblstatus").html("Animation complete");
			});
		},
		function () //mouseout
		{
			//first stop any existing animation on the objects we are animating. this prevents them being queued after repeated mouseenter/mouseleave events happen too quickly
			$("#" + (this).id + " .gallery_actions").stop().animate();
			$("#" + (this).id + " .gallery_thumbs").stop().animate();
			//			if (jQuery("#" + (this).id + " .gallery_actions").length > 0)
			//				$("#lblstatus").html("#" + (this).id + " .gallery_actions exists. Attempting to hide it.");
			//			else
			//				$("#lblstatus").html("#" + (this).id + " .gallery_actions does not exist!");
			$("#" + (this).id + " .gallery_actions").animate(
			{
				opacity: 0.00,
				height: "0px",
				width: "250px",
				queue: false
			}, hover_speed, function ()
			{
				//$("#lblstatus").html("#" + (this).id + " .gallery_actions should now be hidden.");
			});

			$("#" + (this).id + " .gallery_thumbs").animate(
			{
				opacity: 0.00,
				height: "0",
				top: "570px",
				queue: false
			}, hover_speed, function ()
			{

			});
		});

	$(".gallery_thumbs a").click(
	function ()
	{
		//if img filename has "_active" in it, do nothing as this image is already set to active
		var orig_src = $("img", this).attr("src");
		if (orig_src.indexOf("_active") == -1)
		{
			var img_id = orig_src.substr(orig_src.length - 5, 1);
			//we need to loop through all siblings and remove "_active" from their child img filenames
			$(this).parent().siblings().each(function (i)
			{
				$("img", this).attr("src", $("img", this).attr("src").replace("_active", ""));
			});

			//now let's set the img we clicked on to active
			$("img", this).attr("src", orig_src.replace(".jpg", "_active.jpg"));

			//finally we need to change the img src of the slide to match the thumbnail that was clicked
			//we can find the number of the thumbnail clicked in the src
			//since there are only 5 thumbs per slide, we don't have to worry about this number being 2 digits, so let's just take the single digit 5 digits from the end (before the .jpg)
			var current_slide_id = $(this).parent().parent().parent().attr("id"); //will be a name like gallery_1

			current_slide_id = current_slide_id.substr(current_slide_id.length - 1, 1); //get just last digit of this name
			//we need to find out which image in this gallery should now be active
			var img_slide = $("img.active", $(this).parent().parent().parent());
			//alert("new img id is: #g" + current_slide_id + "_i" + img_id);
			var new_img_slide = $(".g" + current_slide_id + "_i" + img_id);

			img_slide.animate({
				opacity: 0.00,
				queue: false
			}, fade_speed);
			new_img_slide.animate({
				opacity: 1.00,
				queue: false
			}, fade_speed);
			img_slide.removeClass("active");
			new_img_slide.addClass("active");
		}
	});

});