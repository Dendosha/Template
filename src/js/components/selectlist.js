class SelectList {
	static #allSelectLists = new Map()

	constructor(element, options) {
		this.element = element
		this.options = options ?? {
			placeholder: '',
			label: 'Custom selectlist',
			selectlistItems: ['Option 1', 'Option 2'],
			visibleItemsCount: 4,
		}

		const selectlistHTML = this.#render()

		SelectList.#allSelectLists.set(element, selectlistHTML)

		if (this.options.selectedItemIndex) this.select(this.options.selectedItemIndex)
	}

	get #html() {
		return SelectList.#allSelectLists.get(this.element)
	}

	#render() {
		const input = document.createElement('input')
		input.type = 'text'
		input.ariaHidden = true
		input.tabIndex = -1
		input.classList.add('--visually-hidden')

		const combobox = document.createElement('div')
		combobox.innerText = this.options.placeholder
		combobox.tabIndex = 0
		combobox.role = 'combobox'
		this.options.label && combobox.setAttribute('aria-label', this.options.label)
		this.options.labelledby && combobox.setAttribute('aria-labelledby', this.options.labelledby)
		combobox.ariaHasPopup = 'listbox'
		combobox.ariaExpanded = false
		combobox.classList.add('--selectlist__combobox')

		const listboxWrapper = document.createElement('div')
		listboxWrapper.classList.add('--selectlist__listbox-wrapper')

		const listbox = document.createElement('ul')
		listbox.id = this.options?.listboxId
		listbox.role = 'listbox'
		listbox.classList.add('--selectlist__listbox')

		this.options.selectlistItems.forEach((item, index) => {
			const selectlistOption = document.createElement('li')
			selectlistOption.innerText = item
			selectlistOption.id = `${this.options.listboxId}-${index}`
			selectlistOption.role = 'option'
			selectlistOption.setAttribute('aria-selected', false)
			selectlistOption.classList.add('--selectlist__option')

			listbox.append(selectlistOption)
		})

		const elementAttributes = Array.from(this.element.attributes)
		elementAttributes.forEach(attribute => {
			if (attribute.name.startsWith('data-')) this.element.removeAttribute(attribute.name)
		})

		this.element.append(input)
		this.element.append(combobox)
		this.element.append(listboxWrapper)
		listboxWrapper.append(listbox)

		return {
			input,
			combobox,
			listboxWrapper,
			listbox
		}
	}

	open() {
		this.#html.combobox.setAttribute('aria-expanded', true)
		this.#html.combobox.setAttribute('aria-controls', this.#html.listbox.id)

		const selectedOption = this.#html.listbox.querySelector('li[aria-selected="true"]')
		if (selectedOption) this.#html.combobox.setAttribute('aria-activedescendant', selectedOption.id)
	}

	close() {
		this.#html.combobox.setAttribute('aria-expanded', false)
		this.#html.combobox.removeAttribute('aria-controls')
		this.#html.combobox.removeAttribute('aria-activedescendant')
	}

	select(selectedItemIndex) {
		const selectedItem = document.getElementById(`${this.options.listboxId}-${selectedItemIndex}`)
		if (selectedItem) {
			this.#html.listbox.querySelector('li[aria-selected="true"]')?.setAttribute('aria-selected', false)
			selectedItem.setAttribute('aria-selected', true)
			this.#html.input.value = this.#html.combobox.innerText = selectedItem.innerText
		}

		return
	}
}

export default SelectList