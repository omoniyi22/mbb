// import {
// 	forwardRef,
// 	useEffect,
// 	useImperativeHandle,
// 	useRef,
// 	useState,
// } from "react";
// import * as d3 from "d3";
// import { useDebouncedCallback } from "use-debounce";
// import { makeStyles, Slider } from "@material-ui/core";
// import data from "./data.json";

// const Cv = forwardRef((props, ref) => {
// 	const [modifiedCounter, setModifiedCounter] = useState(0);

// 	useImperativeHandle(ref, () => ({
// 		getDataToTrack: () => {
// 			return {
// 				prevSectionCode: "BasicInformation",
// 				modifiedCounter,
// 			};
// 		},
// 	}));

// 	return <div>children2222</div>;
// });

// export default function App() {
// 	const classes = useStyles();
// 	const ref = useRef();
// 	const [dataset, setDataSet] = useState(data);
// 	const cRef = useRef();
// 	const [firstChildren] = useState(true);

// 	const [value, setValue] = useState([0.55, 0.7]);
// 	const [bins, setBins] = useState([]);

// 	const draw = useDebouncedCallback(async (_dataset) => {
// 		// 1. Access data
// 		const dataSet = _dataset ?? dataset;

// 		const metricAccessor = (d) => d.humidity;
// 		const yAccessor = (d) => d.length;

// 		// 2. Create chart dimensions

// 		const width = 600;
// 		let dimensions = {
// 			width: width,
// 			height: width * 0.6,
// 			margin: {
// 				top: 30,
// 				right: 10,
// 				bottom: 50,
// 				left: 50,
// 			},
// 		};
// 		dimensions.boundedWidth =
// 			dimensions.width - dimensions.margin.left - dimensions.margin.right;
// 		dimensions.boundedHeight =
// 			dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

// 		// 3. Draw canvas

// 		const element = d3.select("#wrapper");

// 		const svg = d3.select(ref.current);

// 		svg.selectAll("*").remove();

// 		const wrapper = element
// 			.append("svg")
// 			.attr("width", dimensions.width)
// 			.attr("height", dimensions.height);

// 		const bounds = wrapper
// 			.append("g")
// 			.style(
// 				"transform",
// 				`translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
// 			);

// 		// 4. Create scales

// 		const xScale = d3
// 			.scaleLinear()
// 			.domain(d3.extent(dataSet, metricAccessor))
// 			.range([0, dimensions.boundedWidth])
// 			.nice();

// 		const binsGenerator = d3
// 			.bin()
// 			.domain(xScale.domain())
// 			.value(metricAccessor)
// 			.thresholds(12);

// 		const bins = binsGenerator(dataSet);

// 		// [0, 30]
// 		// 15 => [0,2,4,..., 30]

// 		// [0.3, 1]
// 		// 12 => [0.3, 0.35, ..., 1]
// 		const domain = xScale.domain();
// 		// const dx = (domain[1] - domain[0]) / bins.length;

// 		setBins(bins.map((bin) => bin.x0).concat([domain[1]]));

// 		const yScale = d3
// 			.scaleLinear()
// 			.domain([0, d3.max(bins, yAccessor)])
// 			.range([dimensions.boundedHeight, 0])
// 			.nice();

// 		// 5. Draw data

// 		const binsGroup = bounds.append("g");

// 		const binGroups = binsGroup
// 			.selectAll("g")
// 			.data(bins)
// 			.join("g")
// 			.attr("class", "bin");

// 		const barPadding = 1;
// 		// const barRects =
// 		binGroups
// 			.append("rect")
// 			.attr("x", (d) => xScale(d.x0) + barPadding / 2)
// 			.attr("y", (d) => yScale(yAccessor(d)))
// 			.attr("width", (d) =>
// 				d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding])
// 			)
// 			.attr("height", (d) => dimensions.boundedHeight - yScale(yAccessor(d)));

// 		// const barText =
// 		binGroups
// 			.filter(yAccessor)
// 			.append("text")
// 			.attr("x", (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
// 			.attr("y", (d) => yScale(yAccessor(d)) - 5)
// 			.text(yAccessor)
// 			.style("text-anchor", "middle")
// 			.attr("fill", "darkgrey")
// 			.style("font-size", "12px")
// 			.style("font-family", "sans-serif");

// 		const mean = d3.mean(dataSet, metricAccessor);
// 		// const meanLine =
// 		bounds
// 			.append("line")
// 			.attr("x1", xScale(mean))
// 			.attr("x2", xScale(mean))
// 			.attr("y1", -15)
// 			.attr("y2", dimensions.boundedHeight)
// 			.attr("stroke", "maroon")
// 			.attr("stroke-dasharray", "2px 4px");

// 		// const meanLabel =
// 		bounds
// 			.append("text")
// 			.attr("x", xScale(mean))
// 			.attr("y", -20)
// 			.text("mean")
// 			.attr("fill", "maroon")
// 			.style("font-size", "12px")
// 			.style("text-anchor", "middle");

// 		// 6. Draw peripherals

