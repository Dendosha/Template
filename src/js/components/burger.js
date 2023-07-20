const burgerInit = (burgerIcon, navigation) => {
	burgerIcon.addEventListener('click', () => {
		const expanded = burgerIcon.getAttribute('aria-expanded')
		toggleMenuState(expanded)
	})

	navigation.addEventListener('click', (e) => {
		if (e.target.tagName === 'A') toggleMenuState('true')
	})

	function toggleMenuState(expanded) {
		if (expanded === 'false') {
			burgerIcon.setAttribute('aria-expanded', 'true')
			navigation.dataset.visible = 'true'
			document.body.classList.add('--locked')
		} else {
			burgerIcon.setAttribute('aria-expanded', 'false')
			navigation.dataset.visible = 'false'
			document.body.classList.remove('--locked')
		}
	}
}

export default burgerInit