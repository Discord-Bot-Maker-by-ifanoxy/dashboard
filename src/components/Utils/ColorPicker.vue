<script lang="ts">
function parseColor(color) {
  if (color[0] == '#') return color.toLowerCase()
  const arr = []
  color.replace(/[\d+]+/g, function (v) {
    arr.push(parseFloat(v))
  })
  return '#' + arr.slice(0, 3).map(toHex).join('')
}
function toHex(int) {
  const hex = int.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

function hexToHSL(H) {
  let r = 0,
    g = 0,
    b = 0
  if (H.length == 4) {
    r = '0x' + H[1] + H[1]
    g = '0x' + H[2] + H[2]
    b = '0x' + H[3] + H[3]
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2]
    g = '0x' + H[3] + H[4]
    b = '0x' + H[5] + H[6]
  }
  r /= 255
  g /= 255
  b /= 255
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  if (delta == 0) h = 0
  else if (cmax == r) h = ((g - b) / delta) % 6
  else if (cmax == g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { hue: h, sat: s, lum: l }
}
function hslToHex(h, s, l) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`.replace(/NaN/g, '00')
}

function hslTohsv(hslS, hslL) {
  const hsv1 = (hslS * (hslL < 50 ? hslL : 100 - hslL)) / 100
  const hsvS = hsv1 === 0 ? 0 : ((2 * hsv1) / (hslL + hsv1)) * 100
  const hsvV = hslL + hsv1
  return [hsvS / 100, hsvV / 100]
}

function getCoordinates(lightness, saturation, width, height) {
  const hsv = hslTohsv(saturation, lightness)

  return { x: hsv[0] * width, y: (1 - hsv[1]) * height }
}
export default {
  name: 'ColorPicker',
  emits: ['set-color'],
  data() {
    return {
      hold: false,
      color: this.defineColor ?? '#9529d9',
      hsl: {
        hue: 277,
        lum: 51,
        sat: 70,
        x: null,
        y: null
      }
    }
  },
  props: {
    defineColor: {
      type: String,
      default: '#9529d9'
    },
    defineHsl: {
      type: Object<{ lum: number; sat: number; hue: number; x: number; y: number }>,
      default: {
        hue: 277,
        lum: 51,
        sat: 70,
        x: null,
        y: null
      }
    }
  },
  created() {
    this.set_color(this.defineColor)
  },
  watch: {
    hold(val) {
      this.$emit('set-color', this.color)
    }
  },
  methods: {
    sameColor(color) {
      return this.color == parseColor(color)
    },
    set_color(x) {
      this.color = parseColor(x)
      const hsl = hexToHSL(parseColor(x))
      const coord = getCoordinates(hsl.lum, hsl.sat, 100, 100)
      this.hsl = {
        ...hsl,
        x: coord.x,
        y: coord.y
      }
      this.$emit('set-color', x)
    },
    getCoord(x) {
      const defvalue = document.getElementById('saturation')?.getBoundingClientRect()
      const top = Math.min(
        Math.max(0, Math.round(((x.pageY - defvalue.y) / defvalue.height) * 100)),
        100
      )
      const left = Math.min(
        Math.max(0, Math.round(((x.pageX - defvalue.x) / defvalue.width) * 100)),
        100
      )

      const y = Math.round(top)
      const z = Math.round(left)

      const hsv_value = 1 - y / 100
      const hsv_saturation = z / 100
      const lightness = (hsv_value / 2) * (2 - hsv_saturation)
      const saturation = (hsv_value * hsv_saturation) / (1 - Math.abs(2 * lightness - 1))

      this.hsl.lum = Math.round(lightness * 100)
      this.hsl.sat = Math.round((isNaN(saturation) ? 0 : saturation) * 100)
      this.hsl.x = left
      this.hsl.y = top

      this.color = hslToHex(this.hsl.hue, this.hsl.sat, this.hsl.lum)
      this.$emit('set-color', this.color)
    },
    getCoords(x) {
      if (!this.hold) return
      this.getCoord(x)
    },
    slider(s) {
      this.hsl.hue = (s.srcElement.value * 360) / 100

      this.color = hslToHex(this.hsl.hue, this.hsl.sat, this.hsl.lum)

      this.$emit('set-color', this.color)
    },
    getposition() {
      const hls = this.hsl ?? hexToHSL(this.color)
      return getCoordinates(hls.lum / 100, hls.sat / 100, 100, 100)
    },
    input_color(x) {
      const value = x.srcElement.value
      if (!value.startsWith('#')) return (x.srcElement.value = '#' + value)
      if (value.length !== 7) return
      if (!value.match(/[0-9a-f]+$/i)) return
      this.set_color(value)
    }
  }
}
</script>

<template>
  <div class="picker">
    <div class="palettes">
      <div v-on:click="set_color('#D6FF79')" class="shoto-color color">
        <span v-if="sameColor('#D6FF79')" class="material-symbols-outlined">done</span>
      </div>
      <div class="discord-color">
        <div
          v-for="color of [
            '#1ABC9C',
            '#57F287',
            '#3498DB',
            '#9B59B6',
            '#E91E63',
            '#F1C40F',
            '#E67E22',
            '#ED4245',
            '#95A5A6',
            '#607D8B',
            '#11806A',
            '#1F8B4C',
            '#206694',
            '#71368A',
            '#AD1457',
            '#C27C0E',
            '#A84300',
            '#992D22',
            '#979C9F',
            '#546E7A'
          ]"
          v-on:click="set_color(color)"
          class="color"
          :style="'background-color:' + color"
        >
          <span v-if="sameColor(color)" class="material-symbols-outlined">done</span>
        </div>
      </div>
    </div>
    <div
      id="saturation"
      v-on:mousedown="hold = true"
      v-on:click="(x) => getCoord(x, true)"
      :style="'background-color:' + (hsl ? `hsl(${hsl.hue}, 100%, 50%)` : color)"
      class="saturation"
    >
      <div
        id="pointer"
        :style="`top: ${hsl.y !== null ? hsl.y : getposition().y}%; left: ${hsl.x !== null ? hsl.x : getposition().x}%;`"
        class="pointer"
      ></div>
      <div
        v-if="hold"
        v-on:mousemove="getCoords"
        v-on:click="getCoord"
        v-on:mouseup="hold = false"
        style="position: fixed; width: 100%; height: 100%; top: 0; left: 0"
      ></div>
    </div>
    <div class="controls">
      <div :style="'background-color:' + color" class="color_select"></div>
      <input v-on:input="slider" type="range" :value="(hsl.hue / 360) * 100" min="0" max="100" />
    </div>
    <input v-on:input="input_color" type="text" autocomplete="off" :value="color" />
  </div>
</template>

<style scoped lang="scss">
.picker {
  display: flex;
  flex-direction: column;
  z-index: 100;

  padding: 15px;
  height: fit-content;
  background-color: #36393f;
  box-shadow:
    0 0 2px #0000004d,
    0 4px 8px #0000004d;

  .palettes {
    display: flex;
    margin-bottom: 10px;

    .color {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .discord-color {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 5px;

      div {
        border-radius: 2px;
        width: 15px;
        height: 15px;

        span {
          font-size: 15px;
          color: #ffffff;
        }
      }

      @media screen and (max-width: 1250px) {
        grid-template-columns: repeat(5, 1fr);
      }
    }

    .shoto-color {
      min-width: 25px;
      flex: 1;
      width: auto;
      border-radius: 2px;
      background-color: var(--primary);
      margin-right: 5px;
    }
  }

  .saturation {
    height: 20vh;
    margin-bottom: 10px;
    border-radius: 2px;
    cursor: crosshair;
    background-image: linear-gradient(0deg, #000000, transparent),
      linear-gradient(90deg, #fff, transparent);

    .pointer {
      border-radius: 50%;
      position: relative;
      height: 5px;
      width: 5px;
      margin-left: -2.5px;
      margin-top: -2.5px;
      box-shadow:
        0 0 0 1.5px #fff,
        inset 0 0 1px 1px #0000004d,
        0 0 1px 2px #0006;
    }
  }

  .controls {
    display: inline-flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 5px;

    .color_select {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }

    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      height: 15px;
      background: transparent;

      cursor: pointer;
      width: 85%;
    }

    input[type='range']::-webkit-slider-runnable-track {
      background-image: linear-gradient(
        90deg,
        hsl(0 100% 50%),
        hsl(90 100% 50%),
        hsl(180 100% 50%),
        hsl(270 100% 50%),
        hsl(360 100% 50%)
      );

      height: 10px;
      border-radius: 100px;
      margin: 0 0.25rem;
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;

      margin-top: -5px;

      background-color: white;
      height: 20px;
      width: 10px;
      border-radius: 1000px;
      border: 2px solid white;
    }
  }

  input[type='text'] {
    height: 40px;
    padding: 5px;
    border-radius: 5px;
    background: #262525;
    border-width: 1px;
    border-color: transparent;
    transition-duration: 0.2s;
  }

  input[type='text']:focus {
    outline: none;
    border-color: var(--primary);
  }
}
</style>
