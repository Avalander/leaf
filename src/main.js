'use strict'


// h

export const h = (tag, props = {}, children) =>
	({ tag
	,  props: getProps(props, children)
	,  children: getChildren(props, children)
	})

const getProps = (props, children) =>
	children != null
		? props
		: Array.isArray(props) || typeof props === 'string' || props.tag != null
		? {}
		: props

const getChildren = (props, children) =>
	children == null
		? !Array.isArray(props) && typeof props !== 'string' && props.tag == null
		? []
		: parseChildren(props)
		: parseChildren(children)
		
const parseChildren = children =>
	Array.isArray(children)
		? children
		: [ children ]


// render

const createElement = node =>
	typeof node === 'string'
		? createTextNode(node)
		: createElementNode(node)

const createTextNode = document.createTextNode.bind(document)

const createElementNode = ({ tag, props, children }) => {
	const $el = document.createElement(tag)
	Object.entries(props)
		.forEach(([ key, value ]) =>
			key.startsWith('on')
				? $el.addEventListener(key.substring(2).toLowerCase(), value)
				: $el.setAttribute(key, value)
		)
	children.map(createElement)
		.forEach($el.appendChild.bind($el))
	return $el
}

const updateElement = ($parent, new_node, old_node, index = 0) => {
	const query = { $parent, new_node, old_node, index }
	return isNewNode(query)
		? updateNewNode(query)
		: isNodeRemoved(query)
		? updateNodeRemoved(query)
		: hasNodeChanged(query)
		? updateNodeChanged(query)
		: isElementNode(query)
		? updateElementNode(query)
		: null
}

const isNewNode = ({ old_node }) =>
	old_node == null

const updateNewNode = ({ $parent, new_node }) =>
	$parent.appendChild(createElement(new_node))

const isNodeRemoved = ({ new_node }) =>
	new_node == null

const updateNodeRemoved = ({ $parent, index }) =>
	$parent.removeChild($parent.childNodes[index])

const hasNodeChanged = ({ new_node, old_node }) =>
	hasChanged(old_node, new_node)

const updateNodeChanged = ({ $parent, new_node, index }) =>
	$parent.replaceChild(
		createElement(new_node),
		$parent.childNodes[index]
	)

const isElementNode = ({ new_node }) =>
	new_node.tag != null

const updateElementNode = ({ $parent, new_node, old_node, index }) => {
	updateProps($parent.childNodes[index], new_node, old_node)
	zip(new_node.children, old_node.children)
		.forEach(([ a, b ], i) =>
			updateElement($parent.childNodes[index], a, b, i)
		)
}

const updateProps = ($el, new_node, old_node) => {
	Object.entries(old_node.props)
		.forEach(([ key, value ]) => new_node[key] != null
			? null
			: key.startsWith('on')
			? $el.removeEventListener(key.substring(2).toLowerCase(), value)
			: $el.removeAttribute(key)
		)
	Object.entries(new_node.props)
		.forEach(([ key, value ]) =>
			key.startsWith('on')
				? $el.addEventListener(key.substring(2).toLowerCase(), value)
				: $el.setAttribute(key, value)
		)
}

const hasChanged = (curr, next) =>
	typeof curr !== typeof next ||
	typeof curr === 'string' && curr !== next ||
	curr.tag !== next.tag

const zip = (a, b) => {
	const result = []
	for (let i = 0; i < a.length; i++) {
		result.push([ a[i], b[i] ])
	}
	return result
}

export const render = (node, vdom) => {
	updateElement(node, vdom)
	return updateElement.bind(null, node)
}
