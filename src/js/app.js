// import burgerInit from "./components/burger.js"
// import elementMoverInit from "./components/elementMover.js"
// import tabsInit from "./components/tabs.js"
import SelectList from "./components/selectlist.js";

const selectLists = document.querySelectorAll('[data-custom-element="selectlist"]')
let createdSelectList

let selectListsCount = 0
selectLists.forEach(element => {
	selectListsCount++

	const options = {
		placeholder: element.dataset.placeholder ?? '',
		label: element.dataset?.label,
		labelledby: element.dataset?.labelledby,
		listboxId: element.dataset.listboxId ?? `selectlist-${selectListsCount}`,
		selectlistItems: element.dataset.selectlistItems.split(/;\s*/g),
		selectedItemIndex: element.dataset.selectedItemIndex,
		visibleItemsCount: 4,
	}

	const currentSelectlist = new SelectList(element, options)
	createdSelectList = currentSelectlist
})

const openButton = document.getElementById('openButton')
openButton.addEventListener('click', (e) => createdSelectList.open())

const closeButton = document.getElementById('closeButton')
closeButton.addEventListener('click', (e) => createdSelectList.close())

const indexInput = document.getElementById('indexInput')
const selectButton = document.getElementById('selectButton')
selectButton.addEventListener('click', (e) => createdSelectList.select(indexInput.value))