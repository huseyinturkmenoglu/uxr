/**
 * setup
 **/

let controls = {
    innerText: 'Hello World!',
    newInnerText: 'New innerText Value',
    innerHTML: 'Hello <strong>new</strong> World!',
    newInnerHTML: 'Hello <strong>to you</strong> too!',
    href: 'https://uxrocket.io/',
    newHref: 'https://github.com/uxrocket',
    src: 'https://avatars1.githubusercontent.com/u/9591419',
    newSrc: 'https://uxrocket.io/dummy.jpg',
    value: 'Hello World!',
    newValue: 'New input value'
};

const createElement = (type, attributes) => {
    let element = document.createElement(type);

    Object.keys(attributes).forEach(key => {
        element[key] = attributes[key];
    });

    return element;
};

const appendTo = (to, elements) => {
    let list = Array.isArray(elements) ? elements : [elements];

    list.forEach(element => to.appendChild(element));
};

const appendToBody = elements => appendTo(document.body, elements);

// attribute setup
(() => {
    let div = createElement('div', {id: 'attr'});
    let paragraph = createElement('p', {id: 'attr-paragraph', innerText: controls.innerText});
    let anchor = createElement('a', {id: 'attr-anchor', href: controls.href});
    let img = createElement('img', {id: 'attr-img', src: controls.src});
    let input = createElement('input', {id: 'attr-input', type: 'text', value: controls.value});
    let span = createElement('span', {id: 'attr-span', innerHTML: controls.innerHTML});

    appendTo(div, [paragraph, anchor, img, input, span]);
    appendToBody(div);
})();

// manipulation setup
(() => {
    let div = createElement('div', {id: 'manipulation'});

    appendToBody(div);
})();