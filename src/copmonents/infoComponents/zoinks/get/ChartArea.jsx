import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  LineController,
} from 'chart.js';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
ChartJS.register(
  CategoryScale,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function ChartArea({ selectedExchange, inputForBUSD }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState('');
  let [period, setPeriod] = useState('DAY');
  let [activeButton, setActiveButton] = useState(0);

  function createGradient(ctx, area, color) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(1, color);
    gradient.addColorStop(0, '#ffffff0d');
    gradient.addColorStop(0, '#ffffff0d');
    gradient.addColorStop(0, '#3e2a3c0d');
    return gradient;
  }

  useEffect(() => {
    let firstPriceBusdToZoinks;
    let firstPriceZoinksToBusd;
    let lastPriceBusdToZoinks;
    let lastPriceZoinksToBusd;
    let ratioDataForBusdToZoinks = [];
    let ratioDataForZoinksToBusd = [];
    let labels = [];
    axios
      .get(
        `https://zoinks.fi/api/statistic/chart?pair=${
          selectedExchange === 'DIRECTLY' ? 'APE' : selectedExchange
        }&period=${period}`
      )
      .then(({ data }) => {
        data.map((d, index) => {
          if (index === 0) {
            lastPriceBusdToZoinks = Number(d.ratio1);
            lastPriceZoinksToBusd = Number(d.ratio2);
          }
          if (index === data.length - 1) {
            firstPriceBusdToZoinks = Number(d.ratio1);
            firstPriceZoinksToBusd = Number(d.ratio2);
          }
          ratioDataForBusdToZoinks.unshift(d.ratio1);
          ratioDataForZoinksToBusd.unshift(d.ratio2);
          labels.unshift(d.time);
        });
        setLabels(labels);

        let lastPrice = inputForBUSD
          ? lastPriceBusdToZoinks
          : lastPriceZoinksToBusd;
        let firstPrice = inputForBUSD
          ? firstPriceBusdToZoinks
          : firstPriceZoinksToBusd;
        let partInPercent = firstPrice / (lastPrice / 100);
        let percentageDifference = 100 - partInPercent;
        // let priceDifference = firstPrice - lastPrice;

        let color = percentageDifference >= 0 ? '#20C4D8' : '#fa6b6bd0';
        setColors(percentageDifference >= 0 ? '#20C4D8' : '#fa6b6b');
        const chart = chartRef.current;
        if (!chart) {
          return;
        }
        let directlyData;
        if (selectedExchange === 'DIRECTLY') {
          let directlyDataDay = new Array(24).fill(1);
          let directlyDataWeek = new Array(28).fill(1);
          let directlyDataMonth = new Array(30).fill(1);
          directlyData =
            period === 'Day'
              ? directlyDataDay
              : period === 'WEEK'
              ? directlyDataWeek
              : directlyDataMonth;
          color = '#20C4D8';
          setColors('#20C4D8');
        }
        let chartData = {
          labels: labels,
          datasets: [
            {
              data:
                selectedExchange === 'DIRECTLY'
                  ? directlyData
                  : inputForBUSD
                  ? ratioDataForBusdToZoinks
                  : ratioDataForZoinksToBusd,
              backgroundColor: createGradient(
                chart.ctx,
                chart.chartArea,
                color
              ),
              borderColor: color,
              fill: true,
              lineTension: 0.2,
              pointRadius: 0,
            },
          ],
        };

        setChartData(chartData);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, selectedExchange, setChartData, inputForBUSD, period]);

  return (
    <div className="pc540:w-1/2 w-full min-h-[448px] h-[470px] pc540:h-full flex flex-col items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold">
      <div className="w-full gap-2 flex justify-between flex-col pc960:flex-row">
        <TextWithIconAndTooltip text="CHART" />
        <div className="flex -mt-1 pc960:mt-3 px-3 w-fit h-fit bg-InheritForInput">
          {['DAY', 'WEEK', 'MONTH'].map((elem, index) => {
            return (
              <button
                key={index}
                id={index}
                onClick={() => {
                  setPeriod(elem);
                  setActiveButton(index);
                }}
                className={
                  activeButton === index
                    ? 'w-fit font-play text-white text-sm rounded-full px-2 ease-in-out duration-300'
                    : 'w-1/2 font-play text-white text-sm rounded-full px-2 py-1 hover:ease-in duration-300 opacity-50 hover:opacity-100'
                }
              >
                {elem}
              </button>
            );
          })}
        </div>
      </div>
      <div className="relative m-auto h-full w-full max-w-[99%] min-h-[334px]">
        <Chart
          ref={chartRef}
          type="line"
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                grid: {
                  display: true,
                  drawTicks: false,
                  lineWidth: 2,
                  //   offset: true,
                  color: '#fff1',
                },
                border: {
                  dash: [9, 10],
                },
                ticks: {
                  display: true,
                  font: {
                    size: 14,
                    family: 'Play',
                    weight: 400,
                  },
                  color: '#fff7',
                  maxRotation: 0,
                  maxTicksLimit: 4,
                  callback: (value) => {
                    if (period === 'DAY') {
                      if (value % 4 === 3) {
                        return labels[value].slice(11, -5);
                      }
                    }
                    if (period === 'MONTH' || period === 'WEEK') {
                      if (value % 4 === 2) {
                        let month = labels[value].slice(5, -14);
                        let day = labels[value].slice(8, -11);
                        return `${day}.${month}`;
                      }
                    }
                    if (period === 'YEAR') {
                      return labels[value].slice(5, -11).replace(/-/g, '.');
                    }
                    return null;
                  },
                },
              },
              y: {
                display: false,
                grace: '50%',
              },
            },
            title: {
              display: false,
              text: 'HZUSD-BUSD Pancake',
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            plugins: {
              tooltip: {
                bodyFont: {
                  size: 14,
                  family: 'Play',
                },
                titleFont: {
                  size: 14,
                  family: 'Play',
                  weight: 400,
                },
                footerFont: {
                  size: 14,
                  family: 'Play',
                  weight: 400,
                },
                cornerRadius: 1,
                boxHeight: 14,
                titleAlign: 'center',
                bodyAlign: 'center',
                bodyColor: '#fff',
                backgroundColor: colors,
                displayColors: false,
                padding: 16,
                yAlign: 'bottom',
                callbacks: {
                  title: (value) => {
                    let label = value[0].label;
                    if (period === 'MONTH' || period === 'YEAR') return null;
                    return label.slice(11, -5);
                  },
                  label: (value) => value.raw,
                  footer: (value) => {
                    if (period === 'MONTH' || period === 'WEEK') {
                      let month = value[0].label.slice(5, -14);
                      let day = value[0].label.slice(8, -11);
                      return `${day}.${month}`;
                    }
                    return null;
                  },
                },
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
