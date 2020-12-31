"use strict";

const jokeBtn = document.getElementById("joke-btn");
const jokeContent = document.getElementById("joke-content");
const jokeContainer = document.querySelector(".joke-container");

setCategory();
jokeBtn.addEventListener("click", fetchUserJokes);
jokeContainer.addEventListener("click", function () {
	document.querySelector(".joke-copy").classList.add("joke-seen");
	setTimeout(() => {
		document.querySelector(".joke-copy").classList.remove("joke-seen");
	}, 1000);
	const textarea = document.createElement("textarea");
	textarea.value = jokeContent.textContent;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
});
document.getElementById("popup-close").addEventListener("click", function () {
	document.querySelector(".error-container").style.display = "none";
	window.location.reload();
});

async function fetchUserJokes() {
	try {
		const categoryValue = document.getElementById("category").value;
		const url = "https://api.chucknorris.io/jokes/random?category";
		const res = await fetch(`${url}=${categoryValue}`);
		const data = await res.json();
		const { value: jokeValue } = data;
		jokeContent.innerHTML = jokeValue;
		jokeContainer.classList.add("not-hidden");
	} catch (error) {
		console.log(error);
		document.querySelector(".error-container").style.display = "flex";
	}
}

function setCategory() {
	fetchJokesCategories().then(function (jokeCat) {
		jokeCat.forEach(function (element) {
			const option = document.createElement("option");
			option.setAttribute("value", element);
			option.classList.add("category-option");
			option.innerHTML = element;
			document.getElementById("category").appendChild(option);
		});
	});
}

async function fetchJokesCategories() {
	try {
		const url = "https://api.chucknorris.io/jokes/categories";
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		document.querySelector(".error-container").style.display = "flex";
	}
}
