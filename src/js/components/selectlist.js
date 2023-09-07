class SelectList {
	static #allSelectLists = []

	constructor(element, options) {
		this.element = element
		this.options = options ?? {
			placeholder: '',
			label: 'Custom selectlist',
			selectlistItems: ['Option 1', 'Option 2'],
			visibleItemsCount: 4,
		}

		const selectlistHTML = this.render()

		SelectList.#allSelectLists.push(
			{
				element,
				selectlistHTML,
			}
		)
	}

	render() {
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
			selectlistOption.ariaSelected = false
			selectlistOption.classList.add('--selectlist__option')

			listbox.append(selectlistOption)
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
}

export default SelectList