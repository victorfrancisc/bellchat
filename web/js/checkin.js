function  one(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).style.border = "red solid 1px";

}
function validar(id)
{
    if (document.getElementById(id).value.length > 0)
    {
        document.getElementById(id).style.border = "black solid 1px";
    }
    else
    {
          document.getElementById(id).style.border = "red solid 1px";
    }
}
function color(color)
{
    document.getElementById("conteSu").style.backgroundColor = color;
    document.getElementById("submit").style.backgroundColor = color;
    document.getElementById("contecoloUne").style.backgroundColor = color;
    document.getElementById("sepa").style.backgroundColor = color;


}
function colordos(color)
{
    document.getElementById("contecoloUne").style.backgroundColor = color;
    document.getElementById("contesdos").style.backgroundColor = color;



}