function login()
{
    $.ajax({
        type: "POST",
        url: "../login",
        data: {user: document.getElementById("textuser").value,
            pass: document.getElementById("textpassword").value},
        success: function (response) {
            console.log(response);
            if (parseInt(response) > 0)
            {
                window.location.href = 'http://localhost:8080/ProyectoVI/faces/pages/messages.xhtml?id=' + response;
                console.log("excelente");
            } else
            {
                console.log("fallo");
            }
        }
    });
}
