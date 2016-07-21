
// ID элемента для вставки полей
var APPEND_ELEMENT = '#element_append';


    new ui.Form('form-user')
        .setTitle('Title form', 'mini title form')
        .setUrtDel('id', 'http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setUrlAdd('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setUrlEdit('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setFormReadOnly(false)
        .setWidthCaption(4)

        .addBlock('User', 'Title-1')
        .newLine()
        .addTextField('surname', 'Фамилия', true)
        .addReadOnlyField(null, null, null)

        .newLine()
        .addTextField('name',    'Имя', true)
        .addTextField('middlename', 'Отчество', false)

        .newLine()
        .addTextareaField('description_kr', 'Краткое описание', true)
        .addTextareaField('description_pl', 'Полное описание', false)

        .newLine()
        .addTextField('email', 'E-mail', true)
        .addReadOnlyField(null, null, null)

       // .newLine()
       // .addRelationship('contacts')
       // .addReadOnlyField(null, null, null)
       // .addTextField('alt', 'альтернативный текст', true)
       // .addTextField('title', 'Заголовок', true)
       // .addTextareaField('description', 'описание', false)
       // .addTextField('url', 'URL', false)
       // .addReadOnlyField(null, null, null)
       //
       // .addRelationship('image')
       // .addReadOnlyField(null, null, null)
       // .addTextField('alt', 'альтернативный текст', false)
       // .addTextField('title', 'Заголовок', false)
       // .addTextareaField('description', 'описание', false)
       // .addTextField('url', 'URL', false)
       // .addReadOnlyField(null, null, null)

        //.addRelationship('image')
        //.addTextField('alt2', 'альтернативный текст2', false)

        .newLine()
        .addPasswordField('password', 'Пароль', true)
        .addPasswordField('password_repeat', 'Повторите пароль', true)

        .newLine()
        .addCheckboxField('send_pass', 'Отправить пароль на почту', true)
        .addReadOnlyField(null, null, null)

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
        .addReadOnlyField(null, null, null)

        .newLine()
        .addDateField('period_n', 'Период надало', true)
        .addDateField('period_k', 'Период конец', true)

        .newLine()
        .addRadioField(
            'type',
            'Radio',
            ['Тип-1', 'Тип-2', 'Тип-3', 'Тип-4', 'Тип-1', 'Тип-2'],
            true,
            4
        )
        .addReadOnlyField(null, null, null)

        .setDataFields(
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
                type: 2
            }
        )
        .addRelationDataFields(
            'image',
            [
                {
                    id: 1,
                    alt: 'alt text1',
                    title: 'title image1',
                    description: 'description image1',
                    url: 'www.url.img1'
                },
                {
                    id: 2,
                    alt: 'alt text2',
                    title: 'title image2',
                    description: 'description image2',
                    url: 'www.url.img2'
                },
                {
                    id: 3,
                    alt: 'alt text3',
                    title: 'title image3',
                    description: 'description image3',
                    url: 'www.url.img3'
                }
            ]
        )
        .appendHTML(APPEND_ELEMENT);