import {
	h,
	render,
} from '../src/main.js'

const tree = h('div', [
	'Potato',
	h('p', { class: 'primary' }, [ 'Onion' ])
])

const node = document.querySelector('#app')

const patch = render(node, tree)

setTimeout(() => {
	const tree_2 = h('div', [
		h('h2', [ 'Potato' ]),
		h('p', [ 'Onion' ]),
	])
	patch(tree_2, tree)

	setTimeout(() => {
		const tree_3 = h('div', [
			h('h2', ['Ingredients']),
			h('ul', [
				h('li', ['Potato']),
				h('li', ['Onion']),
				h('li', ['Carrot']),
			])
		])
		patch(tree_3, tree_2)

		setTimeout(() => {
			const tree_4 = h('div', [
				h('h2', { class: 'primary' }, 'Ingredients'),
				h('ul', { class: 'no-deco' }, [
					h('li', 'Potato'),
					h('li', 'Onion'),
					h('li', 'Carrot'),
				]),
				h('button', {
					onclick: () => console.log('Yo!'),
				}, 'Click me!'),
			])
			patch(tree_4, tree_3)

			setTimeout(() => {
				const tree_5 = h('div', [
					h('h2', { class: 'primary' }, 'Ingredients'),
					h('ul', { class: 'no-deco' }, [
						h('li', 'Potato'),
						h('li', 'Onion'),
						h('li', 'Carrot'),
					]),
					h('button', {
						onclick: () => console.log('Hey!'),
					}, 'Click me, man!'),
				])
				patch(tree_5, tree_4)
			}, 1000)
		}, 1000)
	}, 1000)
}, 1000)
