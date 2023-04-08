// Переменные
let item_translate = 0;
let desc_translate = 0;

// Получение словаря с данными товара
const data = JSON.parse(document.getElementById('item_data').textContent);

// Тестирование вывода
console.log(data['result']['item']['myskus']);


// ОТСЛЕЖИВАНИЕ ВЫБОРА ЦВЕТА ТОВАРА
$('.item-skus-variant').on('click', function(){
    // ПЕРЕМЕННЫЕ
    // Коллекция цветов
    let colors = $('.item-skus-skus');
    // Получение индекса выбранного цвета
    let index = $(this).index();
    let items = colors.find('.item-skus-variant');

    // ОБРАБОТЧИК НАЖАТИЯ НА ЦВЕТ
    // Удалить классы у всех потомков
    $( ".item-skus-variant" ).each(function() {
        $( this ).removeClass( 'active' );
    });
    // Добавить класс выделения для данного цвета
    items.eq(index).addClass('active');

    // ОБНОВЛЕНИЕ МОДЕЛЕЙ
    // Скрыть все модели для всех цветов
    $( ".item-props-props" ).each(function() {
        $( this ).addClass( 'none' );
    });
    // // Добавить коллекцию моделей для выбранного цвета
    $( ".item-props-props" ).eq(index).removeClass('none');
});

// ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЯ INPUT В МОДЕЛЯХ
$(document).on("input",function(ev){
    // Значение input - кол-во товара
    var quantity = Number($(ev.target).val());
    // Предок input
    var parent = $(ev.target).parent().parent().parent();

    console.log(parent);
    // Получение цены
    var price = Number(parent.find('.item-props-variant-price').text().replace(' ₽', ''));
    console.log(price);
    var total_price = quantity * price;
    parent.find('.item-props-variant-sum').text(total_price.toFixed(2) + ' ₽');
});


// ОТСЛЕЖИВАНИЕ НАЖАТИЯ НА ПЕРЕВОД БЛОКА ТОВАРА
$('.translate-item').click(function() {

    if (item_translate == 1) {
        // Изменения текста ссылки
        $('.translate-item').html('Показать оригинальный текст');

        // Изменение заголовка
        $('.item-title').html($('.item-title').attr('translated'));

        // Перебор цветов
        $('.item-skus-variant-text').each(function(i, obj) {
            $(obj).html($(obj).attr('translated'));
        });

        // Перебор моделей
        $('.item-props-variant-name').each(function(i, obj) {
            $(obj).html($(obj).attr('translated'));
        });

        // Изм. описания
        $('.desc-atr-atr').each(function(i, obj) {
            $(obj).html('<b>'+$(obj).attr('translated-name')+'</b>: '+$(obj).attr('translated-value') );
        });

        // Переменная перекл.
        item_translate = 0;

   }
    else {
        // Изменения текста ссылки
        $('.translate-item').html('Показать перевод');

        // Изменение заголовка
        $('.item-title').html($('.item-title').attr('original'));

        // Перебор цветов
        $('.item-skus-variant-text').each(function(i, obj) {
            $(obj).html($(obj).attr('original'));
        });

        // Перебор моделей
        $('.item-props-variant-name').each(function(i, obj) {
            $(obj).html($(obj).attr('original'));
        });

        // Изм. описания
        $('.desc-atr-atr').each(function(i, obj) {
            $(obj).html('<b>'+$(obj).attr('original-name')+'</b>: '+$(obj).attr('original-value') );
        });

        // Переменная перекл.
        item_translate = 1;
    }
});