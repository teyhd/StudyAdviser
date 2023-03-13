$(document).ready(function(){
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
      });
      $('input#new_head').characterCounter();
      // Or with jQuery
      $('.modal').modal();
      $('.materialboxed').materialbox();
      $( "#mpopup" ).hide();
      $(document).ready(function(){
        $('select').formSelect();
      });
      $('.datepicker').datepicker({
        firstDay:1,
        format: 'dd.mm.yyyy', // формат даты
        autoClose: true, // автоматически закрывать при выборе даты
        yearRange: [2023, 2100], // диапазон годов
        i18n: {
          cancel: 'Отмена',
          clear: 'Очистить',
          done: 'Готово',
          months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          weekdaysAbbrev: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
        }
      });
})

