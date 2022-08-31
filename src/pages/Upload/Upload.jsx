import React, { Component } from "react";
import { connect } from "react-redux";
import { AddRoundAction } from "./../../store/actions/project";

class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			baseFile: null,
			error: [],
		};

		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.setFileToBase = this.setFileToBase.bind(this);
	}

	changeHandler(e) {
		if (e.target.files) {
			this.setState({
				file: e.target.files[0],
			});
			this.setFileToBase(e.target.files[0]);
		}
	}

	setFileToBase(file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.setState({ baseFile: reader.result });
			console.log({ result: this.state.baseFile });
		};
	}

	submitHandler() {
		let { file, baseFile } = this.state;
		let id = this.props.id;
		if (file && baseFile) {
			this.props.AddRoundAction(id, file, { baseFile }, () =>
				this.props.navigate(`/projects/${id}/round`)
			);
		}
	}

	render() {
		return (
			<div className="project_upload_box  mx-auto">
				<div className="top_box  flex">
					<div
						className="back_icon"
						onClick={() =>
							this.props.navigate(`/projects/${this.props.id}/round`)
						}
					></div>
					<div className="file_text "></div>
				</div>

				<div className="project_upload_body  mx-auto  mx-auto">
					<div className="big_title ">Upload result</div>

					<div className="upload_body ">
						<div className=" flexIt flex ">
							<div className="small_title ">Results</div>
							<div className="small_text  ml-auto">Download template</div>
							<div className="small_icon "></div>
						</div>

						{!(this.state.file && this.state.file.name) ? (
							<>
								<label for="file-input" className="upload_box pnt">
									<div className="icon "></div>
									<div className="text break_1 ">
										Select a CSV file to upload or drag and drop it here
									</div>
								</label>
								<input
									id="file-input"
									type="file"
									accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
									onChange={this.changeHandler}
								/>
							</>
						) : (
							<div className="upload_box uploaded">
								<div className="icon icon1 "></div>
								<div className="text break_1 pr-1">
									{this.state.file ? this.state.file.name : ""}
								</div>
								<div
									className="icon icon2 pnt"
									onClick={() => this.setState({ file: null })}
								></div>
							</div>
						)}
					</div>

					<div
						className={`pnt bttn ${
							this.state.file && this.state.baseFile ? " active " : " "
						} ml-auto `}
						onClick={this.submitHandler}
					>
						Continue
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	projects: state.project.projects,
});

const mapDispatchToProps = { AddRoundAction };

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
