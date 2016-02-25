
//Для проверки email расскоментируйте вызов функции  emailTest.
//Для проверки date расскоментируйте вызов функции  dateTest();
//Для проверки number расскоментируйте вызов функции numberTest();
//Для проверки html расскоментируйте вызов функции htmlTest();

    var email = /^[a-z]{2,20}@{1}[a-z]{2,6}\.[ru,com,ua]/;
    var date = /^[0-9]{2}[\. \-][a-z]{3,9}[\. \-][0-9]{4}$/;
    var number = /^\+(380)\d{9}$/;
    var html = /^<[a-z]{1,10}>[^</?a-z>].{1,1000}[^</?a-z>]<\/[a-z]{1,10}>$/;


var dateTest = function() {
    var dateArr = ['31.june.1992', '31-october-2015' ,'12 october 1980', '30 12 1999', '2606 2006']

    for(i =0; i < dateArr.length; i++) {
        console.log(dateArr[i]+ ' - ' + date.test(dateArr[i]));
    }
}
console.log('\n');
console.log('Data Test');
dateTest();
console.log('\n');

var emailTest = function() {
    var emailArr = ['some@mail.com', 'something@mail.ru' ,'denis@yandex.ua', '<script>@safas' , 'somethingbad@']
    for(x =0; x < emailArr.length; x++) {
        console.log( emailArr[x] + ' - ' +email.test(emailArr[x]));
    }
};
  console.log('email Test');
  emailTest();
  console.log('\n');

var numberTest = function() {
    var numbArr = ['+380936641068','(+380) 50 664 10 68' , '(+380 93 664 10 68' , '+393 93 664 10 68' , '380 93 664 10 68' ]
    for(x =0; x < numbArr.length; x++) {
        var newNum = numbArr[x].replace(/[^\+\d]/g, '');
        console.log( newNum + ' - ' + number.test(newNum));
    }
};
console.log('Number Test');
numberTest();
console.log('\n');

var htmlTest = function() {
    var htmlArr = ['<div>Something...</div>' , '<p>Enother content ..</p>' , '<mark>123456789</mark>' ,
                   '<div>Some text <p> <div>' , '<div></span> some text</div>']
    for(x =0; x < htmlArr.length; x++) {
        console.log(htmlArr[x] + ' - ' + html.test(htmlArr[x]));
    }
}
console.log('Html Test');
htmlTest();


