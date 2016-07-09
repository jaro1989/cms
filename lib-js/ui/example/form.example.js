
// ID элемента для вставки полей
var APPEND_ELEMENT = '#element_append';


    new ui.Form('form-user')
        .setTitle('Title form', 'mini title form')
        .setUrtDel('id', 'http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setUrlAdd('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setUrlEdit('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setFormReadOnly(false)
        //.hideBtnRemove(true)
        .setWidthCaption(4)
        .newLine()
        .addTextField('surname', 'Фамилия', true)
        .addReadOnlyField(null, null)

        .newLine()
        .addTextField('name',    'Имя', true)
        .addTextField('middlename', 'Отчество', false)

        .newLine()
        .addTextareaField('description_kr', 'Краткое описание', true)
        .addTextareaField('description_pl', 'Полное описание', false)

        .newLine()
        .addTextField('email', 'E-mail', true)
        .addReadOnlyField(null, null)

        .newLine()
        .addPasswordField('password', 'Пароль', true)
        .addPasswordField('password_repeat', 'Повторите пароль', true)

        .newLine()
        .addCheckboxField('send_pass', 'Отправить пароль на почту', true)
        .addReadOnlyField(null, null)

        .newLine()
        .addSelectField(
            'format_date',
            'Пользовательский формат даты',
            {1: 'DD.MM.YYYY', 2: 'DD/MM/YYYY', 3: 'YYYY.MM.DD', 4: 'YYYY-MM-DD', 5: 'YYYY/MM/DD'},
            true
        )
        .addSelectField(
            'test_select',
            'Тестовый список',
            ['DD.MM.YYYY', 'DD/MM/YYYY', 'YYYY.MM.DD', 'YYYY-MM-DD', 'YYYY/MM/DD'],
            false
        )

        .newLine()
        .addSelectField(
            'test_select_2',
            'Тестовый список - 2',
            ['DD.MM.YYYY', 'DD/MM/YYYY', 'YYYY.MM.DD', 'YYYY-MM-DD', 'YYYY/MM/DD'],
            false
        )
        .addReadOnlyField(null, null)

        .newLine()
        .addDateField('period_n', 'Период надало', true)
        .addDateField('period_k', 'Период конец', true)

        .newLine()
        .addRadioField(
            'type',
            'Radio',
            ['Тип-1', 'Тип-2', 'Тип-3', 'Тип-4'],
            true
        )
        .addReadOnlyField(null, null)

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
                format_date: 4,
                period_n: '2000-01-01 00:00:00',
                period_k: '2016-12-31 00:00:00',
                type: 2
            }
        )
        .appendHTML(APPEND_ELEMENT);