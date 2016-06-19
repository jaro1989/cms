<?php
$page = isset($_GET['page']) ? $_GET['page'] : null;
$url = 'http://symfony.cms/lib-js/ui/example/?page=';
$pare = [
    'ffText'     => 'Текстовые поля',
    'ffRadio'    => 'Radio кнопки',
    'ffCheckbox' => 'Checkbox кнопки',
    'ffTextarea' => 'Textarea',
    'ffPassword' => 'Поле пароль',
    'ffSelect'   => 'Select list',
    'ffButton'   => 'Кнопки',
    'ffDate'     => 'Поле дата'
];
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Example</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
</head>
    <body style="padding-top: 50px;">

        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">

            <ul class="nav navbar-nav">
                <?php
                    foreach ($pare as $key => $value) {

                        $active = '';
                        if ($key === $page) $active = 'active';
                        echo '<li class="' . $active . '"><a href="' . $url . $key . '">' . $value . '</a></li>';
                    }
                ?>
            </ul>

        </nav>

        <script language="javascript">
            <!--
            function day_title(day_name){
                document.write("<TD ALIGN=center WIDTH=35>"+day_name+"</TD>")
            }
            function fill_table(month,month_length) {
                day=1
                document.write("<TABLE BORDER=3 CELLSPACING=3 CELLPADDING=%3><TR>")
                document.write("<TD COLSPAN=7 ALIGN=center><B>"+month+"   "+year+"</B><TR>")
                day_title("Sun")
                day_title("Mon")
                day_title("Tue")
                day_title("Wed")
                day_title("Thu")
                day_title("Fri")
                day_title("Sat")
                document.write("</TR><TR>")
                for (var i=1;i<start_day;i++) {
                    document.write("<TD>")
                }
                for (var i=start_day;i<8;i++) {
                    document.write("<TD ALIGN=center>"+day+"</TD>")
                    day++}
                document.write("<TR>")
                while (day <= month_length) {
                    for (var i=1;i<=7 && day<=month_length;i++) {
                        document.write("<TD ALIGN=center>"+day+"</TD>")
                        day++
                    }
                    document.write("</TR><TR>")
                    start_day=i
                }
                document.write("</TR></TABLE><BR>")
            }
            // End -->
        </script>

        <script language="javascript">
            year=1998
            today= new Date("January 1, "+year)
            start_day = today.getDay() + 1
            fill_table("January",31)
            fill_table("February",28)
            fill_table("March",31)
            fill_table("April",30)
            fill_table("May",31)
            fill_table("June",30)
            fill_table("July",31)
            fill_table("August",31)
            fill_table("September",30)
            fill_table("October",31)
            fill_table("November",30)
            fill_table("December",31)
        </script>


        <br/>

        <div id="calendar-test"></div>

        <div class="panel panel-default" style="width: 255px;">
            <div class="panel-heading">
                <table>
                    <tbody>
                        <tr>
                            <td width="10px">
                                <div class="btn btn-link" style="padding: 0;" title="Предыдущий месяц">
                                    <span class="glyphicon glyphicon-chevron-left"></span>
                                </div>
                            </td>
                            <td width="110px" style="padding-left: 10px;">
                                <input type="text" list="list-years" class="form-control input-sm">
                                <datalist id="list-years">
                                    <option>1997</option>
                                    <option>1998</option>
                                    <option>1999</option>
                                    <option>2000</option>
                                    <option>2001</option>
                                    <option>2002</option>
                                </datalist>
                            </td>
                            <td width="115px" class="text-center"><b>Апрель</b></td>
                            <td width="10px">
                                <div class="btn btn-link" style="padding: 0;" title="Следующий месяц">
                                    <span class="glyphicon glyphicon-chevron-right"></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="panel-body">
                <table class="">
                    <thead>
                    <tr style="font-size: 10px;">
                        <th width="32px" class="text-center">ПН</th>
                        <th width="32px" class="text-center">ВТ</th>
                        <th width="32px" class="text-center">СР</th>
                        <th width="32px" class="text-center">ЧТ</th>
                        <th width="32px" class="text-center">ПТ</th>
                        <th width="32px" class="text-center">СУБ</th>
                        <th width="32px" class="text-center">ВС</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="">
                            <td  style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                        </tr>
                        <tr class="">
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div title="Выбранный день" class=" btn btn-primary active" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">2</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                        </tr>
                        <tr class="">
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div title="Tекущий день" class=" btn btn-danger active" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">2</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">22</div>
                            </td>
                        </tr>
                        <tr class="">
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                        </tr>
                        <tr class="">
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                        </tr>
                        <tr class="">
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                            <td style="padding: 1px;">
                                <div class=" btn btn-default" style="padding: 4px; width: 100%">1</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>









        <div id="element_append" class="container col-md-12 well-lg"></div>


    <script src="../ui.Config.js" type="text/javascript"></script>
    <script src="../ui.FormatDate.js" type="text/javascript"></script>
    <script src="../ui.CSS.js" type="text/javascript"></script>
    <script src="../ui.api.js" type="text/javascript"></script>
    <script src="../ui.Element.js" type="text/javascript"></script>
    <script src="../ui.Calendar.js" type="text/javascript"></script>
    <script src="../ui.FFText.js" type="text/javascript"></script>
    <script src="../ui.FFRadio.js" type="text/javascript"></script>
    <script src="../ui.FFCheckbox.js" type="text/javascript"></script>
    <script src="../ui.FFTextarea.js" type="text/javascript"></script>
    <script src="../ui.FFPassword.js" type="text/javascript"></script>
    <script src="../ui.FFSelect.js" type="text/javascript"></script>
    <script src="../ui.FFButton.js" type="text/javascript"></script>
    <script src="../ui.FFDate.js" type="text/javascript"></script>


    <?php
    if (file_exists($page . '.example.js')) {
        echo '<script src="' . $page . '.example.js' . '" type="text/javascript"></script>';
    }
    ?>
            <script>
                new ui.Calendar()
                    .appendHTML('#calendar-test')

            </script>
    </body>
</html>