$(document).ready(function () {
    validarInactividad();
});

function validarInactividad() {
    if (!localStorage.getItem("nombreUsuario")) {
        $("#header").append('<a onclick="cerrar()" style="float:right;overflow:visible;padding-right:5px;"><img style="width:35px;margin-top:-30px;" src="images/icons/user/exit.png" alt="img"></a>');
        $("#opc_Sesion").css("display", "none");
        $("#sesion").html("<h4>Se encuentra logueado como " + localStorage.getItem("nombreUsuario") + "</h4>");

        $("#menuEmpleador").addClass("dropdown-nav-inactive");
        $("#subMenuEmpleador").css("display", "block");
    }
    else {
        $("#opc_Sesion").css("display", "block");
        $("#opc_Registrar").css("display", "none");
        $("#opc_VerMias").css("display", "none");
    }
}