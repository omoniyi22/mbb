import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutDropdown, ProjectsDropdown } from "../components/DropDown";
import {
	GetOneProjectAction,
	DeleteProjectAction,
	GetAllProjectsAction,
} from "../store/actions/project";
import { SingleProjectDropdown } from "./../components/DropDown";
import { DeleteModal } from "./../components/Alert";
import { OVERVIEW, ROUND, UPLOAD } from "../store/TYPES";

export const NavBar1 = ({ Component }) => {
	let navigate = useNavigate();
	return (
		<div className="layout border">
			<div className="app_navbar border">
				<div className="logo border pnt" onClick={() => navigate("/")}></div>

				<div className="user_data border flex">
					<div className="item pnt border msg flex ">
						<div className="icon"></div>
						<div className="text"> Send us a message</div>
					</div>
					<div className="user item pnt border flex ">
						<div className="icon icon1"></div>
						<LogoutDropdown
							renderNode={(props, ref) => (
								<div className="flex heart" {...props} ref={ref}>
									<div className="text"> lab@symbio.com</div>
									<div className="icon icon2"></div>
								</div>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="layout_container border">{<Component />}</div>
		</div>
	);
};

export const NavBar2 = ({
	tab,
	project,
	projects,
	Component,
	GetOneProjectAction,
	DeleteProjectAction,
	GetAllProjectsAction,
}) => {
	// Nav Prams ID
	let { id } = useParams();

	const [alert, setAlert] = useState(false);
	const [refresh, setRefresh] = useState(false);

	//Go Home if Project is not found
	let navigate = useNavigate();
	const handleNavigate = async () => {
		navigate("/");
	};

	const closeAlert = () => {
		setAlert(false);
	};

	const openAlert = () => {
		setAlert(true);
	};

	const handleDelete = () => {
		DeleteProjectAction(id, handleNavigate);
	};

	const handleRefresh = () => {
		setRefresh(!refresh);
	};

	useEffect(() => {
		GetOneProjectAction(id);
		GetAllProjectsAction(handleNavigate);
	}, [refresh, id]);

	return (
		<>
			<DeleteModal
				openAlert={alert}
				closeAlert={closeAlert}
				handleDelete={handleDelete}
			/>

			<div className="layout border">
				<div className="app_navbar border">
					<div className="logo border pnt" onClick={() => navigate("/")}></div>
					{tab !== UPLOAD && (
						<div className="project_nav border flex w-100">
							<div className="first_side border heart">
								<div
									className="backbutton border pnt"
									onClick={() => navigate("/projects")}
								></div>
								<div className="mr-auto">
									<ProjectsDropdown
										// id={project._id}
										dropdowndata={projects}
										refreshContent={handleRefresh}
										// navigate={navigate}
										renderNode={(props, ref) => (
											<div
												className="icon_button flex border  mr-auto"
												{...props}
												ref={ref}
											>
												<div className="icon_folder border"></div>
												<div className="text_folder border break_1">
													{project.title}
												</div>
												<div className="arrow_icon ml-1 border"></div>
											</div>
										)}
									/>
								</div>
							</div>
							<div className="second_side border heart">
								<div className="buttons flex border">
									<div
										className={`overview border pnt ${
											tab === OVERVIEW && "active"
										}`}
										onClick={() => navigate(`/projects/${id}`)}
									>
										Overview
									</div>

									<div
										className={`overview border pnt ${
											tab === ROUND && "active"
										}`}
										onClick={() => navigate(`/projects/${id}/round`)}
									>
										Rounds
									</div>
								</div>

								<SingleProjectDropdown
									placement="bottomEnd"
									id={id}
									openAlert={() => openAlert()}
									renderNode={(props, ref) => (
										<div
											{...props}
											ref={ref}
											className="round-btn z-balm  white mr-1 pnt"
										></div>
									)}
								/>
							</div>
						</div>
					)}
				</div>
				<div className="layout_container border">
					{
						<Component
							navigate={navigate}
							id={id}
							project={project}
							rounds={project && project.rounds ? project.rounds : []}
						/>
					}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	project: state.project.project,
	projects: state.project.projects,
});

const mapDispatchToProps = {
	GetOneProjectAction,
	DeleteProjectAction,
	GetAllProjectsAction,
};

export const UserNav = connect(mapStateToProps, mapDispatchToProps)(NavBar1);
export const ProjectNav = connect(mapStateToProps, mapDispatchToProps)(NavBar2);
