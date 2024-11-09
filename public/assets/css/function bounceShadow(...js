function bounceShadow(...matrix) {
  const [w, transposeX, transposeY, h, tx, ty] = matrix
  const subW = w / 5
  const subH = h / 5

  const txSub = -subW
  const tySub = subH

  const keyframes = {
    '0%': {
      transform: `matrix(${matrix.join(',')})`
    }
  }

  const w10 = w - subW
  const h10 = h - subH
  const tx10 = tx - txSub
  const ty10 = ty - tySub
  keyframes['10%'] = {
    transform: `matrix(${w10}, ${transposeX}, ${transposeY}, ${h10}, ${tx10}, ${ty10})`
  }

  const w20 = w10 - subW
  const h20 = h10 - subH
  const tx20 = tx10 - txSub
  const ty20 = ty10 - tySub
  keyframes['20%'] = {
    transform: `matrix(${w20}, ${transposeX}, ${transposeY}, ${h20}, ${tx20}, ${ty20})`
  }

  const w30 = w20 - subW
  const h30 = h20 - subH
  const tx30 = tx20 - txSub
  const ty30 = ty20 - tySub
  keyframes['30%'] = {
    transform: `matrix(${w30}, ${transposeX}, ${transposeY}, ${h30}, ${tx30}, ${ty30})`
  }

  const w40 = w30 - subW
  const h40 = h30 - subH
  const tx40 = tx30 - txSub
  const ty40 = ty30 - tySub
  keyframes['40%'] = {
    transform: `matrix(${w40}, ${transposeX}, ${transposeY}, ${h40}, ${tx40}, ${ty40})`
  }

  const w50 = w40 - subW
  const h50 = h40 - subH
  const tx50 = tx40 - txSub
  const ty50 = ty40 - tySub
  keyframes['50%'] = {
    transform: `matrix(${w50}, ${transposeX}, ${transposeY}, ${h50}, ${tx50}, ${ty50})`
  }

  const w60 = w50 + subW
  const h60 = h50 + subH
  const tx60 = tx50 + txSub
  const ty60 = ty50 + tySub
  keyframes['60%'] = {
    transform: `matrix(${w60}, ${transposeX}, ${transposeY}, ${h60}, ${tx60}, ${ty60})`
  }

  const w70 = w60 + subW
  const h70 = h60 + subH
  const tx70 = tx60 + txSub
  const ty70 = ty60 + tySub
  keyframes['70%'] = {
    transform: `matrix(${w70}, ${transposeX}, ${transposeY}, ${h70}, ${tx70}, ${ty70})`
  }

  const w80 = w70 + subW
  const h80 = h70 + subH
  const tx80 = tx70 + txSub
  const ty80 = ty70 + tySub
  keyframes['80%'] = {
    transform: `matrix(${w80}, ${transposeX}, ${transposeY}, ${h80}, ${tx80}, ${ty80})`
  }

  const w90 = w80 + subW
  const h90 = h80 + subH
  const tx90 = tx80 + txSub
  const ty90 = ty80 + tySub
  keyframes['90%'] = {
    transform: `matrix(${w90}, ${transposeX}, ${transposeY}, ${h90}, ${tx90}, ${ty90})`
  }

  const w100 = w90 + subW
  const h100 = h90 + subH
  const tx100 = tx90 + txSub
  const ty100 = ty90 + tySub
  keyframes['100%'] = {
    transform: `matrix(${w100}, ${transposeX}, ${transposeY}, ${h100}, ${tx100}, ${ty100})`
  }

  console.log(JSON.stringify(keyframes, null, 2))
}
