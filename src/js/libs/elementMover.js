const rootFontSizeCheckElement = document.createElement('div')
rootFontSizeCheckElement.innerText = 'Text to check font size'
rootFontSizeCheckElement.ariaHidden = true
rootFontSizeCheckElement.classList.add('--font-size-check')

document.body.prepend(rootFontSizeCheckElement)

const elementMoverInit = (queryType, querySize, child, oldParent, newParent) => {
	let mediaQuery = matchMedia(`(${queryType}: ${querySize / 16}em)`)

	document.addEventListener('DOMContentLoaded', moveElement)
	mediaQuery.addEventListener('change', moveElement)
	new ResizeObserver(moveElement).observe(rootFontSizeCheckElement)

	function moveElement() {
		if (mediaQuery.matches) newParent.append(child)
		else oldParent.append(child)
	}
}

export default elementMoverInit
