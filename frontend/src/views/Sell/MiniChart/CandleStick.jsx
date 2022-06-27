import ApexCharts from 'apexcharts'

let series = [
    {
      data: [
        {
          x: new Date(2020, 05, 13),
          y: [312.23, 313.01, 312.08, 312.84],
        },
        {
          x: new Date(2020, 04, 14),
          y: [312.23, 313.01, 312.08, 312.84],
        },
      ],
    },
  ];

var options = {
    series: [{
        data: seriesData
    }],
    chart: {
        type: 'candlestick',
    },
    xaxis: {
        type: 'datetime',
    },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();