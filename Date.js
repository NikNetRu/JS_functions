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
        console.log(jsonParse);
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
                    /*Если обьект пришёл, но в нём массив значений - цифровых ключей*/
                    if (obj[prop][0] !== undefined) {
                         obj[prop].forEach(function (item,i,arr) 
                            {   
                                console.log(prop+'_'+i, item);
                                return func(content, [prop+'_'+i, item]);
                            });
                        }
                console.log(`${obj[prop]} ${typeof(obj[prop])}`); 
                recurse(obj[prop], func, content);
                }
            console.log(`${obj[prop]} не объект`);
            console.log([obj[prop], prop]);
            content = func(content, [prop,obj[prop]]);
            console.log(content);
            }
        };
        
        content = recurse(jsonParse, this.func, content);
        
        let cell = document.createElement('div');
        return console.log(cell.innerHTML= `${content}`);
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
                        <streetAddress></streetAddress>
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

