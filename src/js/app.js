// Burger menu
// import burgerInit from "./libs/burger.js"



// Dynamic element mover
// import elementMoverInit from "./libs/elementMover.js"

// const elementsToMove = document.querySelectorAll('[data-mover]')
// elementsToMove.forEach(element => {
// 	const moveSettings = element.dataset.mover.split(',')
// 	const newParent = document.getElementById(moveSettings[2].trim())
// 	elementMoverInit(moveSettings[0].trim(), moveSettings[1].trim(), element, element.parentElement, newParent)
// })



// Tabs
// import tabsInit from "./libs/tabs.js"



// Custom select
// import SelectList from "./libs/selectlist.js";

// const selectLists = document.querySelectorAll('[data-custom-element="selectlist"]')

// let selectListsCount = 0
// selectLists.forEach(element => {
// 	selectListsCount++

// 	const options = {
// 		placeholder: element.dataset?.placeholder,
// 		label: element.dataset?.label,
// 		labelledby: element.dataset?.labelledby,
// 		listboxId: element.dataset.listboxId ?? `selectlist-${selectListsCount}`,
// 		selectlistItems: element.dataset?.selectlistItems?.split(/;\s*/g),
// 		selectedItemIndex: element.dataset?.selectedItemIndex,
// 		visibleItemsCount: 4,
// 	}

// 	new SelectList(element, options)
// })

// Page scripts
import "./components/pages/index.js"
