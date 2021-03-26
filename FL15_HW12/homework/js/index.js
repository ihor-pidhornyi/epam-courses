function visitLink(path) {
	const obj = JSON.parse(localStorage.getItem('pagesClicked')) || {};
	obj[path] = obj[path] ? ++obj[path] : 1;
	localStorage.setItem('pagesClicked', JSON.stringify(obj));
}

function viewResults() {
	const wrapper = document.getElementById('content');
	const pages = JSON.parse(localStorage.getItem('pagesClicked')) || {};

	let list = document.querySelector('#list');
	if (!list) {
		list = document.createElement('ul');
		list.id = 'list';
	} else {
		list.innerHTML = '';
	}
	for(let page in pages) {
		const row = document.createElement('li');
		row.textContent = `You visited ${page} ${pages[page]} time(s)`;
		list.append(row);
	}
	wrapper.append(list);
	localStorage.clear();
}
