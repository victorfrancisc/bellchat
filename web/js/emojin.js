var ima = new Array();
ima[0] = "../imagen/emo/0.png";
ima[1] = "../imagen/emo/1.png";
ima[2] = "../imagen/emo/2.png";
ima[3] = "../imagen/emo/3.png";
ima[4] = "../imagen/emo/4.png";
ima[5] = "../imagen/emo/5.png";
ima[6] = "../imagen/emo/6.png";
ima[7] = "../imagen/emo/7.png";
ima[8] = "../imagen/emo/8.png";
ima[9] = "../imagen/emo/9.png";
ima[10] = "../imagen/emo/10.png";
ima[11] = "../imagen/emo/11.png";
ima[12] = "../imagen/emo/00.png";

function valor(id, indice)
{

    var dato = document.getElementById(id).value;

    if (indice == 1)
    {

        if (dato.length == "0")
        {
            document.getElementById("imguser").src = ima[0];
        }
        if (dato.length == "1")
        {
            document.getElementById("imguser").src = ima[1];
        }
        if (dato.length == "5")
        {
            document.getElementById("imguser").src = ima[2];
        }
        if (dato.length == "8")
        {
            document.getElementById("imguser").src = ima[3];
        }
        if (dato.length == "10")
        {
            document.getElementById("imguser").src = ima[4];
        }
        if (dato.length == "13")
        {
            document.getElementById("imguser").src = ima[5];
        }
        if (dato.length == "15")
        {
            document.getElementById("imguser").src = ima[6];
        }
        if (dato.length == "17")
        {
            document.getElementById("imguser").src = ima[7];
        }
        if (dato.length == "19")
        {
            document.getElementById("imguser").src = ima[8];
        }

        if (dato.length == "21")
        {
            document.getElementById("imguser").src = ima[8];
        }
        if (dato.length == "23")
        {
            document.getElementById("imguser").src = ima[9];
        }
        if (dato.length == "25")
        {
            document.getElementById("imguser").src = ima[10];
        }
        if (dato.length == "27")
        {
            document.getElementById("imguser").src = ima[11];
        }
    } else
    {
        if (dato.length == "0")
        {
            document.getElementById("imguser").src = ima[0];
        }
        if (dato.length == "1")
        {
            document.getElementById("imguser").src = ima[1];

        }
        if (dato.length == "2")
        {
            document.getElementById("imguser").src = ima[12];
        }

    }
}

