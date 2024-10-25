import ApexCharts from "apexcharts";

function DashboardChart({lumpsum}) {

    const lumpsumCount = lumpsum
        .filter(item => item.transactionStatus === 'Successful')
        .transactionCount;


    const series = [{
        name: "STOCK ABC",
        data: lumpsumCount
    }];
    const options = {
        chart: {
        type: 'area',
        height: 350,
        zoom: {
            enabled: false
        }
        },
        dataLabels: {
        enabled: false
        },
        stroke: {
        curve: 'straight'
        },
        
        title: {
        text: 'Fundamental Analysis of Stocks',
        align: 'left'
        },
        subtitle: {
        text: 'Price Movements',
        align: 'left'
        },
        labels: series.monthDataSeries1.dates,
        xaxis: {
        type: 'datetime',
        },
        yaxis: {
        opposite: true
        },
        legend: {
        horizontalAlign: 'left'
        }
    };

    return (
    <div>
        <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
        <div id="html-dist"></div>
    </div>
    );
  }

  export default DashboardChart;