const uuid = "LASSPBUAUAXABBMBOBAB";

getAllClaims();

function getAllClaims()
{
	let xhr = new XMLHttpRequest();
	console.log("CORS snippet test");
	xhr.onload = function()
	{
		console.log(this.responseText);
	};
	xhr.onerror = function()
	{
		console.error("cors get all claims");
	};
	xhr.open("POST", "140.131.178.248:8000", true);
	xhr.send('{"command":"get_all_claims","uuid":"' + uuid + '"}');
}
