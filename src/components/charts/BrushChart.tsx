import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface BrushChartProps {
	series: ApexAxisChartSeries | ApexNonAxisChartSeries;
	brushChartMin?: number | undefined;
	brushChartMax?: number | undefined;
	chartHeight?: string | number;
	brushChartHeight?: string | number;
	chartId?: string;
	brushChartId?: string;
	datetimeUTC?: boolean;
}

const BrushChart: React.FC<BrushChartProps> = ({
	series,
	brushChartMin,
	brushChartMax,
	chartHeight = 230,
	brushChartHeight = 130,
	chartId = "chart",
	brushChartId = "brush-chart",
	datetimeUTC = false,
}) => {
	const [color1, color2] = ["#a1a1aa", "#a1a1aa"];

	const options: ApexOptions = {
		chart: {
			id: chartId,
			type: "line",
			height: brushChartHeight,
			toolbar: {
				autoSelected: "pan",
				show: false,
			},
		},
		colors: [color1],
		stroke: {
			width: 3,
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			opacity: 1,
		},
		markers: {
			size: 0,
		},
		xaxis: {
			type: "datetime",
			labels: {
				datetimeUTC: datetimeUTC,
			},
		},
	};

	const optionsLine: ApexOptions = {
		chart: {
			id: brushChartId,
			height: brushChartHeight,
			type: "area",
			brush: {
				target: chartId,
				enabled: true,
			},
			selection: {
				enabled: true,
				xaxis: {
					min: brushChartMin,
					max: brushChartMax,
				},
			},
		},
		colors: [color2],
		fill: {
			type: "gradient",
			gradient: {
				opacityFrom: 0.91,
				opacityTo: 0.1,
			},
		},
		xaxis: {
			type: "datetime",
			tooltip: {
				enabled: false,
			},
			labels: {
				datetimeUTC: datetimeUTC,
			},
		},
		yaxis: {
			tickAmount: 2,
		},
	};
	return (
		<div>
			<div>
				<div id="chart-line2">
					<ReactApexChart
						options={options}
						series={series}
						type="line"
						height={chartHeight}
					/>
				</div>
				<div id="chart-line">
					<ReactApexChart
						options={optionsLine}
						series={series}
						type="area"
						height={brushChartHeight}
					/>
				</div>
			</div>
			<div id="html-dist"></div>
		</div>
	);
};

export default BrushChart;
