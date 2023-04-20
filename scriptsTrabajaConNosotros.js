function mostrarParte(partea, parted) {
	if (partea === 2 && !validateFormParte1()) {
		return false;
	}
	if (partea === 3 && !validateFormParte2()) {
		return false;
	}
	if (partea === 4 && !validateFormParte3()) {
		return false;
	}

	document.getElementById('parte-' + parted).style.display = 'none';

	document.getElementById('parte-' + partea).style.display = 'block';
}

function validateFormParte1() {
	var datos = {
		nombre: $("#nombre").val(),
		apellido: $("#apellido").val(),
		email: $("#email").val(),
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
			email: { message: "no válido" },
		}
	};

	var errores = validate(datos, constraints);
	var mensajeErrorNombre = errores && errores.nombre ? errores.nombre[0] : '';
	var mensajeErrorApellido = errores && errores.apellido ? errores.apellido[0] : '';
	var mensajeErrorEmail = errores && errores.email ? errores.email[0] : '';
	if (errores) {
		mostrarError(mensajeErrorNombre, mensajeErrorApellido, mensajeErrorEmail, "")
		return false;
	} else {
		return true;
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

function validateFormParte2() {

	var datos = {
		pregunta1: $('input[name="pregunta1"]:checked').val(),
		pregunta2: $('input[name="pregunta2"]:checked').val(),
		pregunta3: $('input[name="pregunta3"]:checked').val(),
		pregunta4: $('input[name="pregunta4"]:checked').val()
	};

	var constraints = {
		pregunta1: {
			presence: { message: "Debe seleccionar una opción en la pregunta 1" }
		},
		pregunta2: {
			presence: { message: "Debe seleccionar una opción en la pregunta 2" }
		},
		pregunta3: {
			presence: { message: "Debe seleccionar una opción en la pregunta 3" }
		},
		pregunta4: {
			presence: { message: "Debe seleccionar una opción en la pregunta 4" }
		},
	};

	var errores = validate(datos, constraints);
	var mensajePregunta1 = errores && errores.pregunta1 ? errores.pregunta1[0] : '';
	var mensajePregunta2 = errores && errores.pregunta2 ? errores.pregunta2[0] : '';
	var mensajePregunta3 = errores && errores.pregunta3 ? errores.pregunta3[0] : '';
	var mensajePregunta4 = errores && errores.pregunta4 ? errores.pregunta4[0] : '';

	if (errores) {
		mostrarError(mensajePregunta1.substring(10), mensajePregunta2.substring(10), mensajePregunta3.substring(10), mensajePregunta4.substring(10))
		return false;
	} else {
		return true;
	}

}

function validateFormParte3() {

	var datos = {
		archivo: $('input[type=file]').val().split('\\').pop(),
		comentario: $('textarea').val()
	};

	var constraints = {
		comentario: {
			presence: true,
			length: { minimum: 10, message: "Debe tener al menos 10 caracteres el comentario" }
		}
	};

	var errores = validate(datos, constraints);
	var mensajearchivo = errores && errores.archivo ? errores.archivo[0] : '';
	var mensajecomentario = errores && errores.comentario ? errores.comentario[0] : '';

	if (errores) {
		mostrarError(mensajearchivo.substring(10), mensajecomentario.substring(10),"","")
		return false;
	} else {
		return true;
	}

}

function guardarEnObjeto() {
	var nombre = $("#nombre").val();
	var apellido = $("#apellido").val();
	var email = $("#email").val();
	var respuesta1 = $('input[name="pregunta1"]:checked').val();
	var respuesta2 = $('input[name="pregunta2"]:checked').val();
	var respuesta3 = $('input[name="pregunta3"]:checked').val();
	var respuesta4 = $('input[name="pregunta4"]:checked').val();
	var archivo = $("#archivo").val();
	var comentario = $("#comentarioT").val();

	var formcv = {
		nombre: nombre,
		apellido: apellido,
		email: email,
		respuesta1: respuesta1,
		respuesta2: respuesta2,
		respuesta3: respuesta3,
		respuesta4: respuesta4,
		archivo: archivo,
		comentario: comentario
	};

	localStorage.setItem("formulario", JSON.stringify(formcv));

	
}


function mostrarResumen() {
	var formcv = JSON.parse(localStorage.getItem("formulario"));

	$("#nombreR").text(formcv.nombre + ", " + formcv.apellido);
	$("#correoR").text(formcv.email);
	$("#respuesta1R").text(formcv.respuesta1);
	$("#respuesta2R").text(formcv.respuesta2);
	$("#respuesta3R").text(formcv.respuesta3);
	$("#respuesta4R").text(formcv.respuesta4);
	$("#archivoR").text("Archivo: " + formcv.archivo);
	$("#comentarioR").text("Comentario: " + formcv.comentario);
}

function generarPDF(){
	var datos = JSON.parse(localStorage.getItem("formulario"));
	var doc = new jsPDF();

	doc.text("Nombre: " + datos.nombre, 10, 10);
	doc.text("Apellido: " + datos.apellido, 10, 20);
	doc.text("Email: " + datos.email, 10, 30);
	doc.text("Preguntas:", 10, 40);
	doc.text("¿Tienes experiencia en desarrollo de software? " + datos.respuesta1, 20, 50);
	doc.text("¿Estás familiarizado con metodologías ágiles como Scrum o Kanban? " + datos.respuesta2, 20, 60);
	doc.text("¿Has trabajado con frameworks como React o Angular? " + datos.respuesta3, 20, 70);
	doc.text("¿Estás familiarizado con herramientas de control de versiones como Git? " + datos.respuesta3, 20, 80);
	doc.text("Ruta del texto: " + datos.archivo, 10, 90);
	doc.text("Comentario: " + datos.comentario, 10, 100);
	mostrarCorrecto("Guardamos tu solicitud. Gracias!")
	
	doc.save("Solicitud.pdf");

	setTimeout(function() {
		window.location.href = "index.html";
	  }, 3000);
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