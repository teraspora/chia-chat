document.onreadystatechange = _ => {
    if (document.readyState === `complete`) {
        var socket = io();
        document.forms[0].onsubmit = ev => { 
            ev.preventDefault(); // prevents page reloading
            socket.emit(`Chia Chat Message`, document.getElementById(`m`).value);
            document.getElementById(`m`).value = ``;
            return false;
        };
        socket.on('Chia Chat Message', msg => {
            const li = document.createElement(`li`);
            const text = document.createTextNode(msg);
            li.appendChild(text);
              document.getElementById(`messages`).appendChild(li);
            });
    }
  };
