let mode = 'encrypt'
let pad

const textInput = document.querySelector('.text-input')
const outputBox = document.querySelector('.output-box')
const outputHeader = document.querySelector('.output-header')
const outputHeaderLine = document.querySelector('.output-box hr')
const outputProgress = document.querySelector('.output-progress')
const outputProgressText = document.querySelector('.output-progress h3')
const progressBar = document.querySelector('progress')
const outputResult = document.querySelector('.output-result')
const error = document.querySelector('.error')
const btn = document.getElementById('btn')
const copyBtn = document.getElementById('copy-btn')
const copyBtnText = document.querySelector('.copy-btn-text')

const modeEncrypt = document.getElementById('mode-encrypt')
const modeDecrypt = document.getElementById('mode-decrypt')

modeEncrypt.addEventListener('click', () => changeMode('encrypt'))
modeDecrypt.addEventListener('click', () => changeMode('decrypt'))


btn.addEventListener('click', (e) => {
  e.preventDefault()
  handleInput(mode)
})

copyBtn.addEventListener('click', () => handleCopy())

function handleCopy() {
  navigator.clipboard.writeText(outputResult.textContent)
  copyBtn.firstChild.firstChild.src = './images/tick.png'
  copyBtnText.textContent = 'COPIED'
}

function handleInput(mode) {
  if(textInput.value !== '') {
    outputBox.classList.remove('hidden')
    outputProgress.classList.remove('hidden')
    progressBar.classList.remove('hidden')
    outputProgressText.classList.remove('hidden')
    outputHeader.classList.add('hidden')
    outputResult.classList.add('hidden')
    outputHeaderLine.classList.add('hidden')
    copyBtnText.textContent = 'COPY'
    copyBtn.firstChild.firstChild.src = './images/copy.png'

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
    progressBar.classList.add('hidden')
    outputProgressText.classList.add('hidden')
    outputResult.classList.remove('hidden')
    outputHeaderLine.classList.remove('hidden')
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