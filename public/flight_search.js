/* jquery global */

$(document).ready(() => {
	$("#submit").click(() => {
		$("#display").load("/flight/list", (responseTxt, statusTxt, xhr) => {
			if (statusTxt == "success")
				console.log("External content loaded successfully!");
			if (statusTxt == "error")
				console.log("Error: " + xhr.status + ": " + xhr.statusText);
		});
	});
});
