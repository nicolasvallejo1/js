//Base de datos
const usuarios = [{
    nombre: 'paciente',
    mail: 'paciente',
    pass: 'paciente'
},
]
//Staff de medicos
const dr = [{
    nombre: "Dra. Harleen Frances Quinzel",
    Especialidad: "Psiquiatria",
    img: './img/harley.jpg'
}, {
    nombre: "Lic. Sigmund Freud",
    Especialidad: "Psicologia",
    img: './img/freud.jpg'
}, {
    nombre: "Dr Gregory House",
    Especialidad: "Diagnostico",
    img: './img/house2.jpg'
}, {
    nombre: "Dr James Wilson",
    Especialidad: "Oncologia",
    img: './img/wilson.jpg'
}
,]


//Elementos  DOM 
const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');

//La función de validar método find 
function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);

    //console.log('Usuario encontrado por validate '+ typeof isFound);
    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        //si estoy en este punto, quiere decir que el mail existe, sólo queda comparar la contraseña
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

//Datos  en  storage
function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}

//Mostrar user logueado de storage
function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a <span>${usuario.name}</span>`
}

//Limpiar  storage
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

//Recupero los datos que se guardaron y los retorno
function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}


//Esta función revisa si hay un usuario guardado en el storage, y en ese caso evita todo el proceso de login 
function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        Staff(dr);
        presentarInfo(toggles, 'd-none');
    }
}

//Esta función nos permite intercambiar la visualización de los elementos del DOM, agregando o sacando la clase d-none. Si el elemento la tiene, se la saco, y si no la tiene, se la agrego. La gata Flora de las funciones sería.
function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//Creacion de card con el staff
/////////////////////

function Staff(array) {
    contTarjetas.innerHTML = "";
    array.forEach((element) => {
    let html = `<div class="card cardr" id="tarjeta${element.nombre}">
                    <h3 class="card-header" id="nombredr"> ${element.nombre}</h3>
                    <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoStaff">
                    <div class="card-body">
                        <p class="card-text" id="Especialidad">Especialidad: ${element.Especialidad}</p>
                        <button class="btn btn-outline-primary" type="submit" onclick="selectdr()">Seleccionar</button>
                    </div>
                </div>`;

    contTarjetas.innerHTML += html;
    });
    
}



//Eventos - Acciones de los botones
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

 
// Validacion de Usuario
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {

            //Revisamos si elige persistir la info aunque se cierre el navegador o no
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            //Recién ahora cierro el cuadrito de login
            modal.hide();
            //Muestro la info para usuarios logueados
            Staff(dr);
            presentarInfo(toggles, 'd-none');
        }
   // }
});



btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage)); 


function selectdr() {
    let x = document.getElementById("btndr");
    if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
    }
}