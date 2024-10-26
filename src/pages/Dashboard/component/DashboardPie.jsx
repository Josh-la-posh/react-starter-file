import ReactApexChart from "react-apexcharts";
import { processGraphData } from "../../../data/processedGraphData";

function DashboardPie({graph, type}) {
    const {
        finalGraphCount,
        finalGraphVolume        
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
            show: true,
            horizontalAlign: 'center',
            fontSize: '13px',
            width: 220           
        },
        labels: ['Success', 'Processing', 'Failed', 'Pending'],
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