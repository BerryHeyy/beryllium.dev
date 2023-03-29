let displaying = false;

let content_cache;

let pgp_toggle;

let debounce = false;

window.addEventListener("load", () => {
	pgp_toggle = document.getElementById("pgp_toggle");

	pgp_toggle.addEventListener("click", (e) => {
		if (debounce)
		{
			debounce = false;
			return;
		}

		toggle_display_pgp();

		debounce = true;
	});

});


function toggle_display_pgp()
{
	const pgp_begin_block = document.getElementById("contentpgpbegin");
	const pgp_end_block = document.getElementById("contentpgpend");
	const content = document.getElementById("blogcontent");

	// Cache the content if not displaying.
	if (!displaying)
	{
		content_cache = content.innerHTML;
	}

	displaying = !displaying;

	// Display the pgp blocks.
	pgp_begin_block.style.display = displaying ? "block" : "none";
	pgp_end_block.style.display = displaying ? "block" : "none";

	if (displaying)
	{
		var encodedStr = content.innerHTML.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
			return '&#'+i.charCodeAt(0)+';';
		});

		content.innerHTML = encodedStr;
		content.style.whiteSpace = "pre-wrap";
	}
	else
	{
		content.innerHTML = content_cache;
		content.style.whiteSpace = "normal";
	}
}
