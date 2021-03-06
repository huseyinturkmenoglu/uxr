/**
 * manipulation-test
 **/

describe('Manipulation Methods', () => {
    // manipulation setup
    (() => {
        let div = createElement('div', {id: 'manipulation', innerHTML: '<p>Hello World</p>'});
        let div2 = createElement('div', {id: 'manipulation-2', innerHTML: '<p>Hello World</p>'});
        let div3 = createElement('div', {id: 'manipulation-3', innerHTML: '<p>Hello World</p>'});
        let ul = createElement('ul', {id: 'manipulation-4', innerHTML: '<li>Apple</li><li>Banana</li>'});
        let ul2 = createElement('ul', {id: 'manipulation-5', innerHTML: '<li>Apple2</li><li>Banana2</li>'});

        appendToBody(div);
        appendToBody(div3);
        appendToBody(div2);
        appendToBody(ul);
        appendToBody(ul2);
    })();

    let manipulationElem = _('#manipulation');
    let manipulationElem2 = _('#manipulation-2');
    let manipulationElem3 = _('#manipulation-3');

    describe('Empty', () => {
        it('should clears element inner HTML', () => {
            manipulationElem.empty();

            expect(manipulationElem.html()).to.be.equal('');
        });
    });

    describe('Remove', () => {
        it('should removes the element', () => {
            manipulationElem.remove();

            expect(_('#manipulation').length).to.be.equal(0);
        });
    });

    describe('After, with string', () => {
        it('should insert an element after selected element', () => {
            manipulationElem2.after('<div id="inserted-after"></div>');

            expect(manipulationElem2.el[0].nextSibling.matches('#inserted-after')).to.be.equal(true);
        });
    });

    describe('After, with object', () => {
        it('should insert an element after selected element', () => {
            manipulationElem2.after(manipulationElem3);

            expect(manipulationElem2.el[0].nextSibling.matches('#manipulation-3')).to.be.equal(true);
        });
    });

    describe('Before', () => {
        it('should insert an element before selected element', () => {
            manipulationElem2.before('<div id="inserted-before"></div>');

            expect(manipulationElem2.el[0].previousSibling.matches('#inserted-before')).to.be.equal(true);
        });
    });

    describe('Before, with object', () => {
        it('should insert an element before selected element', () => {
            manipulationElem2.before(manipulationElem3);

            expect(manipulationElem2.el[0].previousSibling.matches('#manipulation-3')).to.be.equal(true);
        });
    });

    describe('Append', () => {
        it('should insert an element inside the selected element', () => {
            manipulationElem2.append('<div id="appended"></div>');

            let originalLi = _('#manipulation-4 li');
            let li = _('#manipulation-5 li');
            _('#manipulation-4').append(li);

            expect(manipulationElem2.el[0].lastChild.matches('#appended')).to.be.equal(true);
            expect(_('#manipulation-4 li').length).to.be.equal(li.length + originalLi.length);
        });
    });

    describe('Prepend', () => {
        it('should insert an element inside the selected element', () => {
            manipulationElem2.prepend('<div id="prepended"></div>');

            expect(manipulationElem2.el[0].firstChild.matches('#prepended')).to.be.equal(true);
        });
    });

    describe('Replace With', () => {
        it('should replace the element with a new one', () => {
            let m3 = _('#manipulation-3');
            let parent = m3[0].parentNode;
            m3.replaceWith('<p id="replaced"></p>');

            expect(parent.querySelector('#manipulation-3')).to.be.equal(null);
            expect(parent.querySelectorAll('#replaced').length).to.be.equal(1);
        });
    });
});