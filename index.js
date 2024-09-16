let mode = 'encrypt'
let pad
let query = ''
const homeUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`

const textInput = document.querySelector('.text-input')
const outputBox = document.querySelector('.output-box')
const outputHeader = document.querySelector('.output-header')
const outputFooter = document.querySelector('.output-footer')
const outputHeaderLine = document.querySelectorAll('.output-box hr')[0]
const outputFooterLine = document.querySelectorAll('.output-box hr')[1]
const outputProgress = document.querySelector('.output-progress')
const outputProgressText = document.querySelector('.output-progress h3')
const progressBar = document.querySelector('progress')
const outputResult = document.querySelector('.output-result')
const error = document.querySelector('.error')
const btn = document.getElementById('btn')
const copyBtn = document.getElementById('copy-btn')
const copyBtnText = document.querySelector('.copy-btn-text')
const shareBtn = document.getElementById('share-btn')
const shareBtnText = document.querySelector('.share-btn-text')

const modeEncrypt = document.getElementById('mode-encrypt')
const modeDecrypt = document.getElementById('mode-decrypt')

window.addEventListener('DOMContentLoaded', () => {
  handleQuery()
  window.history.replaceState({}, document.title, homeUrl + '/one-time-pad-js')
})

modeEncrypt.addEventListener('click', () => changeMode('encrypt'))
modeDecrypt.addEventListener('click', () => changeMode('decrypt'))


btn.addEventListener('click', (e) => {
  e.preventDefault()
  handleInput(mode)
})

copyBtn.addEventListener('click', () => handleCopy())
shareBtn.addEventListener('click', () => handleShare())

function handleQuery() {
  const urlParams = new URLSearchParams(window.location.search)
  if(urlParams.get('q') !== '') {
    const q = urlParams.get('q')
    query = decrypt(q, '1'.repeat(q.length))
    changeMode('decrypt')
    let queryArray = query.split('0xffffff')
    textInput.value = queryArray[0]
    pad = queryArray[1]
  }
}

function handleCopy() {
  navigator.clipboard.writeText(outputResult.textContent)
  copyBtn.firstChild.firstChild.src = './images/tick.png'
  copyBtnText.textContent = 'COPIED'
}

function handleShare() {
  const secret = outputResult.textContent + '0xffffff' + pad
  const encSecret = encrypt(secret, '1'.repeat(secret.length))
  const url = homeUrl + '/one-time-pad-js' + '?q=' + encSecret
  navigator.clipboard.writeText(url)
  shareBtn.firstChild.firstChild.src = './images/tick-white.png'
  shareBtnText.textContent = 'SHARED'
}

function handleInput(mode) {
  if(textInput.value !== '') {
    outputBox.classList.remove('hidden')
    outputProgress.classList.remove('hidden')
    progressBar.classList.remove('hidden')
    outputProgressText.classList.remove('hidden')
    outputHeader.classList.add('hidden')
    outputFooter.classList.add('hidden')
    outputResult.classList.add('hidden')
    outputHeaderLine.classList.add('hidden')
    outputFooterLine.classList.add('hidden')
    copyBtnText.textContent = 'COPY'
    shareBtnText.textContent = 'SHARE'
    copyBtn.firstChild.firstChild.src = './images/copy.png'
    shareBtn.firstChild.firstChild.src = './images/share.png'

    progressBar.value = 1
  
    if(mode === 'encrypt') {
      pad = generatePad(textInput.value.length)

      let ct = encrypt(pad, textInput.value)
  
      progress(ct)
    } else if(mode === 'decrypt') {
      let pt = decrypt(pad, textInput.value)
    
      progress(pt)
    }

    error.classList.add('hidden')
  } else {
    error.classList.remove('hidden')
  }
}

function progress(output) {
  let timer = setInterval(() => {
    progressBar.value += 0.165
  }, 10)

  setTimeout(() => {
    outputResult.textContent = output
    clearInterval(timer)
    outputHeader.classList.remove('hidden')
    outputFooter.classList.remove('hidden')
    progressBar.classList.add('hidden')
    outputProgressText.classList.add('hidden')
    outputResult.classList.remove('hidden')
    outputHeaderLine.classList.remove('hidden')
    outputFooterLine.classList.remove('hidden')
  }, 6000)
}

function changeMode(m) {
  mode = m
  if(m === 'encrypt') {
    // Generate a new key when mode is encrypt
    pad = generatePad(textInput.value.length)

    textInput.placeholder = 'Enter your plaintext here'
    btn.textContent = 'ENCRYPT'
    modeDecrypt.classList.remove('is-active')
    modeEncrypt.classList.add('is-active')
    error.firstChild.textContent = 'plaintext'
    outputProgressText.textContent = 'Encrpting your plaintext...'
  } else if(m === 'decrypt') {
    textInput.placeholder = 'Enter your ciphertext here'
    btn.textContent = 'DECRYPT'
    modeDecrypt.classList.add('is-active')
    modeEncrypt.classList.remove('is-active')
    error.firstChild.textContent = 'ciphertext'
    outputProgressText.textContent = 'Decrypting your ciphertext...'
  }
  textInput.value = ''
}



function generatePad(n) {
  let pad = ""

  for (let i = 0; i < n; i++){
    let randomNumber = Math.floor(Math.random() * 256)
    let randomLetter = String.fromCharCode(randomNumber)
    pad += randomLetter
  }

  return pad
}

function encrypt(pt, pad){
  let ct = ""

  for (let i = 0; i < pad.length; i++){
    ct += String.fromCharCode(xor(pt, pad, i))
  }

  return ct
}

function decrypt(ct, pad){
  let pt = ""

  for (let i = 0; i < pad.length; i++){
    pt += String.fromCharCode(xor(ct, pad, i))
  }

  return pt
}

function xor(text, pad, index) {
  return text.charCodeAt(index) ^ pad.charCodeAt(index)
}