window.onload = function(){

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
        currencies: {},
        currencieData: {},

        init: function(){
            this.getCurrencies();
            this.getCurrencyPrice("bitcoin");

            

        },
        getCurrencies: function(){
            let self = this;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/');
            xhr.onload = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    let result = xhr.responseText;
                    self.currencies = JSON.parse(result);
                    console.log(self.currencies);
                    self.setCurrencies();
                }
            }
            xhr.send(null);
        },
        setCurrencies: function(){
            let self = this;
            let elements = document.querySelectorAll(".js-currencies");
            elements.forEach(function(element){
                let tpl = element.querySelector(".js-tpl");

                self.currencies.forEach(function(currency){
                    tpl.content.querySelector("input[name='currency']").value = currency.id;
                    tpl.content.querySelector("span").innerHTML = currency.name;
                    tpl.content.querySelector("small").innerHTML = currency.symbol;

                    element.appendChild(document.importNode(tpl.content, true));
                });
            });
            select.init();
        },
        getCurrencyPrice: function(symbol){
            let self = this;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/' + symbol + '/?convert=USD');
            xhr.onload = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    let result = xhr.responseText;
                    self.currencieData = JSON.parse(result)[0];
                    console.log(self.currencies);
                    self.displayCurrency();
                }
            }
            xhr.send(null);
        },
        displayCurrency: function(){
            let self = this;
            //alert(self.currencieData.price_usd);
        }
    }

    app.init();
}