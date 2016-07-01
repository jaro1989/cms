
// ID элемента для вставки полей
var APPEND_ELEMENT = '#element_append';

new ui.Form(null)
    .newLine()
    .addTextField('surname', 'Фамилия')
    .addTextField('name',    'Имя')
    .addTextField('middlename', 'Отчество')

    .newLine()
    .addTextareaField('description_kr', 'Краткое описание')
    .addTextareaField('description_pl', 'Полное описание')

    .newLine()
    .addTextField('email', 'E-mail')
    .addPasswordField('password', 'Пароль')
    .addPasswordField('password_repeat', 'Повторите пароль')

    .newLine()
    .addCheckboxField('send_pass', 'Отправить пароль на почту')

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
        ]
    )
    .addSelectField(
        'test_select',
        'Тестовый список',
        [
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'}
        ]
    )
    .addSelectField(
        'test_select_2',
        'Тестовый список - 2',
        [
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'},
            {value: 'DD.MM.YYYY', text: 'DD.MM.YYYY'}
        ]
    )

    .newLine()
    .addDateField('period_n', 'Период надало')
    .addDateField('period_k', 'Период конец')
    .addRadioField(
        'type',
        null,
        ['Тип-1', 'Тип-2', 'Тип-3', 'Тип-4']
    )
    .setDataValues(
        {
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