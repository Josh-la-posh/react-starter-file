import ReactApexChart from "react-apexcharts";
import { processGraphData } from "../../../data/processedGraphData";

function DashboardChart({graph, type}) {
    const {
        successfulGraphCount,
        successfulGraphVolume,
        dataDate
    } = processGraphData(graph);

    const chartSeries = [{
        name: "Transactions",
        data: type === 'Count'
            ? successfulGraphCount
            : successfulGraphVolume
    }];

    const chartOptions = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {enabled: false}
        },
        dataLabels: {enabled: false},
        stroke: {curve: 'smooth'},
        labels: dataDate,
        xaxis: {type: 'datetime'},
        yaxis: {opposite: false},
        legend: {horizontalAlign: 'left'},
        
    };

    return (
        <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350} />
    );
  }

  export default DashboardChart;