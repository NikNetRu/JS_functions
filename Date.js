/* 
 * TODO:
 * Класс Date который конструирует ячейку даты.
 * Входные данные:
 * - HTML код ячейки
 * - дата для которой генерируется ячейка
 * - данныйе в формате JSON, которые необходимо вставить в HTML код
 * - метод по которому будут выводится полученные данные JSON
 * Выходные данные:
 * - ячейка даты по входному HTML, дате, функции вывода в эту ячейку иформации.
 */

/*
 * 
 * @type Класс Date, принимает контент в виде HTML кода,
 * даты в виде даты формата Date, информации в ф-те Json
 * И функции обработки Json в код
 * Aункция обработbr: принимает 2 аргумента - HTML код, а 
 * так же массив [ключ, значение], и определяет что и как
 * изменить в HTML коде.
 */
class Date {
    constructor(HTML, date, jsonInform, func){
        this.HTML = HTML;
        this.date = date;
        this.jsonInform = jsonInform;
        this.func = func;
        this.makedContent = null;
    }
    
    contentGenerator () {
        let content = this.HTML;
        let jsonParse = JSON.parse(this.jsonInform);
        /*
         * Ищем сопадения в HTML коде по заданному признаку
         * и меняем на данные с Json Informtaion
         * 1. Рекурсивно пробегаем по jsonParse и вызываем для каждого
         * элемента  func
         */
        function recurse(obj, func, content) {
            let prop = null;
            for (prop in obj) {
                if (typeof(obj[prop]) === 'object') { 
                    /*Если обьект пришёл, но в нём массив значений:
                     * элементам массива присваивается соответсвующий индекс *_i
                     * */
                    if (typeof(obj[prop][0]) !== "undefined") {
                         obj[prop].forEach(function(item,i,arr) 
                            {   
                                content = func(content, [prop+'_'+i, item]);
                            });
                            return content;
                        }
                content = recurse(obj[prop], func, content);
                };
            content = func(content, [prop, obj[prop]]);
            }
            return content;
        };
        
        content = recurse(jsonParse, this.func, content);
        let cell = document.createElement('div');
        this.makedContent = cell;
        return console.log(content);
    }
    
} 

let jsonInform = `{"firstName": "Иван",
   "lastName": "Иванов",
   "address": {
       "streetAddress": "Московское ш., 101, кв.101",
       "city": "Ленинград",
       "postalCode": 101101
   },
   "phoneNumbers": [
       "812 123-1234",
       "916 123-4567"
   ]}`;

let HTML = `<person>
                <firstName>p_firstName</firstName>
                <lastName>p_lastName</lastName>
                    <address>
                        <streetAddress>p_streetAddress</streetAddress>
                        <city>p_city</city>
                        <postalCode></postalCode>
                    </address>
                    <phoneNumbers>
                        <phoneNumber>p_phoneNumbers_0</phoneNumber>
                        <phoneNumber>p_phoneNumbers_1</phoneNumber>
                    </phoneNumbers>
            </person>`;

/*
 * Замена p_*name* на значение = obj[*name*]
 * item = array [ключ, свойство]
 */
let func = function (text, item) {
    return text.replace(`p_${item[0]}`, item[1]);
};

let date = new Date(HTML, '1/06/22', jsonInform, func);

date.contentGenerator();

