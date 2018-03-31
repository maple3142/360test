const create360Viewer = require('360-image-viewer')
const canvasFit = require('canvas-fit')

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const fit = canvasFit(canvas, window, window.devicePixelRatio)
window.addEventListener('resize', fit, false)
fit()

function loadImg(url, canvas) {
	return new Promise((res, rej) => {
		const image = new Image()
		image.src = url

		image.onload = () => {
			const viewer = create360Viewer({ image, canvas })

			viewer.start()
			res(viewer)
		}
		image.onerror = err
	})
}

const div = document.createElement('div')
div.style.position = 'absolute'
div.style.top = '0px'
div.style.left = '0px'
div.style.zIndex = 10000
document.body.appendChild(div)
;[1, 2, 3, 4].forEach(x => {
	const btn = document.createElement('button')
	btn.textContent = x
	btn.addEventListener('click', () => loadImg(`./${x}.jpg`, canvas))
	div.appendChild(btn)
})
const upload = document.createElement('input')
upload.type = 'file'
upload.addEventListener('change', e => {
	const [file] = e.target.files
	if (!file) return
	const reader = new FileReader()
	reader.onload = e => {
		const url = URL.createObjectURL(new Blob([e.target.result]))
		const rurl = () => URL.revokeObjectURL(url)
		loadImg(url, canvas)
			.then(rurl)
			.catch(rurl)
	}
	reader.readAsArrayBuffer(file)
})
div.appendChild(upload)

loadImg('./1.jpg', canvas)
