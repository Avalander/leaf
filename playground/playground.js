import {
	h,
	render,
} from '../src/main.js'

const delay = dt => data => new Promise(resolve => {
	setTimeout(() => resolve(data), dt)
})

const flip = fn => (...args) =>
	fn(...args.reverse())


const tree = h('div', [
	'Potato',
	h('p', { class: 'primary' }, [ 'Onion' ])
])

const node = document.querySelector('#app')

const patch = render(node, tree)


Promise.resolve()
	.then(delay(1000))
	.then(() => {
		const tree_2 = h('div', [
			h('h2', ['Potato']),
			h('p', ['Onion']),
		])
		patch(tree_2, tree)
		return flip(patch).bind(null, tree_2)
	})
	.then(delay(1000))
	.then(_patch => {
		const tree = h('div', [
			h('h2', ['Ingredients']),
			h('ul', [
				h('li', ['Potato']),
				h('li', ['Onion']),
				h('li', ['Carrot']),
			])
		])
		_patch(tree)
		return flip(patch).bind(null, tree)
	})
	.then(delay(1000))
	.then(_patch => {
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
		_patch(tree_4)
		return flip(patch).bind(null, tree_4)
	})
	.then(delay(1000))
	.then(_patch => {
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
		_patch(tree_5)
		return flip(patch).bind(null, tree_5)
	})
