window.onload = function(){
    
    let datePicker = {
        init: function(){
            let inputs = document.querySelectorAll(".js-date");
            inputs.forEach(function(item){
                item.DatePickerX.init({
                    mondayFirst      : true,
                    format           : 'yyyy-mm-dd',
                    minDate          : new Date(0, 0),
                    maxDate          : new Date(9999, 11, 31),
                    weekDayLabels    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Su'],
                    shortMonthLabels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    singleMonthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    todayButton      : true,
                    todayButtonLabel : 'Today',
                    clearButton      : true,
                    clearButtonLabel : 'Clear'
                });
            });
        }
    };

    let select = {
        init: function(){
            let selects = document.querySelectorAll(".js-select");
            selects.forEach(function(item){
                let selectItems = item.querySelectorAll(".select-item");
                let header = item.querySelector(".select__header");

                header.onclick = function(){
                    item.classList.toggle("select--opened");
                };

                selectItems.forEach(function(currentItem){
                    currentItem.onclick = function(){
                        header.innerHTML = currentItem.innerHTML;
                        item.classList.remove("select--opened");
                    };
                });
            });
        }
    };

    let app = {
        init: function(){
            this.getCurrencies();
        },
        getCurrencies: function(){
            let self = this;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
            xhr.onload = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    let result = xhr.responseText;
                    self.setCurrencies();
                }
            }
            xhr.send(null);
        },
        setCurrencies: function(){
            let elements = document.querySelectorAll(".js-currencies");
            elements.forEach(function(element){
                let tpl = element.querySelector(".js-tpl");
                for(let i = 0; i < 50; i++){
                    tpl.content.querySelector("input[name='currency']").value = i;
                    tpl.content.querySelector("span").innerHTML = i;

                    element.appendChild(document.importNode(tpl.content, true));
                }
            });
            select.init();
        }
    }

    app.init();
    datePicker.init();
}