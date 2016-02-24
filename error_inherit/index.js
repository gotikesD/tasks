var util = require('util');

var words = {
    'Hi': 'Hello',
    'Privet': 'Zdarova' ,
    'world' : 'mir'
};

function WordError(message) {
    this.message = message;

    Error.captureStackTrace(this);
}
util.inherits(WordError,Error);
WordError.prototype.name = 'WordError';

function HttpError(status,message) {
    this.status = status;
    this.message = message;
}

util.inherits(HttpError,Error);

HttpError.prototype.name = 'HttpError';

function getWord(name) {
    if(!words[name]) {
        throw new WordError ('Do not have such word ' + name);
    } else return words[name];
}

function makePage(url) {
    if(url != 'index.html') {
        throw new HttpError(404,'We do not have such page');
    } else
        return util.format("%s %s", getWord('---') ,getWord('world'));
}


try {
    var page = makePage('index.html');
    console.log(page);
} catch (e) {
    if(e instanceof HttpError) {
        console.log(e.status, e.message)
    } else {
        console.log(e.name, e.message , e.stack);
    }
}


