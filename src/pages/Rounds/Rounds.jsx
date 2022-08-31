import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { PerfomanceGraph } from "../../components/Graph";
import { PerformanceGraph } from "../../components/Graph/PerformanceGraph";
import { FoldGraph } from "../../components/Graph/FoldGraph";

import copy from "copy-to-clipboard";

const iframe = (id) => {
	return `<iframe height="400px" style="width: 100%; min-height: 80%;" scrolling="no" title="fx." src="https://molstar.org/viewer/?pdb=${id}&hide-controls=1" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>`;
};

function Iframe(props) {
	return (
		<div
			className="round_box seq border"
			dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
		/>
	);
}

export default class Rounds extends Component {
	constructor(props) {
		super(props);

		this.state = {
			limit: 5,
			open_for_copy: true,
		};

		this.IncreaseLimit = this.IncreaseLimit.bind(this);
		this.DescreaseLimit = this.DescreaseLimit.bind(this);
		this.ReadyForCopy = this.ReadyForCopy.bind(this);
	}

	ReadyForCopy() {
		let sequence =
			this.props.project &&
			this.props.project.uniprot &&
			this.props.project.uniprot.structure
				? this.props.project.uniprot.structure
				: "sdss";
		if (this.state.open_for_copy) {
			copy(sequence);
			this.setState({ open_for_copy: false });

			let timer = setTimeout(() => {
				this.setState({ open_for_copy: true });
				clearTimeout(timer);
			}, 5000);
		}
	}
	IncreaseLimit() {
		this.setState((prevState) => ({ limit: prevState.limit + 5 }));
	}

	DescreaseLimit() {
		if (this.state.limit > 5) {
			this.setState((prevState) => ({ limit: prevState.limit - 5 }));
		}
	}

