
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';


    var test_data = [];

    for (var i = 0; i < 5; i++) {

        test_data.push(
            {
                id: i,
                alt: 'alt text - ' + i,
                title: 'title image - ' + i,
                description: 'description image - ' + i,
                url: 'www.url.img - ' + i
            }
        );
    }


    new ui.Form('form-user')
        .setTitle('Title form', 'mini title form')
        .setUrtDel('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setUrlAdd('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setUrlEdit('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setFormReadOnly(false)
        .setMaxHeightFields(200)
        .setWidthCaption(4)

        .setParentBlock(
            'Title-user',
            'id',
            {
                id: 2,
                surname: 'Киселев',
                name: 'Валерий',
                middlename: 'Александрович',
                description_kr: 'Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.',
                description_pl: 'Его «Фишка» заключается в том, что когда DocumentFragment вставляется в DOM – то он исчезает, а вместо него вставляются его дети. Это свойство является уникальной особенностью DocumentFragment.',
                email: '1xvx1@mail.ru',
                send_pass: 1,
                format_date: 4,
                period_n: '2000-01-01 00:00:00',
                period_k: '2016-12-31 00:00:00',
                type: 3
            }
        )

        .newLineParent()
        .addTextField('surname', 'Фамилия', true)
        .addReadOnlyField(null, null, null)

        .newLineParent()
        .addTextField('name', 'Имя', true)
        .addTextField('middlename', 'Отчество', false)

        .newLineParent()
        .addTextareaField('description_kr', 'Краткое описание', true, 200)
        .addTextareaField('description_pl', 'Полное описание', false, 100)

        .newLineParent()
        .addTextField('email', 'E-mail', true)
        .addReadOnlyField(null, null, null)

            .addChildrenBlock('Title-images', 'Images', 'id', test_data)

            .newLineChildren()
            .addTextField('alt', 'Альтернативный текст', true)
            .addTextField('title', 'Заголовок', true)

            .newLineChildren()
            .addTextareaField('description', 'Описание', true, null)
            .addTextField('url', 'URL', true)



            .addChildrenBlock(
                'Title-email',
                'Email',
                'id',
                [
                    {
                        id: 1,
                        email: 'email - 1'
                    },
                    {
                        id: 2,
                        email: 'email - 2'
                    },
                    {
                        id: 3,
                        email: 'email - 3'
                    }
                ]
            )

            .newLineChildren()
            .addTextField('email', 'Альтернативный текст', true)
            .addReadOnlyField(null, null, null)

        .newLineParent()
        .addPasswordField('password', 'Пароль', true)
        .addPasswordField('password_repeat', 'Повторите пароль', true)

        .newLineParent()
        .addCheckboxField('send_pass', 'Отправить пароль на почту', true)
        .addReadOnlyField(null, null, null)

        .newLineParent()
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

        .newLineParent()
        .addSelectField(
            'test_select_2',
            'Тестовый список - 2',
            ['DD.MM.YYYY', 'DD/MM/YYYY', 'YYYY.MM.DD', 'YYYY-MM-DD', 'YYYY/MM/DD'],
            false
        )
        .addReadOnlyField(null, null, null)

        .newLineParent()
        .addDateField('period_n', 'Период надало', true)
        .addDateField('period_k', 'Период конец', true)

        .newLineParent()
        .addRadioField(
            'type',
            'Radio',
            ['Тип-1', 'Тип-2', 'Тип-3', 'Тип-4', 'Тип-1', 'Тип-2'],
            true,
            4
        )
        .addReadOnlyField(null, null, null)

        .appendHTML(APPEND_ELEMENT);