import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
	DeleteProjectAction,
	GetAllProjectsAction,
} from "./../../store/actions/project";

import { SingleProjectDropdown } from "./../../components/DropDown";

import moment from "moment";
import { DeleteModal } from "../../components/Alert";

export class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openAlert: false,
			delete_id: "",
		};

		this.closeAlert = this.closeAlert.bind(this);
		this.openAlert = this.openAlert.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.props.GetAllProjectsAction();
	}

	closeAlert() {
		this.setState({ openAlert: false });
	}
	openAlert(id) {
		this.setState({ openAlert: true, delete_id: id });
	}
	handleDelete() {
		this.props.DeleteProjectAction(this.state.delete_id);
	}

	render() {
		return (
			<>
				<DeleteModal
					openAlert={this.state.openAlert}
					closeAlert={this.closeAlert}
					handleDelete={this.handleDelete}
				/>
				<div className="projects mx-auto ">
					<div className="title flex ">
						<div className="header1">Projects</div>
						{this.props.projects && this.props.projects.length > 0 && (
							<Link to="/projects/new" className="the_link bottn">
								<div className=" pnt">Create new project</div>
							</Link>
						)}
					</div>

					<div className="projects_box flex ">
						{this.props.projects.map((data, index) => (
							<div key={index} className="project_card pnt">
								<div className="icon_box ">
									<div className="icon "></div>

									<SingleProjectDropdown
										id={data._id}
										openAlert={() => this.openAlert(data._id)}
										renderNode={(props, ref) => (
											<button {...props} ref={ref} className="icon icon2 " />
										)}
									/>
								</div>

								<Link to={`/projects/${data._id}`} className="the_link">
									<div className="w-100">
										<div className="project_name border block">{data && data.title}</div>
										<div className="project_time  border">
											<code className="">{`${moment(
												data.updatedAt
											).fromNow()}`}</code>
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
					

					{!(this.props.projects && this.props.projects.length > 0) && (
						<div className="body  mx-auto">
							<div className="img " />
							<div className="title ">Create your first project</div>
							<div className="content ">
								Projects are dedicated spaces for receiving recommendations and
								analyzing results for your protein engineering workflow.
							</div>
							<Link className="the_link" to="/projects/new">
								<div className="bottn">Create new project</div>
							</Link>
						</div>
					)}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	projects: state.project.projects,
});

const mapDispatchToProps = { GetAllProjectsAction, DeleteProjectAction };

export default connect(mapStateToProps, mapDispatchToProps)(Products);
