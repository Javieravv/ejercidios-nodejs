// Js para manejar los formularios
const btnEnviar = document.getElementById('btnEnviar')
const nameUser = document.getElementById('name')
const password = document.getElementById('password')
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')

const errorRegister = document.getElementById('error-register')
const btnLogin = document.getElementById('btn-login')

btnEnviar.addEventListener('click', async (e) => {
  e.preventDefault()
  const nameValue = nameUser.value.trim()
  const passwordValue = password.value.trim()
  // errorLogin.textContent = `${nameValue} - ${passwordValue}`
  if (nameValue === '' || passwordValue === '') {
    errorRegister.textContent = 'Debe ingresar los datos de usuarios y password'
    return null
  }
  // Enviamos la información capturada al backend.
  const data = {
    username: nameValue,
    password: passwordValue,
    firstname: firstName.value,
    lastname: lastName.value
  }

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      const jsonResponse = await response.json()
      console.log('Respuesta', jsonResponse)
      // window.location.href = 'http://localhost:3000/login'
      errorRegister.textContent = null
    } else {
      errorRegister.textContent = 'Usuario o password ya están registrados.'
    }
    nameUser.value = ''
    password.value = ''
    firstName.value = ''
    lastName.value = ''
    // errorRegister.textContent = null
    nameUser.focus()
  } catch (error) {
    errorRegister.textContent = 'Usuario o password ya están registrados.'
  }
})

btnLogin.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'http://localhost:3000/index.html'
})
