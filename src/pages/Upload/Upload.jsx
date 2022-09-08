import React, { Component } from "react";
import { connect } from "react-redux";
import { AddRoundAction } from "./../../store/actions/project";
import DownloadLink from "react-download-link";
import { FileUploader } from "react-drag-drop-files";

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

	changeHandler(e, drop) {
		if (drop === "drop") {
			console.log("drop");

			this.setState({
				file: e,
			});
			this.setFileToBase(e);
		} else if (e.target.files) {
			e.preventDefault();
			e.stopPropagation();
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
							<div className="small_text  ml-auto">
								<a
									className="the_link text-black p-0 m-0"
									href="/TEM1_fitness.csv"
									download
								>
									Download template
								</a>
							</div>
							<div className="small_icon "></div>
						</div>

						{!(this.state.file && this.state.file.name) ? (
							<FileUploader
								classes="w-100 m-0 p-0 h-100 fileUploadBox"
								handleChange={(e) => this.changeHandler(e, "drop")}
								name="file"
								types={["CSV"]}
							>
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
									onChange={(e) => this.changeHandler(e)}
								/>
							</FileUploader>
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
