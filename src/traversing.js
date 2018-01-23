/**
 * traversing
 **/

/* global mutated */

_.extend.closest = function (selector) {
    let el = this.el[0];

    while (el !== null && el.nodeType === 1) {
        if (el.matches(selector)) {
            return el;
        }

        el = el.parentNode;
    }

    return null;
};

_.extend.next = function (selector) {
    return mutated(this, this.el.map(item => item.nextElementSibling).filter(item => selector ? item.matches(selector) : item));
};

_.extend.prev = function (selector) {
    return mutated(this, this.el.map(item => item.previousElementSibling).filter(item => selector ? item.matches(selector) : item));
};

_.extend.first = function () {
    return mutated(this, this.el.filter((item, index) => index === 0));
};

_.extend.last = function () {
    let last = this.length - 1;
    return mutated(this, this.el.filter((item, index) => index === last));
};