import React, { Component } from "react";
import { connect } from "react-redux";
import {
	CreateProjectAction,
	GetOneProjectAction,
	UpdateProjectAction,
	DeleteProjectAction,
} from "../../store/actions/project";

import { adjustSingleProjectData, vetObjectivities } from "../../store/utils";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../../components/Alert";

class ProjectForm extends Component {
	constructor(props) {
		super(props);

		if (this.props.paramId) {
			console.log({ id: this.props.paramId, project: props.project });
			this.state = { ...adjustSingleProjectData(this.props.project) };
		} else
			this.state = {
				title: "",
				useUniProtId: "",
				useUniProtSequence: "",
				switch: true,
				pdbId: "",
				objectivity: [],
				
				openAlert: "",
				error: "",
			};
		this.handleChange = this.handleChange.bind(this);
		this.addObjective = this.addObjective.bind(this);
		this.switchUniProt = this.switchUniProt.bind(this);
		this.addObjective = this.addObjective.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deletObjective = this.deletObjective.bind(this);
		this.handleObjectivityInputs = this.handleObjectivityInputs.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.switchAlert = this.switchAlert.bind(this);
	}

	switchAlert() {
		this.setState((state) => ({ openAlert: !state.openAlert }));
	}
	handleDelete() {
		this.props.DeleteProjectAction(this.props.paramId, async () => {
			this.props.navigate("/projects");
		});
		this.setState({ openAlert: false });
	}
	componentDidMount() {
		let id = this.props.paramId;
		id &&
			this.props.GetOneProjectAction(id, null, async () => {
				this.props.navigate("/projects");
			});
	}

