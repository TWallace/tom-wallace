$().ready(function()
{
	TW.getStoredValues("session");
	$("form").on("submit", function(e)
	{
		e.preventDefault();
		TW.submitContactForm();
	});
	$("#Subject").on("keyup", function(e)
	{
		window.sessionStorage.setItem("subject", $("#Subject").val());
	});
	$("#Message").on("keyup", function(e)
	{
		window.sessionStorage.setItem("message", $("#Message").val());
	});
});

TW.getStoredValues = function(type)
{
	var storage = window[type + "Storage"];
	if (window[type + "Storage"] === undefined)
	{
		return;
	}
	if (storage.getItem("subject"))
	{
		$("#Subject").val(storage.getItem("subject"));
	}
	if (storage.getItem("message"))
	{
		$("#Message").val(storage.getItem("message"));
	}
};

TW.submitContactForm = function()
{
	$('#formAlert').html('');
	var $form = $('form');
	if ($form.valid())
	{
		
		var data = $form.serialize();
		$.ajax(
		{
			url: "Contact",
			type: "POST",
			data: data,
			success: function(response)
			{
				//$.validator.unobtrusive.parse($('#contact_form'));
				//clear sessionStorage values on successful submit
				window.sessionStorage.removeItem("subject");
				window.sessionStorage.removeItem("message");
				TW.setFormValidation();
				$("#contactForm").html(response);
			},
			error: function(xhr, status, error)
			{
				$("#contactStatus").text(error).show();
			}
		});
	}
	else
	{
		$('#validation_summary').show();
	}
	TW.setFormValidation();
};

TW.setFormValidation = function()
{
	$('.input-validation-error').each(function () {
		$(this).closest('li').addClass("error");
	})
};
;