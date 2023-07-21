<template>
  <canvas :width="canvasWidth" :height="canvasHeight" id="canvas" style="border: 1px solid #ccc;"></canvas>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {FabricCanvas, CircleLayer} from '../../utils/fabricMethod'
import {color16, randomNum} from "@/utils/common";

const canvasWidth = ref(600)
const canvasHeight = ref(600)


function init() {
  const fbCanvas = new FabricCanvas('canvas', canvasWidth.value, canvasHeight.value)
  let layerCnt = 3
  const layerList = []
  // 生成三个随机的圆图层
  for (let i = 0; i < layerCnt; i++) {
    let r = randomNum(20, 80)
    layerList.push(new CircleLayer({
      top: randomNum(0, canvasWidth.value - 2 * r),
      left: randomNum(0, canvasWidth.value - 2 * r),
      radius: r,
      fill: color16(),
      stroke: color16(),
      strokeWidth: 3
    }))
  }

  fbCanvas.addLayers(layerList)
}

onMounted(() => {
  init()
})
</script>

<style scoped>

</style>