# Internet noise-cancelling headphones

This is a proof-of-concept extension that uses a model on HuggingFace to classify text on web-pages
as LLM-generated and fades out the paragraphs that are high-confidence AI-generated. The model I used
in my experimentation is the [roberta-base-openai-detector](https://huggingface.co/roberta-base-openai-detector) that
was trained on GPT-2, but seems to work well enough on GPT-3 and ChatGPT output.

Using the free inference API quickly gets rate-limited, so I had to spin up m own instance, there is a clear
speed/cost trade-off, though it will run just fine on the smallest instance size.

The manifest file allows you to specify which domains this extension will work against, I put a few examples in there.
Update `nch.js` with the API key and API endpoint and install it into your browser and give it a try!

By enabling Developer Mode in the Extensions page of your Chromium-based browser, you can then Load unpacked
extensions, point it at the root of this repo and you should be able to install it.
