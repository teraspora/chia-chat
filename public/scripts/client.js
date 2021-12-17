// Let user use up and down arrows to retrieve previous commands/messages
const COMMAND_SYMBOL = `$`;
const UP = `ArrowUp`;
const DOWN = `ArrowDown`;
const DASH = `-`;
const BANG = `!`;
const SPACE = ` `;
const m = document.getElementById(`m`);
const msgs = document.getElementById(`messages`);
const inc = (_ => (i = 0, _ => i++))();
let mkey = 0;
let name = `Anon`;

document.onreadystatechange = _ => {
    if (document.readyState === `complete`) {
        var socket = io();
        document.forms[0].onsubmit = ev => { 
            ev.preventDefault(); // prevents page reloading
            const msg = m.value;
            socket.emit(`Chia Chat Message`, msg);
            localStorage.setItem(mkey = inc(), msg);
            m.value = ``;
            return false;
        };
        socket.on('Chia Chat Message', msg => {
            const li = document.createElement(`li`);
            console.log(msg);
            if (msg.startsWith(COMMAND_SYMBOL)) {
                process_command(msg.substr(1));
            }
            const text = document.createTextNode(msg);
            li.appendChild(text);
              msgs.appendChild(li);
            });
    }
};

window.addEventListener('keydown', ev => {
    key = ev.key || ev.keyCode;   // keyCode is an older standard
    switch (key) {
        case UP:
            if (mkey > 0) mkey--;
            m.value = localStorage.getItem(mkey);
            break;
        case DOWN:
            if (localStorage.getItem(mkey + 1)) mkey++;
            m.value = localStorage.getItem(mkey);
            break;
        default:
            ;
            break;
    }        
});

function process_command(cmd) {
    console.log(cmd);
    switch(cmd.substr(0, 1)) {
        case DASH:
            console.log(`Colour change command arrived from the ether... `)
            // Allow for hex values or CSS colour names or rgb() calls
            setBackground(msgs, cmd.substr(1));
            break;
        case BANG:
            console.log(`Rotation command arrived from the ether... `)
            rotateBody(cmd.substr(1));
            break;
        case SPACE:
            name = cmd.substr(1).replace(/^\w/, s => s.charAt(0).toUpperCase() + s.substr(1));
            break;
        default:
            break;
    }
}

function setBackground(element, colour) {
    element.style.backgroundColor = colour;
}
function rotateBody(phi) {
    document.body.style.transform = `rotate(${phi})`;
}
