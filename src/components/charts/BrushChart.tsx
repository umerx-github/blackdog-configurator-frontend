import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface BrushChartProps {}

const data = [
	[1324508400000, 34],
	[1324594800000, 54],
	[1326236400000, 43],
];

const options: ApexOptions = {
	chart: {
		id: "chart2",
		type: "line",
		height: 230,
		toolbar: {
			autoSelected: "pan",
			show: false,
		},
	},
	colors: ["#546E7A"],
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
	},
};

const optionsLine: ApexOptions = {
	chart: {
		id: "chart1",
		height: 130,
		type: "area",
		brush: {
			target: "chart2",
			enabled: true,
		},
		selection: {
			enabled: true,
			xaxis: {
				min: new Date("19 Jun 2011").getTime(),
				max: new Date("14 Aug 2012").getTime(),
			},
		},
	},
	colors: ["#008FFB"],
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
	},
	yaxis: {
		tickAmount: 2,
	},
};
const configuration = {
	series: [
		{
			data: data,
		},
	],

	seriesLine: [
		{
			data: data,
		},
	],
};

const BrushChart: React.FC<BrushChartProps> = () => {
	return (
		<div>
			<div>
				<div id="chart-line2">
					<ReactApexChart
						options={options}
						series={configuration.series}
						type="line"
						height={230}
					/>
				</div>
				<div id="chart-line">
					<ReactApexChart
						options={optionsLine}
						series={configuration.seriesLine}
						type="area"
						height={130}
					/>
				</div>
			</div>
			<div id="html-dist"></div>
		</div>
	);
};

export default BrushChart;
