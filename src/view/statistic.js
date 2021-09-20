import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {getTotalsByType, countPrice, getFormatter, countQuantity, countDuration, getSortByDesc} from '../utils/statistic';
import { ChartTypes } from '../const';

const renderChart = (moneyCtx, type, totals) => new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: [...totals.keys()],
    datasets: [{
      data: [...totals.values()],
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (values) => getFormatter(values, type),
      },
    },
    title: {
      display: true,
      text: type,
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        minBarLength: 50,
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});

export const createStatisticTemplate = () => `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`;

export default class Statistic extends SmartView {
  constructor(points) {
    super();
    this._points = points;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  removeElement() {
    super.removeElement();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    const totals = getTotalsByType(this._points, countPrice);
    renderChart(moneyCtx, ChartTypes.MONEY, getSortByDesc(totals));

    const typeTotals = getTotalsByType(this._points, countQuantity);
    renderChart(typeCtx, ChartTypes.TYPE, getSortByDesc(typeTotals));

    const timeTotals = getTotalsByType(this._points, countDuration);
    renderChart(timeCtx, ChartTypes.TIME_SPEND, getSortByDesc(timeTotals));
  }
}
