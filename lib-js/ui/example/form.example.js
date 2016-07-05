
// ID элемента для вставки полей
var APPEND_ELEMENT = '#element_append';


    new ui.Form()
        .setTitle('Title form', 'mini title form')
        .setDeletion('id', 'url/action/delete')
        .newLine()
        .addTextField('surname', 'Фамилия', true)
        .addTextField('name',    'Имя', true)
        .addTextField('middlename', 'Отчество', false)

        .newLine()
        .addTextareaField('description_kr', 'Краткое описание', true)
        .addTextareaField('description_pl', 'Полное описание', false)

        .newLine()
        .addTextField('email', 'E-mail', true)
        .addPasswordField('password', 'Пароль', true)
        .addPasswordField('password_repeat', 'Повторите пароль', true)

        .newLine()
        .addCheckboxField('send_pass', 'Отправить пароль на почту', true)

        .newLine()
        .addSelectField(
            'format_date',
            'Пользовательский формат даты',
            [
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
                {value: 'DD-MM-YYYY', text: 'DD-MM-YYYY'},
                {value: 'DD/MM/YYYY', text: 'DD/MM/YYYY'},
                {value: 'YYYY.MM.DD', text: 'YYYY.MM.DD'},
                {value: 'YYYY-MM-DD', text: 'YYYY-MM-DD'},
                {value: 'YYYY/MM/DD', text: 'YYYY/MM/DD'}
            ],
            true
        )
        .addSelectField(
            'test_select',
            'Тестовый список',
            [
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'}
            ],
            false
        )
        .addSelectField(
            'test_select_2',
            'Тестовый список - 2',
            [
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
                {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'}
            ],
            false
        )

        .newLine()
        .addDateField('period_n', 'Период надало', true)
        .addDateField('period_k', 'Период конец', true)
        .addRadioField(
            'type',
            'Radio',
            ['Тип-1', 'Тип-2', 'Тип-3', 'Тип-4'],
            true
        )
        .setDataFields(
            {
                id: 2,
                surname: 'Киселев',
                name: 'Валерий',
                middlename: 'Александрович',
                description_kr: 'Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.',
                description_pl: 'Его «Фишка» заключается в том, что когда DocumentFragment вставляется в DOM – то он исчезает, а вместо него вставляются его дети. Это свойство является уникальной особенностью DocumentFragment.',
                email: '1xvx1@mail.ru',
                send_pass: 1,
                format_date: 'YYYY.MM.DD',
                period_n: '2000-01-01 00:00:00',
                period_k: '2016-12-31 00:00:00',
                type: 2
            }
        )
        .appendHTML(APPEND_ELEMENT);

new ui.Ajax('http://symfony.cms/lib-js/ui/example/ajaxTest.php', {action: 'my-test'})
    .addCallbackFunction(function() {
        alert('asdas1');
    })
    .addCallbackFunction(function() {
        alert('asdas2');
    })
    .addCallbackFunction(function() {
        alert('asdas3');
    })
    .send();

