const __VikaData__ = {};
const __VikaFunctions__ = {};

const Vika = {
    el: "",
    methods: {},
    vikaElements: "VIKA-FOR",
    methods(a) {
        if (a && typeof a == "object") {
            for (const key in a) {
                const val = a[key];
                Object.defineProperty(__VikaFunctions__, key, {
                    get() {
                        return val;
                    },
                    //still thinking for reactivity :(
                    // set() {

                    // }
                })
            }
        }
        return __VikaFunctions__;
    },

    data(a) {
        if (a && typeof a == "object") {
            for (const key in a) {
                const val = a[key];
                Object.defineProperty(__VikaData__, key, {
                    get() {
                        return val;
                    },
                })
            }
        }
        return __VikaData__;
    },

    test(a) {
        console.info(`Test: ${a}`)
    },

    error(msg) {
        throw new Error(msg)
    },

    handle(el) {
        Array.from(el.childNodes).forEach(v => {
            if (v.nodeName == "#text") {
                v.textContent = Vika.textToData(v.textContent);
            } else {
                if (v.tagName.includes(Vika.vikaElements)) {
                    Vika.test("special elements")
                    Vika.specialHandle(v);
                } else {
                    const attrs = v.attributes;

                    Array.from(attrs).forEach(element => {
                        if (element.name.includes("on@")) {
                            const attr = element.name.trim().replace("on@", "");
                            const attrValue = element.value;

                            if (Vika.methods()[attrValue]) {
                                v.addEventListener(attr, (e) => {
                                    Vika.methods()[attrValue](e);
                                })
                            } else {
                                Vika.error("Couldn't Found: " + attrValue)
                            }
                            Vika.test("added event listener")
                            v.removeAttribute(element.name, '');

                        }
                    })

                    for (let index = 0; index < attrs.length; index++) {
                        const element = attrs[index];

                    }
                    Vika.test("handle")
                    Vika.handle(v);

                }
            }
        })
        return el;
    },

    specialHandle(element) {
        const { tagName } = element;
        if (tagName == "VIKA-FOR") {
            const time = Number(element.getAttribute("in")) || 1;
            for (let index = 0; index < time; index++) {
                var renderedElement = Vika.handle(element.cloneNode(true));
                var childNodes = Array.from(renderedElement.childNodes);
                childNodes = childNodes.reverse();
                childNodes.forEach(v => {
                    if (v.nodeName == "#text") {
                        element.insertAdjacentText("beforebegin", v.textContent);
                    } else {
                        element.insertAdjacentElement("beforebegin", v);
                    }
                })
            }
        }
        element.remove();
    },

    //this function gets {:VALUE:} variables and replaces them to data.
    textToData(text) {
        let returnText = text;
        const match = text.matchAll(/\{\:(.*?)\:\}/g);
        [...match].forEach(value => {
            if (Vika.data()[value[1]]) {
                returnText = returnText.replace(value[0], Vika.data()[value[1]]);
            } else {
                Vika.error(`${value[0]} not found.`)
            }
        })
        return returnText;
    },

    serve(el) {
        if (typeof el !== "string") {
            Vika.error("ID must be a string");
        }

        let elem = document.getElementById(el);
        Vika.dom = elem;
        Vika.el = el;
        const app = Vika.handle(Vika.dom);
    }
}

export default Vika;