	render() {
		return (
			<>
				<div className="project_round border">
					<div className="second_header border-bottom mx-auto">
						<div className="recomend mr-3">Recommendation</div>
						<div className="result">Result</div>
					</div>

					<div className="main_body border mx-auto">
						{this.props.project &&
						this.props.project.round &&
						this.props.project.round.length > 0 &&
						this.props.project.round[0].fileLink ? (
							<div className="result_body border">
								<div className="part_1 border">
									<Iframe
										iframe={iframe(
											this.props.project ? this.props.project.pdbId : ""
										)}
									/>
									<div className="round_box bord  ">
										<div className="row_box summary  robo_medium">
											Summary table of main metrics <div className="icon"></div>
										</div>
										<div className="row_box total border text-left">
											<div className="title">Total number of sequences</div>
											<div className=" mb-0 value">
												{this.props.project &&
													this.props.project.result &&
													this.props.project.result.total_sequences}
											</div>
										</div>
										<div className="row_box total border text-left">
											<div className="title">Number of hits</div>
											<div className=" mb-0 value">
												{this.props.project &&
													this.props.project.result &&
													this.props.project.result.hits_value}{" "}
												(
												{this.props.project &&
													this.props.project.result &&
													this.props.project.result.hits_percent}
												% hit rate)
											</div>
										</div>

										<div className="row_box best_seq border text-left">
											<div className="bord"></div>
											<div className=" best_sequence">
												<div className="icon" /> <div>Best sequence</div>
											</div>
											<div className="bord"></div>
										</div>

										<div className="row_box total border text-left">
											<div className="title">Mutations</div>
											<div className=" mb-0 value hide_scroll">
												{this.props.project &&
													this.props.project.result &&
													this.props.project.result.muts_per_fitness &&
													this.props.project.result.muts_per_fitness[0] &&
													this.props.project.result.muts_per_fitness[0][0]}
											</div>
										</div>
										<div className="row_box total border text-left">
											<div className="title">Fitness Score</div>
											<div className=" mb-0 value">
												{this.props.project &&
													this.props.project.result &&
													this.props.project.result.best_sequence}
											</div>
										</div>
										<div className="row_box total border text-left">
											<div className="title">
												Fold improvement over wild type
											</div>
											<div className=" mb-0 value">
												{this.props.project &&
													this.props.project.result &&
													this.props.project.result
														.fold_improvement_over_wild_type}
											</div>
										</div>
										<div className="row_box copy total border text-left">
											<div className=" title  pnt" onClick={this.ReadyForCopy}>
												{this.state.open_for_copy ? "Copy sequence" : "Copied!"}
											</div>
										</div>
									</div>
								</div>
								<div className="part_1 part_2 border">
									<div className="round_box bord mr-auto">
										<div className="row_box summary  text-black pb-3">
											Table of top-performing variants{" "}
											<div className="icon"></div>
										</div>
										<div className="row_box total heart border text-left bea3">
											<pre className="title text-uppercase mb-0">Mutations</pre>
											<pre className="title text-uppercase mb-0 ml-auto">
												Fitness
											</pre>
										</div>

										{this.props.project &&
											this.props.project.result &&
											this.props.project.result.muts_per_fitness &&
											this.props.project.result.muts_per_fitness.map(
												(data, index) =>
													index < this.state.limit && (
														<div
															className={`row_box heart items bea3 total mut_item pb-0  ${
																(index + 1) % 2 === 1 ? "white" : ""
															}`}
														>
															<pre className="title MUTS   mut_col   text-left text-uppercase  hide_scroll">
																{data[0]}
															</pre>
															<pre className="title MUTS text-uppercase ml-auto bea3">
																{data[1]}
															</pre>
														</div>
													)
											)}

										<div
											className={` row_box heart items bea3 total mut_item  footr`}
										>
											<pre
												className="title MUTS pnt   mut_col   text-left  hide_scroll mb-0 pb-0 show_more"
												onClick={this.IncreaseLimit}
											>
												Show more
											</pre>
											{this.state.limit > 5 && (
												<pre
													className="title MUTS pnt ml-auto  mb-0 pb-0 bea3"
													onClick={this.DescreaseLimit}
												>
													Show less
												</pre>
											)}
										</div>
									</div>
								</div>

								<div className="part_1 part_2 part_3  border">
									<div className="graph_title mr-atuto text-left w-100">
										Performance
									</div>
									<div className="round_box bord mr-auto">
										<div className="row_box summary  text-black pb-3">
											Score Distribution <div className="icon"></div>
										</div>

										<div className=" graph_box border">
											{/* <div className="y_axis_title robo_mid border my-auto mx-auto">
												Probability
											</div> */}
											<div className="graph_body border">
												<div className="the_graph border">
													<div
														id="performanceGraph"
														className="performanceGraph border"
													>
														<PerformanceGraph
															data={
																!(
																	this.props.project &&
																	this.props.project.result &&
																	this.props.project.result.sequence_points
																)
																	? []
																	: this.props.project.result.sequence_points.map(
																			(data) => ({
																				y: data * 100000,
																			})
																	  )
															}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="part_1 part_2 part_3  border">
									<div className="round_box bord mr-auto">
										<div className="row_box summary  text-black pb-3">
											Fold improvement <div className="icon"></div>
										</div>

										<div className="robo_mid border my-auto mx-auto row_box second_round_header">
											<div className="first_box border"></div> Parent sequence
											<div className="second_box border"></div> Best Sequence
										</div>
										<div className=" graph_box border">
											<div className="graph_body border">
												<div className="the_graph border">
													<div
														id="performanceGraph"
														className="performanceGraph border"
													>
														<FoldGraph
															data={
																!(
																	this.props.project &&
																	this.props.project.result &&
																	this.props.project.result.parent_sequence &&
																	this.props.project.result.best_sequence
																)
																	? [[], []]
																	: [
																			[
																				{
																					k: "",
																					x: "",
																					y:
																						this.props.project.result
																							.parent_sequence * 320,
																				},
																			],
																			[
																				{
																					k: "#\n fold",
																					x: "",
																					y:
																						this.props.project.result
																							.best_sequence * 320,
																				},
																			],
																	  ]
															}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<Upload id={this.props.id} />
						)}
					</div>
				</div>
			</>
		);
	}
}

const Upload = ({ id }) => (
	<div className="upload border mx-auto">
		<div className="vase border"></div>
		<div className="title border">Upload your result</div>
		<div className="text border">
			Here’s a quick and clear explanation of how results work here so you know
			what you are about to do next.
		</div>
		<Link to={`/projects/${id}/upload`} className="the_link button border">
			Upload result{" "}
		</Link>
	</div>
);
