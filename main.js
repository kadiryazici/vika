import Vika from "./vika.js"

Vika.data({
    hello: "Selamlar ben hello",
    welcome: "Hoşgelmişsiniz sefalar getirmişsiniz",
    mesaj: "Bu mesajdır",
    footer: "Selamlar bu footer"
})

Vika.methods({
    consoleLog(e) {
        console.log(e);
    },

    moveElement(e) {
        const target = e.currentTarget;
        target.style.left = e.clientX - target.offsetWidth / 2 + "px"
        target.style.top = e.clientY - target.offsetHeight / 2 + "px"
    }
})

Vika.serve("vika-app");