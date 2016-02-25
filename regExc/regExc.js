
//Для проверки email расскоментируйте вызов функции  emailTest.
//Для проверки date расскоментируйте вызов функции  dateTest();
//Для проверки number расскоментируйте вызов функции numberTest();
//Для проверки html расскоментируйте вызов функции htmlTest();

    var email = new RegExp('^[a-z]{2,20}@{1}[a-z]{2,6}\.{1}[ru,com,ua]{1}');
    var date = new RegExp('^[0-9]{2}[\. \-]\[a-z]{3,9}[\. \-][0-9]{4}');
    var number = new RegExp('^\\(?\\+{1}380{1}\\)?[\- \\/]?[0-9]{2}[\- \\/]?[0-9]{3}[\- \\/]?[0-9]{2}[\- \\/]?[0-9]{2}$');
    var html = new RegExp('^<{1}[a-z]{1,10}>{1}.{1,1000}<{1}\/{1}[a-z]{1,10}>{1}$');


var dateTest = function() {
    var dateArr = ['31.june.1992', '31-october-2015' ,'12 october 1980', '30 12 1999', '2606 2006']

    for(i =0; i < dateArr.length; i++) {
        console.log(date.test(dateArr[i]));
    }
}

//dateTest();

var emailTest = function() {
    var emailArr = ['some@mail.com', 'something@mail.ru' ,'denis@yandex.ua', '<script>@safas' , 'somethingbad@']
    for(x =0; x < emailArr.length; x++) {
        console.log(email.test(emailArr[x]));
    }
}

 // emailTest();

var numberTest = function() {
    var numlArr = ['+380936641068','(+380) 50 664 10 68' , '(+380 93 664 10 68' , '+393 93 664 10 68' , '380 93 664 10 68' ]
    for(x =0; x < numlArr.length; x++) {
        console.log(number.test(numlArr[x]));
    }
}
//numberTest();

var htmlTest = function() {
    var htmlArr = ['<div>Something...</div>' , '<p>Enother content ..</p>' , '<mark>123456789</mark>' ,
                   '<div>You forget put / in -> <div>' , '<div>You forget write /div']
    for(x =0; x < htmlArr.length; x++) {
        console.log(html.test(htmlArr[x]));
    }
}
//htmlTest();