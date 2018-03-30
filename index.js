const create360Viewer = require('360-image-viewer')
const canvasFit = require('canvas-fit')

function loadImg(id) {
	const image = new Image()
	image.src = `./${id}.jpg`

	image.onload = () => {
		const viewer = create360Viewer({ image })

		document.body.appendChild(viewer.canvas)

		const fit = canvasFit(viewer.canvas, window, window.devicePixelRatio)
		window.addEventListener('resize', fit, false)
		fit()
		viewer.start()
	}
}

let id = 0
const MXID = 2

const div = document.createElement('div')
div.style.position = 'absolute'
div.style.top = '0px'
div.style.left = '0px'
div.style.zIndex = 10000
document.body.appendChild(div)
const prev = document.createElement('button')
prev.textContent='prev'
const next = document.createElement('button')
next.textContent='next'
prev.addEventListener('click', () => {
	id--
	if (id < 0) id = MXID
	loadImg(id)
})
next.addEventListener('click', () => {
	id++
	if (id > MXID) id = 0
	loadImg(id)
})
div.appendChild(prev)
div.appendChild(next)
loadImg(id)
