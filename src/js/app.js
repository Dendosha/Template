// import burgerInit from "./components/burger.js"
// import elementMoverInit from "./components/elementMover.js"
// import tabsInit from "./components/tabs.js"
import SelectList from "./components/selectlist.js";

const selectLists = document.querySelectorAll('[data-custom-element="selectlist"]')
let selectListsCount = 0
selectLists.forEach(element => {
	selectListsCount++

	const options = {
		placeholder: element.dataset.placeholder ?? '',
		label: element.dataset?.label,
		labelledby: element.dataset?.labelledby,
		listboxId: element.dataset.listboxId ?? `selectlist-${selectListsCount}`,
		selectlistItems: element.dataset.selectlistItems.split(/;\s*/g),
		visibleItemsCount: 4,
	}

	new SelectList(element, options)
})