var Url;
var websocket;
//var textoenvio = document.getElementById("textsend");
var bandeja = document.getElementById("bandeja");
var id;
function onOpen()
{
    id = getUrlVars();
    id = id.id;
    console.log(id);
    websocket.send(id);
    console.log("conectado..");
    ini = true;
}
var ini = false;
var mysendsms;
function enviartext()
{
    mysendsms = {chatsend: {iduser: idfriendchatnow.id, username: idfriendchatnow.username,
            message: document.getElementById("textsend").value, idsend: id, usersend: username}};
    websocket.send(JSON.stringify(mysendsms));
    document.getElementById("textsend").value = "";
}
function onClose()
{
    console.log("desconectado..");
}
var t;
var username;
var chats;
var chatall;
function onMessage(event)
{
    var returnonmessage;
    if (ini)
    {
        console.log(event.data);
        t = JSON.parse(event.data);
        username = t.myinfo;
        document.getElementById("username").innerHTML = username;
        chats = t.mychatinfo.mychat;
        for (var u = 0; u < chats.length; u++)
        {
            var inf = chats[u];
            document.getElementById("allsmsbandeja").appendChild(adduserconec(inf[0], "", inf[1], inf[3]));
        }
        document.getElementById("containerchatfriend").style.display = 'none';
        document.getElementById("infoallfriend").style.display = 'none';


        ini = false;
    } else {
        returnonmessage = JSON.parse(event.data);
        console.log(returnonmessage);
        if (returnonmessage.hasOwnProperty('data'))
        {
            document.getElementById("containerchatfriend").style.display = 'block';
            document.getElementById("infoallfriend").style.display = 'block';

            chatall = returnonmessage.data;
            var dt = chatall;
            var elemento = document.getElementById("centersms");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
            }

            for (var i = 0; i < dt.length; i++)
            {
                var inf = dt[i];
                if (inf[0] === id)
                {
                    addsmsreceive(inf[2], inf[4]);
                } else {
                    addsmssends(inf[2], inf[4]);
                }
            }
        } else if (returnonmessage.hasOwnProperty('returnrecibe'))
        {
            chats = returnonmessage.returnrecibe.chatfriend.mychat;
            chatall = returnonmessage.returnrecibe.mychatallfriend.data;
            var father = document.getElementById("allsmsbandeja");
            for (var i = 0; i < chats.length; i++)
            {
                var inf = chats[i];
                if (inf[0].toString().trim() === returnonmessage.returnrecibe.idrec.toString().trim())
                {
                    father.removeChild(document.getElementById(inf[0]));
                    var child = father.firstChild;
                    father.insertBefore(adduserconec(inf[0], "", inf[1], inf[3]), child);
                    if (idfriendchatnow.id === returnonmessage.returnrecibe.idrec.toString().trim())
                    {
                        addsmsreceive(inf[3], inf[5]);
                    }
                }
            }
           
            console.log(returnonmessage);
        } else if (returnonmessage.hasOwnProperty('returnenvia'))
        {
            chats = returnonmessage.returnenvia.chatfriend.mychat;
            chatall = returnonmessage.returnenvia.mychatallfriend.data;
            var father = document.getElementById("allsmsbandeja");
            for (var i = 0; i < chats.length; i++)
            {
                var inf = chats[i];
                if (inf[0] === mysendsms.chatsend.iduser)
                {
                    father.removeChild(document.getElementById(inf[0]));
                    var child = father.firstChild;
                    father.insertBefore(adduserconec(inf[0], "", inf[1], inf[3]), child);
                }
            }
            var elemento = document.getElementById("centersms");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
            }
            var dt = chatall;
            for (var i = 0; i < dt.length; i++)
            {
                var inf = dt[i];
                if (inf[0] === id)
                {
                    addsmsreceive(inf[2], inf[4]);
                } else {
                    addsmssends(inf[2], inf[4]);
                }
            }

            console.log(returnonmessage);
        }
    }

}
function onError()
{
    console.log("ERROR..");

}
function salir()
{
    websocket.onclose();
    websocket.send("1");
}
var use;
function unir()
{
    console.log("ws://" + document.location.host + "/ProyectoVI/" + "chat");
    websocket = new WebSocket("ws://" + document.location.host + "/ProyectoVI/" + "chat");
    websocket.onopen = onOpen;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
    websocket.onclose = onClose;
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function adduserconec(id, photo, name, sms)
{
    var bandejasuser = document.createElement("div");
    bandejasuser.setAttribute("class", "bandejasuser");
    bandejasuser.setAttribute("id", id);
    bandejasuser.setAttribute("onclick", "viewchatfriends(this)");

    var bandejasuserimg = document.createElement("div");
    bandejasuserimg.setAttribute("class", "bandejasuserimg");

    var bandejasuserdata = document.createElement("div");
    bandejasuserdata.setAttribute("class", "bandejasuserdata");

    var bandejasuserdataname = document.createElement("div");
    bandejasuserdataname.setAttribute("class", "bandejasuserdataname");

    var bandejasuserdatasms = document.createElement("div");
    bandejasuserdatasms.setAttribute("class", "bandejasuserdatasms");

    var img = document.createElement("img");
    img.setAttribute("src", "../imagen/chat/ciega.png");
    img.setAttribute("alt", "");
    img.setAttribute("title", "user1");

    var label1 = document.createElement("label");
    label1.innerHTML = name;

    var label2 = document.createElement("label");
    label2.innerHTML = sms;

    bandejasuser.appendChild(bandejasuserimg);
    bandejasuser.appendChild(bandejasuserdata);
    bandejasuserimg.appendChild(img);
    bandejasuserdata.appendChild(bandejasuserdataname);
    bandejasuserdata.appendChild(bandejasuserdatasms);
    bandejasuserdataname.appendChild(label1);
    bandejasuserdatasms.appendChild(label2);

    return bandejasuser;
}
function addsmsreceive(sms, hor)
{
    var chtsmsusercentersmsrecibe = document.createElement("div");
    chtsmsusercentersmsrecibe.setAttribute("class", "chtsmsusercentersmsrecibe");
    chtsmsusercentersmsrecibe.appendChild(allsms(sms, hor));
    document.getElementById("centersms").appendChild(chtsmsusercentersmsrecibe);
}
function addsmssends(sms, hor)
{
    var chtsmsusercentersmsenvia = document.createElement("div");
    chtsmsusercentersmsenvia.setAttribute("class", "chtsmsusercentersmsenvia");
    chtsmsusercentersmsenvia.appendChild(allsms(sms, hor));
    document.getElementById("centersms").appendChild(chtsmsusercentersmsenvia);
}
function allsms(sms, hor)
{
    var allsms = document.createElement("div");
    allsms.setAttribute("class", "allsms");

    var texto = document.createElement("div");
    texto.setAttribute("class", "texto");
    texto.innerHTML = sms;

    var hora = document.createElement("div");
    hora.setAttribute("class", "hora");

    var h3 = document.createElement("h3");
    h3.innerHTML = hor;

    allsms.appendChild(texto);
    allsms.appendChild(hora);
    hora.appendChild(h3);
    return allsms;
}
var idfriendchatnow;
function viewchatfriends(g)
{
    var send = {chatfriend: {myuser: id, idfriend: g.id}};
    for (var u = 0; u < chats.length; u++)
    {
        var inf = chats[u];
        if (inf[0] === g.id)
        {
            var cht = {id: inf[0], username: inf[1]};

            idfriendchatnow = cht;
            document.getElementById("namefriend").innerHTML = inf[2];
            document.getElementById("nameallfriend").innerHTML = inf[2];
            document.getElementById("addresfriend").innerHTML = inf[6];
            document.getElementById("emailfriend").innerHTML = inf[7];
            document.getElementById("phonefriend").innerHTML = inf[8];
        }
    }
    websocket.send(JSON.stringify(send));
}