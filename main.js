// DOM
const resultContainer = document.getElementById("result-container");
const form = document.getElementById("form");
const idInput = document.querySelector(".form__input");

//TRAER DE API
const requestData = async (id) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//GUARDAR INFO
let pokemones = JSON.parse(localStorage.getItem("pokemones")) || [];

const saveLocalStorage = (pokemones) => {
	localStorage.setItem("pokemones", JSON.stringify(pokemones));
};

//RENDER
const getPokeHtml = ({ name, sprites, height, weight, types }) => {
	return `
    <div class="poke__container">
		<img src="${sprites.other.home.front_default}" alt="" class="" />
		<div class="card__info">
			<h2 class="">${name.toUpperCase()}</h2>
			<div class="tipo-poke">
			    ${types
					.map((tipo) => {
						return ` <span class="poke__type">${tipo.type.name}</span>`;
					})
					.join("")}
			</div>
			<p class="poke-height">Altura: ${height / 10}m</p>
			<p class="poke-weight">Peso: ${weight / 10}kg</p>
		</div>
	</div>
    `;
};

const renderResult = (value) => {
	if (pokemones.id === value) {
		resultContainer.innerHTML = getPokeHtml();
		form.reset();
		return;
	} else {
		alert("El ID ingresado no existe. Realice una nueva búsqueda.");
		form.reset();
		return;
	}
};

//ERROR
const showEmptyError = () => {
	resultContainer.innerHTML = `
    <div class="poke__container">
        <h2 class="error-title">Por favor, ingrese un número para hacer la búsqueda.</h2>
    </div>
    `;
};

//BUSQUEDA Y RENDERIZADO
const submitSearch = async (e) => {
	e.preventDefault();

	//INPUT NUMBER
	const searchedValue = Number(idInput.value);
	//FETCHED DATA
	const fetchedPoke = await requestData();

	// si esta vacio
	if (!searchedValue) {
		showEmptyError();
		return;
	}

	renderResult(Number(searchedValue));

	pokemones = [fetchedPoke, ...pokemones];
	saveLocalStorage(pokemones);
};

const init = () => {
	form.addEventListener("submit", submitSearch);
};

init();
