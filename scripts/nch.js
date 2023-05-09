/*
Noise-cancelling headphones for the internet

(C) 2023 Jacob Torrey

This extension classifies all the text in every <p> on a page using a HuggingFace LLM-detector model.
It sets the opacity of the <p> to the confidence that the <p> is human-written, so LLM-generated content
fades away.
*/

var API_ENDPOINT = 'https://XYZ.endpoints.huggingface.cloud';
var API_KEY = 'hf_XYZ';

/*
    Queries the LLM detector API providing some text to analyze, returning an array of JSON objects with 'Fake' or 'Real' scores
*/
async function query(data) {
	const response = await fetch(
		API_ENDPOINT,
		{
			headers: { Authorization: "Bearer " + API_KEY, "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({"inputs": data}),
		}
	);
	const result = await response.json();
	return result;
}

const divs = document.querySelectorAll('p');
divs.forEach(element => {
    if (element.textContent && element.textContent.length >= 100 && element.textContent.length < 4500) {
        query(element.textContent).then((response) => {
            if (!Array.isArray(response)) {
                console.log("Error retrieving AI detection score!");
            } else {
                var ai = response[0];
                var opacity = ai.label == 'Fake' ? 1 - ai.score : ai.score;
                opacity = Math.round(opacity * 100) / 100;
                console.log("Opacity: " + opacity);
                element.style.transition = "color 2s ease-out";
                element.style.color = "rgba(0, 0, 0, " + opacity + ")";
            }
        });
    }
});