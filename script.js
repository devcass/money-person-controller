const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

let data = [];

getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
	const data = await (await fetch('https://randomuser.me/api')).json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	};

	addData(newUser);
}

function doubleMoney() {
	data = data.map((person) => ({
		...person,
		money: person.money * 2
	}));

	updateDOM();
}

function sortByRichest() {
	data.sort((a, b) => b.money - a.money);

	updateDOM();
}

function showOnlyMillionaries() {
	data = data.filter((person) => person.money >= 1000000);

	updateDOM();
}

function calculateWealth() {
	const wealth = data.reduce((acc, user) => (acc += user.money), 0);

	const wealthEl = document.createElement('div');

	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

	main.appendChild(wealthEl);
}

function addData(obj) {
	data.push(obj);

	updateDOM();
}

function formatMoney(number) {
	return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

function updateDOM(providedData = data) {
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

	providedData.forEach((person) => {
		const element = document.createElement('div');

		element.classList.add('person');
		element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
		main.appendChild(element);
	});
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaries);
calculateWealthBtn.addEventListener('click', calculateWealth);
