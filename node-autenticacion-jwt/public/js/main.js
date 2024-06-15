// Js para manejar los formularios
const btnEnviar = document.getElementById('btnEnviar')
const nameUser = document.getElementById('name')
const password = document.getElementById('password')
const errorLogin = document.getElementById('error-login')
const btnRegistrar = document.getElementById('btn-registrar')

btnEnviar.addEventListener('click', async (e) => {
  e.preventDefault()
  const nameValue = nameUser.value.trim()
  const passwordValue = password.value.trim()
  // errorLogin.textContent = `${nameValue} - ${passwordValue}`
  if (nameValue === '' || passwordValue === '') {
    errorLogin.textContent = 'Debe ingresar los datos de usuarios y password'
    return null
  }
  // Enviamos la información capturada al backend.
  const data = {
    username: nameValue,
    password: passwordValue
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      // const jsonResponse = await response.json()
      window.location.href = 'http://localhost:3000/protected'
    } else {
      errorLogin.textContent = 'Usuario o password no son correctos.'
    }
  } catch (error) {
    errorLogin.textContent = 'No fue posible crear el usuario.'
  }
})

btnRegistrar.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = 'http://localhost:3000/register.html'
})
