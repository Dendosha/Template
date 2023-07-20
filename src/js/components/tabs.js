const arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']

const tabsInit = () => {
	const tabLists = document.querySelectorAll('[role="tablist"]')

	tabLists.forEach(tabList => {
		const tabPanelWrapper = document.getElementById(`${tabList.dataset.controls}`)

		tabList.addEventListener('click', (e) => {
			const currentTabButton = e.target
			if (
				currentTabButton.tagName !== 'A' ||
				currentTabButton.getAttribute('role') !== 'tab' ||
				currentTabButton.getAttribute('aria-selected') === 'true'
			) return

			const selectedTabButton = tabList.querySelector('[aria-selected="true"]')
			selectTab(selectedTabButton, currentTabButton)
		})

		tabList.addEventListener('keydown', (e) => {
			const currentTabButton = e.target
			if (
				currentTabButton.tagName !== 'A' ||
				currentTabButton.getAttribute('role') !== 'tab'
			) return

			if (arrowKeys.includes(e.key)) e.preventDefault()

			const currentListItem = currentTabButton.closest('li')

			switch (e.key) {
				case arrowKeys[0]:
				case arrowKeys[1]:
					if (currentListItem.previousElementSibling) selectTab(currentTabButton, currentListItem.previousElementSibling.querySelector('a'))
					else selectTab(currentTabButton, tabList.lastElementChild.querySelector('a'))
					break
				case arrowKeys[2]:
				case arrowKeys[3]:
					if (currentListItem.nextElementSibling) selectTab(currentTabButton, currentListItem.nextElementSibling.querySelector('a'))
					else selectTab(currentTabButton, tabList.firstElementChild.querySelector('a'))
					break
			}
		})

		function selectTab(oldTabButton, newTabButton) {
			oldTabButton.setAttribute('aria-selected', 'false')
			oldTabButton.setAttribute('tabindex', '-1')

			newTabButton.setAttribute('aria-selected', 'true')
			newTabButton.setAttribute('tabindex', '0')
			newTabButton.focus()

			tabPanelWrapper.querySelector(`#${oldTabButton.getAttribute('aria-controls')}`).hidden = true
			tabPanelWrapper.querySelector(`#${newTabButton.getAttribute('aria-controls')}`).hidden = false
		}
	})
}

export default tabsInit