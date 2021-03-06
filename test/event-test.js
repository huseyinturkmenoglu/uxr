/**
 * event-test
 **/

describe('Event Manager', () => {
    // event test
    (() => {
        let div = createElement('div', {id: 'event'});
        let input = createElement('input', {id: 'event-input', type: 'text'});
        let p = createElement('p', {
            id: 'event-paragraph',
            innerHTML: '<a class="event-link" href="#" data-trigger="child-element">test</a>' +
            '<a class="event-link2" href="#" data-trigger="child-element2">test</a>'
        });

        appendTo(div, [input, p]);
        appendToBody(div);
    })();

    let inputElem = _('#event-input');
    let paragraphElem = _('#event-paragraph');

    let value = '';
    let triggered = [];
    let handler = e => {
        e.preventDefault();
        triggered.push(e.currentTarget.dataset.trigger);
    };

    describe('Add Event', () => {
        it('should add an event', () => {
            inputElem.on('change', e => value = e.currentTarget.value);

            inputElem.attr('value', controls.value);
            inputElem.trigger('change');

            expect(value).to.be.equal(controls.value);
        });

        it('should add multiple events at once', () => {
            inputElem.on('focus blur', e => triggered.push(e.type));

            inputElem.trigger('focus');
            inputElem.trigger('blur');

            expect(triggered.includes('focus')).to.be.true;
            expect(triggered.includes('blur')).to.be.true;
        });

        it('should add an event to child element', () => {
            paragraphElem.on('click', '.event-link', handler);

            paragraphElem.find('.event-link').trigger('click');

            expect(triggered.includes('child-element')).to.be.true;
        });

        it('should stores the attached events in `uxrAttachedEvents` on item', () => {
            expect(inputElem[0].uxrAttachedEvents.change).to.not.be.undefined;
        });
    });

    describe('Remove Event', () => {
        it('should remove an event', () => {
            value = '';
            inputElem.off('change');
            inputElem.attr('value', controls.value);
            inputElem.trigger('change');

            inputElem.off('this-should-be-skipped');

            expect(inputElem[0].uxrAttachedEvents['change']).to.be.empty;
            expect(inputElem.attr('value')).to.not.be.equal(value);
        });

        it('should remove event with defined handler', () => {
            let eventResult = {};
            let handler = e => {
                eventResult['withHandler'] = e.type
            };

            inputElem.on('change', handler);
            inputElem.on('change', e => {
                eventResult['withAnonFunc'] = e.type
            });

            inputElem.off('change', handler);
            inputElem.trigger('change');

            expect(eventResult['withHandler']).to.be.undefined;
            expect(eventResult['withAnonFunc']).to.be.equal('change');
        });

        it('should remove multiple events at once', () => {
            inputElem.off('focus blur');
            expect(inputElem[0].uxrAttachedEvents['focus']).to.be.empty;
            expect(inputElem[0].uxrAttachedEvents['blur']).to.be.empty;
        });

        it('should remove the attached event with a handler from child element', () => {
            // if you send handler, it only removes the handler but event type stays in element object
            paragraphElem.off('click', '.event-link', handler);

            expect(paragraphElem.find('.event-link')[0].uxrAttachedEvents['click']).to.be.empty;
        });

        it('should remove the attached event with anonymous func from child element', () => {
            paragraphElem.on('click', '.event-link2', e => {
                e.preventDefault();
                triggered.push(e.currentTarget.dataset.trigger);
            });

            _('.event-link2').trigger('click');

            paragraphElem.off('click', '.event-link2');

            expect(triggered.includes('child-element2')).to.be.true;
            expect(paragraphElem.find('.event-link2')[0].uxrAttachedEvents['click']).to.be.empty;
        });
    });

    describe('Single Run Event', () => {
        it('should runs the event one time and remove itself', () => {
            value = '';
            inputElem.once('focus', e => value = e.currentTarget.value);
            inputElem.trigger('focus');

            inputElem.attr('value', controls.newValue);
            inputElem.trigger('focus');

            expect(value).to.not.be.equal(controls.newValue);
        });

        it('should runs the event one time and remove itself from a child element', () => {
            let counter = 0;

            paragraphElem.once('click', '.event-link2', e => {
                e.preventDefault();
                counter++;
            });

            // first trigger => counter = 1;
            paragraphElem.find('.event-link2').trigger('click');

            // second trigger => counter = 1 no changed
            paragraphElem.find('.event-link2').trigger('click');

            expect(counter).to.not.be.equal(1);
        });
    });

    describe('Event Trigger', () => {
        it('should trigger an event', () => {
            let counter = 0;
            paragraphElem.on('click', () => counter++);
            paragraphElem.trigger('click');
            paragraphElem.off('click');
            expect(counter).to.be.equal(1);
        });

        it('should trigger an event on children elements', () => {
            let counter = 0;
            paragraphElem.on('click', '.event-link', () => counter++);
            paragraphElem.trigger('click'); // no effect
            paragraphElem.trigger('click', '.event-link');
            paragraphElem.off('click', '.event-link');
            paragraphElem.off('click');
            expect(counter).to.be.equal(1);
        });

        it('should trigger an event', () => {
            let counter = 0;
            let event = {};

            paragraphElem.on('customClick', (e) => {
                event = e;
                counter++
            });
            paragraphElem.trigger('customClick', {custom: 'params'});
            paragraphElem.off('customClick');
            expect(counter).to.be.equal(1);
            expect(event.detail.custom).to.be.equal('params');
        });

        it('should trigger an event with params in children elements', () => {
            let counter = 0;
            let event = {};

            paragraphElem.on('customClick', '.event-link', (e) => {
                event = e;
                counter++
            });
            paragraphElem.trigger('customClick', '.event-link', {custom: 'params'});
            paragraphElem.off('customClick', '.event-link');
            expect(counter).to.be.equal(1);
            expect(event.detail.custom).to.be.equal('params');
        });
    });
});