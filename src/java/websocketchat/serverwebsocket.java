/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package websocketchat;

import conexion.consultas;
import controller.getsms;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONObject;
import org.json.XML;

/**
 *
 * @author wladi
 */
@ServerEndpoint("/chat")
public class serverwebsocket {

    private static final List<Session> conectados = new ArrayList<>();
    private static final Collection<JSONObject> sessionesJSON = new ArrayList<JSONObject>();
    private static boolean open = false;

    @OnOpen
    public void nuevo(Session amig) {
        conectados.add(amig);
        open = true;
        System.out.println("sesion reciente:" + amig.getId());
    }

    public String addnamsession(Session se, String name) {
        JSONObject cuerpo = new JSONObject();
        cuerpo.put("user", name);
        cuerpo.put("id", se.getId());
        JSONObject head = new JSONObject();
        head.put("session", cuerpo);
        return head.toString();
    }

    public void deleteusers(Session se) {
        JSONObject json = new JSONObject();
        JSONObject json1 = new JSONObject();
        Iterator<JSONObject> iterator = sessionesJSON.iterator();
        while (iterator.hasNext()) {
            json = iterator.next();
            System.out.println("value= " + json);
            System.out.println("value= " + json.get("session"));
            json1 = (JSONObject) json.get("session");
            if (json1.get("id").toString().equals(se.getId())) {
                iterator.remove();
            }
        }
    }

    public JSONObject getuser(Session s) {
        JSONObject json = new JSONObject();
        JSONObject json1 = new JSONObject();
        JSONObject envio = new JSONObject();
        ArrayList<String> names = new ArrayList<String>();
        Iterator<JSONObject> iterator = sessionesJSON.iterator();
        while (iterator.hasNext()) {
            json = iterator.next();
            json1 = (JSONObject) json.get("session");
            if (!json1.getString("id").equals(s.getId())) {
                names.add(json1.getString("user"));
            }
        }
        envio.put("users", names.toArray());
        return envio;
    }

    public String getsessionvalidate(String username) {
        JSONObject json = new JSONObject();
        JSONObject json1 = new JSONObject();
        Iterator<JSONObject> iterator = sessionesJSON.iterator();
        while (iterator.hasNext()) {
            json = iterator.next();
            json1 = (JSONObject) json.get("session");
            if (json1.getString("user").equals(username)) {
                return json1.getString("id");
            }
        }
        return "";
    }

    public JSONObject sendmessage(int idreceiver, int idsend, String tipo) {

        getsms g = new getsms();
        JSONObject cuerpo = new JSONObject();
        JSONObject send = new JSONObject();
        if (tipo.equals("returnrecibe")) {
            cuerpo.put("mychatallfriend", chatsfriend(idreceiver, idsend));
            cuerpo.put("chatfriend", g.getchatfriends(idreceiver));
            cuerpo.put("idrec", idsend);
        } else {
            cuerpo.put("mychatallfriend", chatsfriend(idsend, idreceiver));
            cuerpo.put("chatfriend", g.getchatfriends(idsend));
            cuerpo.put("idrec", idreceiver);
        }
        send.put(tipo, cuerpo);

        return send;
    }

    public void addsesions(Session se, String name) {
        JSONObject cuerpo = new JSONObject(addnamsession(se, name));
        sessionesJSON.add(cuerpo);
    }

    @OnClose
    public void onClose(Session amig) {
        deleteusers(amig);
        conectados.remove(amig);
    }

    public JSONObject sendopen(String message, Session cliente) {
        consultas c = new consultas();
        getsms g = new getsms();
        String nameuser = c.getuser("select \"USER\" from users where iduser='" + message + "'").trim();
        addsesions(cliente, nameuser);
        JSONObject cuerpo = new JSONObject();
        cuerpo.put("myinfo", nameuser);
        cuerpo.put("mychatinfo", g.getchatfriends(Integer.valueOf(message)));
        return cuerpo;
    }

    public JSONObject chatsfriend(int myid, int idfriend) {
        getsms g = new getsms();
        return g.getsmss(myid, idfriend);
    }

    @OnMessage
    public void onMessage(String message, Session cliente) {
        try {
            System.out.println(cliente.getId());
            System.out.println(message);
            if (open) {
                open = false;
                cliente.getBasicRemote().sendObject(sendopen(message, cliente).toString());
            } else {
                JSONObject obj = new JSONObject(message);
                if (obj.has("chatfriend")) {
                    obj = obj.getJSONObject("chatfriend");
                    cliente.getBasicRemote().sendObject(chatsfriend(Integer.valueOf(obj.getString("myuser")), Integer.valueOf(obj.getString("idfriend"))).toString());
                } else if (obj.has("chatsend")) {
                    obj = obj.getJSONObject("chatsend");
                    getsms g = new getsms();

                    if (g.savedata(Integer.valueOf(obj.getString("iduser")), Integer.valueOf(obj.getString("idsend")), obj.getString("message")) > 0) {
                        for (Session con : conectados) {
                            if (con.getId().equals(getsessionvalidate(obj.getString("username")))) {
                                con.getBasicRemote().sendObject(sendmessage(Integer.valueOf(obj.getString("iduser")), Integer.valueOf(obj.getString("idsend")), "returnrecibe").toString());
                            }
                        }
                        cliente.getBasicRemote().sendObject(sendmessage(Integer.valueOf(obj.getString("iduser")), Integer.valueOf(obj.getString("idsend")), "returnenvia").toString());
                    }
                } else {
                    for (Session con : conectados) {
                        con.getBasicRemote().sendObject(message);
                    }
                }
            }
        } catch (IOException ex) {
            Logger.getLogger(serverwebsocket.class
                    .getName()).log(Level.SEVERE, null, ex);

        } catch (EncodeException ex) {
            Logger.getLogger(serverwebsocket.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
    }

}
