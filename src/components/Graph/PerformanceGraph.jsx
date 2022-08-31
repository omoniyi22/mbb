import * as React from "react";
import {
	ChartComponent,
	SeriesCollectionDirective,
	SeriesDirective,
	Inject,
	Legend,
	Category,
	Tooltip,
	DataLabel,
	HistogramSeries,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import { SampleBase } from "./SampleBase";

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class PerformanceGraph extends SampleBase {
	
	render() {
		return (
			<div className="control-pane">
				<style>{SAMPLE_CSS}</style>
				<div className="control-section">
					<ChartComponent
						id="hartis"
						style={{ textAlign: "center" }}
						load={this.load.bind(this)}
						primaryXAxis={{
							majorGridLines: { width: 0 },
							title: "Fitness score",
							minimum: 0,
							maximum: 6000,
						}}
						primaryYAxis={{
							title: "Probability",
							minimum: 0,
							maximum: 200,
							interval: 40,
							majorTickLines: { width: 2 },
							lineStyle: { width: 2 },
						}}
						chartArea={{ border: { width: 0 } }}
						tooltip={{ enable: true }}
						width={Browser.isDevice ? "99%" : "100%"}
						height={Browser.isDevice ? "60%" : "70%"}
						legendSettings={{ visible: false }}
						title=""
						loaded={this.onChartLoad.bind(this)}
					>
						<Inject
							services={[HistogramSeries, Legend, Tooltip, Category, DataLabel]}
						/>
						<SeriesCollectionDirective>
							<SeriesDirective
								dataSource={this.props.data}
								yName="y"
								name="Score"
								type="Histogram"
								fill="#242936"
								border={{ color: "white", width: 0.5 }}
								marker={{
									dataLabel: {
										visible: false,
										position: "Top",
										font: { fontWeight: "600", color: "#ffffff" },
									},
								}}
								showNormalDistribution={false}
								columnWidth={0.98}
								binInterval={100}
							></SeriesDirective>
						</SeriesCollectionDirective>
					</ChartComponent>
				</div>
			</div>
		);
	}
	onChartLoad(args) {
		let chart = document.getElementById("hartis");
		chart.setAttribute("title", "Score Distribution");
	}
	load(args) {
		let selectedTheme = "window.location.hash.split('/')[1]";
		selectedTheme = selectedTheme ? "selectedTheme" : "Material";
		args.chart.theme = (
			selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
		).replace(/-dark/i, "Dark");
		if (selectedTheme === "highcontrast") {
			args.chart.series[0].marker.dataLabel.font.color = "#242936";
		}
	}
}


