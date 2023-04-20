//pedir empleados a la api
$.ajax({
  url: 'https://reqres.in/api/users?page=1',
  method: 'GET',
  success: function (empleados) {
    cargarEmpleados(empleados.data)
  },
  error: function (error) {
    console.error(error);
  }
});
//pedir clientes a la api
$.ajax({
  url: 'https://reqres.in/api/users?page=2',
  method: 'GET',
  success: function (clientes) {
    cargarClientes(clientes.data)
  },
  error: function (error) {
    console.error(error);
  }
});
//cargar empleados
function cargarEmpleados(empleados) {
  for (let i = 0; i < empleados.length; i++) {
    $("#img" + (i + 1)).attr("src", empleados[i].avatar);
    $("#nombre" + (i + 1)).text(empleados[i].first_name + ", " + empleados[i].last_name);
    $("#email" + (i + 1)).text(empleados[i].email)
  }
}
//cargar clientes
function cargarClientes(clientes) {
  for (let i = 0; i < clientes.length; i++) {
    $("#imgc" + (i + 1)).attr("src", clientes[i].avatar);
    $("#nombrec" + (i + 1)).text(clientes[i].first_name + ", " + clientes[i].last_name);
  }
}

function validateConsulta() {

  var datos = {
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    email: $("#email").val(),
    mensaje: $("#mensaje").val()
  };

  var constraints = {
    nombre: {
      presence: true,
      length: { minimum: 3, message: "debe tener al menos 3 caracteres" }
    },
    apellido: {
      presence: true,
      length: { minimum: 3, message: "debe tener al menos 3 caracteres" }
    },
    email: {
      presence: true,
      email: true,
      email: { message: "no válido" }
    },
    mensaje: {
      presence: true,
      length: { minimum: 10, message: "debe tener al menos 10 caracteres" }
    }
  };

  var errores = validate(datos, constraints);
  var mensajeNombre = errores && errores.nombre ? "El nombre " + errores.nombre[0].substring(7) : '';
  var mensajeApellido = errores && errores.apellido ? "El apellido " + errores.apellido[0].substring(9) : '';
  var mensajeEmail = errores && errores.email ? "Email " + errores.email[0].substring(6) : '';
  var mensajeMensaje = errores && errores.mensaje ? "El mensaje " + errores.mensaje[0].substring(7) : '';

  if (errores) {
    mostrarError(mensajeNombre, mensajeApellido, mensajeEmail, mensajeMensaje)
    return false;
  } else {
    mostrarCorrecto("Consulta enviada correctamente!!")
    setTimeout(function () {
      location.reload();
    }, 3000);
    return true;
  }

}

function mostrarCorrecto(mensaje) {
  if (mensaje != "") {
    $('.toast-body5').text(mensaje);
    $('.toast5').toast({
      delay: 5000
    });
    $('.toast5').toast('show');
  }
}

function mostrarError(mensaje1, mensaje2, mensaje3, mensaje4) {
  if (mensaje1 != "") {
    $('.toast-body1').text(mensaje1);
    $('.toast1').toast({
      delay: 5000
    });
    $('.toast1').toast('show');
  }
  if (mensaje2 != "") {
    $('.toast-body2').text(mensaje2);
    $('.toast2').toast({
      delay: 5000
    });
    $('.toast2').toast('show');
  }
  if (mensaje3 != "") {
    $('.toast-body3').text(mensaje3);
    $('.toast3').toast({
      delay: 5000
    });
    $('.toast3').toast('show');
  }
  if (mensaje4 != "") {
    $('.toast-body4').text(mensaje4);
    $('.toast4').toast({
      delay: 5000
    });
    $('.toast4').toast('show');
  }
}