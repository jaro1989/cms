
    var APPEND_ELEMENT = '#element_append';

    var values = {};

    for (var i = 1; i <= 12; i++) {
        values['name-field-' + i] = 'value-' + i;
    }

    var prefix = 'a';
    for(var a in values) {
        if (values.hasOwnProperty(a)) {

            new ui.FFText('a' + values[a], 'a' + a, 'Label -' + a)
                .setWidth(3)
                .setWidthCaption(6)
                .setLeftIcon('earphone')
                .setRightMarker('(8-029)')
                .setSkin('success')
                .appendHTML(APPEND_ELEMENT);

        }
    }

    for(var b in values) {
        if (values.hasOwnProperty(b)) {

            new ui.FFText('b' + values[b], 'b' + b, 'Label -' + b)
                .setWidth(3)
                .setLeftIcon('phone-alt')
                .setRightMarker('(+375 29)')
                .setSkin('warning')
                .appendHTML(APPEND_ELEMENT);

        }
    }

    for(var c in values) {
        if (values.hasOwnProperty(c)) {

            new ui.FFText('c' + values[c], 'c' + c, 'Label -' + c)
                .setWidth(2)
                .setLeftIcon('euro')
                .setSkin('error')
                .appendHTML(APPEND_ELEMENT);

        }
    }

    for(var e in values) {
        if (values.hasOwnProperty(e)) {

            new ui.FFText('e' + values[e], 'e' + e, 'Label -' + e)
                .setWidth(4)
                .setWidthCaption(3)
                .appendHTML(APPEND_ELEMENT);

        }
    }