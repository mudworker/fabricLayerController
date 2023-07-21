/**
 * 随机生成16进制颜色
 * @returns {string}
 */
export function color16() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
    return color
}

/**
 * 随机生成范围内整数
 * @param min
 * @param max
 * @returns {Number}
 */
export function randomNum(min, max) {
    let range = max - min
    let rand = Math.random()
    let num = min + Math.round(rand * range) //四舍五入
    return num
}