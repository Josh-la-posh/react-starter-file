import ReactApexChart from "react-apexcharts";
import { processGraphData } from "../../../data/processedGraphData";

function DashboardPie({graph, type}) {
    const {
        finalGraphCount,
        finalGraphVolume,
        totalTransactionsCount
    } = processGraphData(graph);

    const pieSeries = 'Count' ? finalGraphCount : finalGraphVolume;
    const pieOptions = {
        chart: {
            type: 'donut',
            width: 350,
        },
        fill: {
            colors: ['#00A049', '#0000FF', '#FF0000', '#FFFF00']
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '13px',
            width: 220           
        },
        labels: ['Success', 'Processing', 'Failed', 'Pending'],
        plotOptions: {
            pie: {
                donut: {
                  size: '70%',
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      fontSize: '22px',
                      color: '#000',
                      offsetY: -10,
                    },
                    value: {
                      show: true,
                      fontSize: '16px',
                      color: '#000',
                      offsetY: 10,
                      formatter: () => `${totalTransactionsCount} Total`,
                    },
                    total: {
                      show: true,
                      label: totalTransactionsCount ?? 0,
                      color: '#000',
                      fontSize: '16px',
                      formatter: () => totalTransactionsCount,
                    },
                  },
                },
              },
        },
        responsive: [
            {
                breakpoint: 300,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: false
                    }
                }
            }
        ],
    };


    return (
        <ReactApexChart options={pieOptions} series={pieSeries} type="donut" />
    );
  }

  export default DashboardPie;