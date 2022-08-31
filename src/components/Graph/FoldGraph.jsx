/**
 * Sample for Histogram series
 */
import * as React from "react";
import {
	ChartComponent,
	SeriesCollectionDirective,
	SeriesDirective,
	Inject,
	Legend,
	Category,
	Tooltip,
	ColumnSeries,
	DataLabel,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import { SampleBase } from "./SampleBase";


export class FoldGraph extends SampleBase {

	render() {
		return (
			<div className="control-pane">
				<div className="control-section">
					<ChartComponent
						id="chartiss"
						style={{ textAlign: "center" }}
						load={this.load.bind(this)}
						primaryXAxis={{
							interval: 1,
							valueType: "Category",
							majorGridLines: { width: 0 },
							majorTickLines: { width: 0 },
							lineStyle: { width: 0 },
							labelStyle: { color: "transparent" },
						}}
						primaryYAxis={{
							title: "Fitness score",
							majorGridLines: { width: 0 },
							majorTickLines: { width: 0 },
							lineStyle: { width: 2 },
						}}
						chartArea={{ border: { width: 0 } }}
						tooltip={{ enable: true }}
						width={Browser.isDevice ? "99%" : "100%"}
						height={Browser.isDevice ? "60%" : "70%"}
						loaded={this.onChartLoad.bind(this)}
					>
						<Inject
							services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
						/>
						<SeriesCollectionDirective>
							<SeriesDirective
								binInterval={70}
								dataSource={this.props.data[0]}
								xName="x"
								yName="y"
								type="Column"
								columnWidth={0.38}
								fill={"#646C7D"}
								marker={{
									dataLabel: {
										position: "Top",
										font: { fontWeight: "600", color: "#ffffff" },
										visible: true,
										name: "k",
										
									},
								}}
							></SeriesDirective>

							<SeriesDirective
								fill={"#242936"}
								binInterval={70}
								dataSource={this.props.data[1]}
								xName="x"
								yName="y"
								type="Column"
								columnWidth={0.38}
								marker={{
									dataLabel: {
										position: "Top",
										font: { fontWeight: "600", color: "white" },
										visible: true,
										name: "k",
									},
								}}
							></SeriesDirective>
						</SeriesCollectionDirective>
					</ChartComponent>
				</div>
			</div>
		);
	}

	onChartLoad(args) {
		let chart = document.getElementById("chartiss");
		chart.setAttribute("title", "Fold Improvement");
	}
	load(args) {
		let selectedTheme = "window.location.hash.split('/')[1]";
		selectedTheme = selectedTheme ? selectedTheme : "Material";
		args.chart.theme = (
			selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
		).replace(/-dark/i, "Dark");
		if (selectedTheme === "highcontrast") {
			args.chart.series[0].marker.dataLabel.font.color = "#000000";
		}
	}
}
