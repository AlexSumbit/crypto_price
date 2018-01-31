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
    }

    datePicker.init();
}