// 		const xAxisGenerator = d3.axisBottom().scale(xScale);

// 		const xAxis = bounds
// 			.append("g")
// 			.call(xAxisGenerator)
// 			.style("transform", `translateY(${dimensions.boundedHeight}px)`);

// 		// const xAxisLabel =
// 		xAxis
// 			.append("text")
// 			.attr("x", dimensions.boundedWidth / 2)
// 			.attr("y", dimensions.margin.bottom - 10)
// 			.attr("fill", "black")
// 			.style("font-size", "1.4em")
// 			.text("Humidity")
// 			.style("text-transform", "capitalize");
// 	}, 300);

// 	const handleChange = (event, newValue) => {
// 		setValue(newValue);
// 		draw();
// 	};

// 	useEffect(() => {
// 		const main = async () => {
// 			try {
// 				setDataSet(data);
// 				draw(data);
// 			} catch (error) {
// 				console.log("error", error);
// 			}
// 		};
// 		main();
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	const getPrevSectionIndex = () => {
// 		return 0; // ejemplo
// 	};

// 	const _handleClick = () => {

// 		const section = { sectionCode: "Preview " }; // sections[prevSectionIndex]

// 		const dataToTrack = cRef.current.getDataToTrack();

// 		console.log("dataToTrack", dataToTrack);
// 		console.log("", {
// 			...dataToTrack,
// 			prevSectionCode: section.sectionCode,
// 		});
// 	};

// 	return (
// 		<div>
// 			<div className={classes.container}>
// 				<div id="wrapper" ref={ref} />
// 				<Slider
// 					className={classes.slider}
// 					getAriaLabel={() => "Temperature range"}
// 					value={value}
// 					marks={bins.map((bin) => ({
// 						value: bin,
// 					}))}
// 					min={bins[0]}
// 					max={bins[bins.length - 1]}
// 					step={Number(parseFloat(bins[1] - bins[0]).toFixed(10))}
// 					onChange={handleChange}
// 					valueLabelDisplay="auto"
// 				/>
// 			</div>
// 			<button onClick={_handleClick}> click</button>

// 		</div>
// 	);
// }

// const useStyles = makeStyles(
// 	() => ({
// 		slider: {
// 			position: "absolute",
// 			bottom: 40,
// 			left: 50,
// 			width: 540, // 600 - 50 - 10
// 		},
// 		container: {
// 			position: "relative",
// 		},
// 	}),
// 	{ name: "ROOT" }
// );

import * as d3 from "d3";
import React from "react";

export const useD3 = (renderChartFn, dependencies) => {
	const ref = React.useRef();

	React.useEffect(() => {
		renderChartFn(d3.select(ref.current));
		return () => {};
	}, dependencies);
	return ref;
};

export const PerfomanceGraph = ({ data }) => {
	const ref = useD3(
		(svg) => {
			const height = 200;
			const width = 400;
			const margin = { top: 10, right: 30, bottom: 30, left: 40 };

			const x = d3
				.scaleBand()
				.domain(data.map((d) => d.fitness_score))
				.rangeRound([margin.left, width - margin.right])
				.padding(0.1)
				

			const y1 = d3
				.scaleLinear()
				.domain([0, d3.max(data, (d) => d.probability)])
				.rangeRound([height - margin.bottom, margin.top]);

			const xAxis = (g) =>
				g.attr("transform", `translate(0,${height - margin.bottom})`).call(
					d3
						.axisBottom(x)
						.tickValues(
							d3
								.ticks(...d3.extent(x.domain()), width / 40)
								.filter((v) => x(v) !== undefined)
						)
						.tickSizeOuter(0)
				);

			const y1Axis = (g) =>
				g
					.attr("transform", `translate(${margin.left},0)`)
					.style("color", "steelblue")
					.call(d3.axisLeft(y1).ticks(null, "s"))
					.call((g) => g.select(".domain").remove())
					.call((g) =>
						g
							.append("text")
							.attr("x", -margin.left)
							.attr("y", 10)
							.attr("fill", "currentColor")
							.attr("text-anchor", "start")
							.text(data.y1)
					);

			svg.select(".x-axis").call(xAxis);
			svg.select(".y-axis").call(y1Axis);

			svg
				.select(".plot-area")
				.attr("fill", "steelblue")
				.selectAll(".bar")
				.data(data)
				.join("rect")
				.attr("class", "bar")
				.attr("x", (d) => x(d.fitness_score))
				.attr("width", x.bandwidth())
				.attr("y", (d) => y1(d.probability))
				.attr("height", (d) => y1(0) - y1(d.probability));
		},
		[data.length]
	);

	return (
		<svg
			ref={ref}
			style={{
				height: 500,
				width: "100%",
				marginRight: "0px",
				marginLeft: "0px",
			}}
		>
			<g className="plot-area" />
			<g className="x-axis" />
			<g className="y-axis" />
		</svg>
	);
};

export const ImprovementGraph = (props) => {
	return (
		<div>
			<div></div>
		</div>
	);
};
