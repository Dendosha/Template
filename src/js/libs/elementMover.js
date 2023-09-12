const elementMoverInit = (query, child, oldParent, newParent) => {
	const mediaQuery = matchMedia(query)

	document.addEventListener('DOMContentLoaded', moveElement)
	mediaQuery.addEventListener('change', moveElement)

	function moveElement() {
		if (mediaQuery.matches) newParent.append(child)
		else if (!oldParent.contains(child)) oldParent.append(child)
	}
}

export default elementMoverInit