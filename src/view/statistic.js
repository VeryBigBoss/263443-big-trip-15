// import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import SmartView from './smart.js';
//
// const renderColorsChart = (colorsCtx, tasks) => {
//   // Функция для отрисовки графика по цветам
//   return new Chart(colorsCtx, {
//     plugins: [ChartDataLabels],
//     type: 'pie',
//     data: {
//       labels: ['BLACK'], // Сюда нужно передать названия уникальных цветов, они станут ярлыками
//       datasets: [{
//         data: [1], // Сюда нужно передать в том же порядке количество задач по каждому цвету
//         backgroundColor: ['#000'], // Сюда нужно передать в том же порядке HEX каждого цвета
//       }],
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           display: false,
//         },
//       },
//       tooltips: {
//         callbacks: {
//           label: (tooltipItem, data) => {
//             const allData = data.datasets[tooltipItem.datasetIndex].data;
//             const tooltipData = allData[tooltipItem.index];
//             const total = allData.reduce((acc, it) => acc + parseFloat(it));
//             const tooltipPercentage = Math.round((tooltipData / total) * 100);
//             return `${tooltipData} TASKS — ${tooltipPercentage}%`;
//           },
//         },
//         displayColors: false,
//         backgroundColor: '#ffffff',
//         bodyFontColor: '#000000',
//         borderColor: '#000000',
//         borderWidth: 1,
//         cornerRadius: 0,
//         xPadding: 15,
//         yPadding: 15,
//       },
//       title: {
//         display: true,
//         text: 'TASKS BY COLORS',
//         fontSize: 16,
//         fontColor: '#000000',
//       },
//       legend: {
//         position: 'left',
//         labels: {
//           boxWidth: 15,
//           padding: 25,
//           fontStyle: 500,
//           fontColor: '#000000',
//           fontSize: 13,
//         },
//       },
//     },
//   });
// };
//
// const renderDaysChart = (daysCtx, tasks, dateFrom, dateTo) => {
//   // Функция для отрисовки графика по датам
//   return new Chart(daysCtx, {
//     plugins: [ChartDataLabels],
//     type: 'line',
//     data: {
//       labels: ['3 Sep'], // Сюда нужно передать названия дней
//       datasets: [{
//         data: [1], // Сюда нужно передать в том же порядке количество задач по каждому дню
//         backgroundColor: 'transparent',
//         borderColor: '#000000',
//         borderWidth: 1,
//         lineTension: 0,
//         pointRadius: 8,
//         pointHoverRadius: 8,
//         pointBackgroundColor: '#000000',
//       }],
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 8,
//           },
//           color: '#ffffff',
//         },
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true,
//             display: false,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false,
//           },
//         }],
//         xAxes: [{
//           ticks: {
//             fontStyle: 'bold',
//             fontColor: '#000000',
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false,
//           },
//         }],
//       },
//       legend: {
//         display: false,
//       },
//       layout: {
//         padding: {
//           top: 10,
//         },
//       },
//       tooltips: {
//         enabled: false,
//       },
//     },
//   });
// };
//
// export const createStatisticTemplate = () => (
//   `<section class="statistics">
//     <h2 class="visually-hidden">Trip statistics</h2>
//
//     <div class="statistics__item">
//       <canvas class="statistics__chart" id="money" width="900"></canvas>
//     </div>
//
//     <div class="statistics__item">
//       <canvas class="statistics__chart" id="type" width="900"></canvas>
//     </div>
//
//     <div class="statistics__item">
//       <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
//     </div>
//   </section>`
// );
//
// export default class Statistic extends SmartView {
//   constructor(points) {
//     super();
//
//     this._data = {
//       points,
//       // По условиям техзадания по умолчанию интервал - неделя от текущей даты
//       // dateFrom: (() => {
//       //   const daysToFullWeek = 6;
//       //   return dayjs().subtract(daysToFullWeek, 'day').toDate();
//       // })(),
//       // dateTo: dayjs().toDate(),
//     };
//
//     // this._dateChangeHandler = this._dateChangeHandler.bind(this);
//
//     this._setCharts();
//     this._setDatepicker();
//   }
//
//   removeElement() {
//     super.removeElement();
//
//     if (this._datepicker) {
//       this._datepicker.destroy();
//       this._datepicker = null;
//     }
//   }
//
//   getTemplate() {
//     return createStatisticTemplate();
//   }
//
//   restoreHandlers() {
//     this._setCharts();
//     this._setDatepicker();
//   }
//
//   _setDatepicker() {
//     if (this._datepicker) {
//       this._datepicker.destroy();
//       this._datepicker = null;
//     }
//
//     // this._datepicker = flatpickr(
//     //   this.getElement().querySelector('.statistic__period-input'),
//     //   {
//     //     mode: 'range',
//     //     dateFormat: 'j F',
//     //     defaultDate: [this._data.dateFrom, this._data.dateTo],
//     //     onChange: this._dateChangeHandler,
//     //   },
//     // );
//   }
//
//   _setCharts() {
//     // Нужно отрисовать два графика
//   }
// }
