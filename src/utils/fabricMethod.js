import {fabric} from "fabric"

export class FabricCanvas {
    hasActiveObj = false
    isDragging = false
    activeObject = null

    constructor(id, width, height, maxScale = 2, minScale = 0.5) {
        this.maxScale = maxScale
        this.minScale = minScale
        this.canvas = new fabric.Canvas(id)
        this.canvas.selection = false // 禁用框选
        this.canvas.defaultCursor = 'move'
        this.addEvents()
    }

    // 添加事件
    addEvents() {
        this.canvas.on({
            // 鼠标滚动缩放
            'mouse:wheel': (opt) => {
                const event = opt.e
                event.preventDefault()
                let zoom = (event.deltaY > 0 ? -0.1 : 0.1) + this.canvas.getZoom()
                // 判断最大最小缩放比
                zoom = Math.max(this.minScale, zoom)
                zoom = Math.min(this.maxScale, zoom)
                this.canvas.zoomToPoint(new fabric.Point(event.layerX, event.layerY), zoom)
            },
            // 按下鼠标事件
            'mouse:down:before': (opt) => {
                const event = opt.e
                this.activeObject = this.canvas.getActiveObject()
                // 用于判断是拖动还是单击
                this.downX = event.clientX
                this.downY = event.clientY
                // 当前没有选中图层，点击位置存在一个图层，不要急着选中
                if (!this.activeObject) {
                    if (opt.target) {
                        opt.target.set('hasControls', false).set('hasBorders', false).set('selectable', false)
                    }
                }
            },
            'mouse:down': (opt) => {
                const event = opt.e
                event.preventDefault()
                if (this.activeObject) { // 存在选中图层
                    // 设置选中目标
                    this.canvas.setActiveObject(this.activeObject)
                    this.isDragging = true
                    if (opt.target && opt.target !== this.activeObject) { // 当前已存在选中，且选中图层不是鼠标所在图层，则先锁死鼠标在的图层
                        opt.target.set('lockMovementX', true).set('lockMovementY', true)
                    }
                } else { // 不存在选中图层
                    this.hasActiveObj = false
                    this.isDragging = true
                    this.canvas.lastPosX = event.clientX
                    this.canvas.lastPosY = event.clientY
                }
            },
            // 移动鼠标事件
            'mouse:move': (opt) => {
                const event = opt.e
                event.preventDefault()
                if (this.isDragging) {
                    if (this.activeObject) {// 存在选中图层
                        this.activeObject.set('left', this.activeObject.left + event.movementX)
                        this.activeObject.set('top', this.activeObject.top + event.movementY)
                        this.activeObject.setCoords()
                        this.canvas.requestRenderAll()
                    } else { // 不存在选中图层
                        const vpt = this.canvas.viewportTransform;
                        vpt[4] += event.clientX - this.canvas.lastPosX
                        vpt[5] += event.clientY - this.canvas.lastPosY
                        this.canvas.requestRenderAll()
                        this.canvas.lastPosX = event.clientX
                        this.canvas.lastPosY = event.clientY
                    }
                }
            },
            // 松开鼠标事件
            'mouse:up': (opt) => {
                const event = opt.e
                event.preventDefault()
                this.isDragging = false

                // 恢复之前锁死的图层
                if (this.activeObject && opt.target && opt.target !== this.activeObject) {
                    opt.target.set('lockMovementX', false).set('lockMovementY', false)
                }

                // 单击事件
                if (Math.abs(event.clientX - this.downX) <= 1 && Math.abs(event.clientY - this.downY) < 1) {
                    if (!opt.target) { // 点击空白出
                        this.canvas.discardActiveObject().requestRenderAll()
                    } else {
                        opt.target.set('hasControls', true).set('hasBorders', true).set('selectable', true)
                        this.canvas.setActiveObject(opt.target).requestRenderAll()
                    }
                } else { // 拖动事件
                    if (this.activeObject) {// 存在选中图层
                    } else { // 不存在选中图层
                        this.canvas.setViewportTransform(this.canvas.viewportTransform)
                    }
                }
            },
        })
    }

    addLayers(layers) {
        if (Array.isArray(layers)) {
            for (let i = 0; i < layers.length; i++) {
                this.canvas.add(layers[i])
            }
        } else {
            this.canvas.add(layers)
        }
    }


}

export class CircleLayer extends fabric.Circle {
    constructor(config) {
        super(config)
        // this.addEvents()
    }

    // addEvents() {
    //     this.on('mousedown', (opt) => {
    //     })
    //     this.on('mouseup', (opt) => {
    //     })
    // }
}