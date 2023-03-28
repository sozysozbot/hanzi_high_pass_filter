const replace_hanzi_not_in_list = (list, x) => c => {
	if (list.includes(c)) {
		return c; // Known hanzi; replace
	}
	if (c.match(/\p{sc=Han}/u)) { // Hanzi, but not known
		return x; // replace
	}
	return c; // Non-Hanzi; don't replace
};

const update_textarea_lang = () => {
	const radios = document.querySelectorAll("input[name=language]");
	for (const radio of radios) {
		if (radio.checked) {
		   document.getElementById("in").lang = radio.value;
		   document.getElementById("out").lang = radio.value;
		}
	}
}

const high_pass = (text, list, x) => [...text].map(replace_hanzi_not_in_list(list, x)).join("");

const FREQS = { zh: CHINESE_FREQ, ja: JAPANESE_FREQ };

const main = () => {
	const radios = document.querySelectorAll("input[name=language]");
	const list = (() => {
		for (const radio of radios) {
			if (radio.checked) {
				return FREQS[radio.value].slice(0, Number(document.getElementById("count").value));
			}
		}
	})();
	const x = document.getElementById("x").value;
	document.getElementById("out").value = high_pass(
		document.getElementById("in").value,
		list,
		x
	);
};