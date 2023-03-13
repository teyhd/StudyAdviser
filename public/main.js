// Определяем объект даты
const currentDate = new Date();

// Вычисляем начало недели
const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));

// Вычисляем конец недели
const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));

// Выводим результаты в консоль
//alert(`Начало недели: ${firstDayOfWeek.toLocaleDateString()}`);
//alert(`Конец недели: ${lastDayOfWeek.toLocaleDateString()}`);
