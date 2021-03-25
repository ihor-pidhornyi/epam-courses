function visitLink(path) {
	const obj = JSON.parse(localStorage.getItem('pagesClicked')) || {};
	if(!Object.keys(obj).length) {
		setDefaultData(obj);
	}
	obj[path] = obj[path] ? ++obj[path] : 1;
	localStorage.setItem('pagesClicked', JSON.stringify(obj));
}

function viewResults() {
	const wrapper = document.getElementById('content');
	const pages = JSON.parse(localStorage.getItem('pagesClicked')) || {};
	if (!Object.keys(pages).length) {
		setDefaultData(pages);
	}

	if (wrapper && !document.querySelector('#list')) {
		const list = document.createElement('ul');
		list.id = 'list';
		for (let page in pages) {
			const row = document.createElement('li');
			row.textContent = `You visited ${page} ${pages[page]} time(s)`;
			list.append(row);
		}
		wrapper.append(list);
	} else {
		const liList = document.querySelector("#list").childNodes;
		let i = 0;
		for(let page in pages) {
			liList[i].textContent = `You visited ${page} ${pages[page]} time(s)`;
			i++;
		}
	}

}

function setDefaultData(obj) {
	const pageNodes = document.querySelectorAll('.nav-item');
	for (let i = 1; i < pageNodes.length; i++) {
		obj[`Page${i}`] = 0;
	}
	localStorage.setItem('pagesClicked', JSON.stringify(obj));
};