	componentWillReceiveProps(props) {
		if (this.props.paramId) {
			let adjustProjectDataRecieved = adjustSingleProjectData(props.project);
			console.log({ adjustProjectDataRecieved });
			this.setState(adjustProjectDataRecieved);
		}
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
			error: "",
		});
	}

	handleObjectivityInputs(e, index) {
		try {
			e.preventDefault();
			this.setState((prevState) => {
				let objectivity = prevState.objectivity;
				objectivity[index][e.target.name] = e.target.value;
				return { objectivity };
			});
		} catch (error) {
			console.log({ error });
		}
	}

	switchUniProt() {
		this.setState((state) => ({
			switch: !state.switch,
			useUniProtId: "",
			useUniProtSequence: "",
		}));
	}

	addObjective() {
		if (this.state.objectivity.length < 4) {
			this.setState(({ objectivity }) => ({
				objectivity: [...objectivity, { property: "", goal: "" }],
			}));
		} else {
			this.setState({ error: "Max of 4 objectives" });
		}
	}

	deletObjective(position) {
		this.setState(({ objectivity }) => {
			let otherObjectives = objectivity.filter(
				(data, index) => index !== position
			);
			return { objectivity: otherObjectives };
		});
	}

	handleSubmit() {
		let { title, objectivity, useUniProtId, useUniProtSequence, pdbId } =
			this.state;

		if (title) {
			console.log("Step 1");
			if (vetObjectivities(objectivity)) {
				console.log("Step 2");

				if (this.props.paramId) {
					this.props.UpdateProjectAction(
						this.props.paramId,
						{
							title,
							objectivity,
							useUniProtId,
							useUniProtSequence,
							pdbId,
						},
						() => this.props.navigate("/projects")
					);
				} else
					this.props.CreateProjectAction(
						{
							title,
							objectivity,
							useUniProtId,
							useUniProtSequence,
							pdbId,
						},
						() => this.props.navigate(`/projects/${this.props.project._id}`)
					);
			} else this.setState({ error: "Fill Objectivity fields" });
		} else {
			this.setState({ error: "Title is required" });
		}
	}

	render() {
		return (
			<div className="projectForm  mx-auto">
				<DeleteModal
					openAlert={this.state.openAlert}
					closeAlert={this.switchAlert}
					handleDelete={this.handleDelete}
				/>
				<div
					className="back border heart"
					onClick={() => {
						this.props.navigate("/projects");
					}}
				>
					<div className="icon pnt"></div>
					<div className="back_text no_display mt-1 ml-2">Back</div>
				</div>
				<div className="real_form  mx-auto">
					<div className="title ">
						{this.props.paramId ? "Edit Project" : "Create New Project"}
					</div>
					<div className="error-box">
						{this.state.error ? this.state.error : null}
					</div>
					<div className="form_body pb-5 ">
						<div className="form_part first_form">
							<div className="part1_title">Protein starting sequence</div>
							<div className="form_input">
								<div className="part2_title flex">
									<div className="text1">
										{this.state.switch ? "UniProt ID" : "UniProt sequence"}
									</div>
									<div className="text2 pnt" onClick={this.switchUniProt}>
										{this.state.switch
											? "Use raw sequence "
											: "Use UniProt ID "}
										<span>instead</span>
									</div>
								</div>
								<input
									className="input"
									placeholder={
										this.state.switch
											? "Enter UniProt ID here..."
											: "Enter UniProt Sequence here..."
									}
									value={
										this.state.switch
											? this.state.useUniProtId
											: this.state.useUniProtSequence
									}
									onChange={this.handleChange}
									name={
										this.state.switch ? "useUniProtId" : "useUniProtSequence"
									}
								/>
							</div>
							<div className="form_input">
								<div className="part2_title flex">
									<div className="text1">Structure (optional)</div>
								</div>
								<input
									placeholder="Enter PDB ID here..."
									className="input"
									value={this.state.pdbId}
									onChange={this.handleChange}
									name="pdbId"
								/>
							</div>
						</div>
						<div className="form_part part2">
							<div className="form_input">
								<div className="part2_title flex">
									<div className="text1">Objectives</div>

									<div className="text2 flex pnt" onClick={this.addObjective}>
										<div className="plus mr-2"></div> Add Objective
									</div>
								</div>

								{this.state.objectivity.map((data, index) => (
									<div className="objectives flex">
										<div className="select">
											<select
												name="goal"
												value={this.state.objectivity[index].goal}
												onChange={(e) => this.handleObjectivityInputs(e, index)}
												id=""
											>
												<option value="">Set floor</option>
												<option value="Maximize">Maximize</option>
												<option value="Minimize">Minimize</option>
											</select>
										</div>
										<div className="select">
											<select
												name="property"
												value={this.state.objectivity[index].property}
												onChange={(e) => this.handleObjectivityInputs(e, index)}
												id=""
											>
												<option value="">Set property</option>
												<option value="Thermostability">Thermostability</option>
												<option value="Solubity">Solubity</option>
												<option value="Thermostability">Thermostability</option>
											</select>
										</div>
										<div className="delete_icon">
											<div
												className="delete_btn pnt"
												onClick={() => {
													this.deletObjective(index);
												}}
											></div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="form_part part2">
							<div className="form_input">
								<div className="part2_title flex">
									<div className="text1">Project Title</div>
								</div>
								<input
									placeholder="Enter project title ."
									className="input"
									value={this.state.title}
									onChange={this.handleChange}
									name="title"
								/>
							</div>
						</div>
						<div className="create_field flex ">
							{this.props.paramId && (
								<div className="delete_button ">
									<div className="delete_text pnt " onClick={this.switchAlert}>
										Delete project
									</div>
								</div>
							)}

							<div
								className={`buttn  text-white pnt ${
									vetObjectivities(this.state.objectivity) === false ||
									!this.state.title
										? "fade_button"
										: ""
								}`}
								onClick={this.handleSubmit}
							>
								{this.props.paramId ? "Edit Project" : "Create Project"}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = {
	CreateProjectAction,
	GetOneProjectAction,
	UpdateProjectAction,
	DeleteProjectAction,
};

const mapStateToProps = (state) => ({
	project: state.project.project,
});

let ProjectFormConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectForm);

const ProjectFormFunction = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	return <ProjectFormConnected navigate={navigate} paramId={id} />;
};

export default ProjectFormFunction;
