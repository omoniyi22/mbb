import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertModal from "./components/Alert";
import LoaderModal from "./components/Loader";
import { connect } from "react-redux";
import ProjectForm from "./pages/Form/ProjectForm";
import Projects from "./pages/Projects/Projects";
import ProjectOverview from "./pages/Project/Overview";
import ProjectUpload from "./pages/Upload/Upload";
import ProjectRounds from "./pages/Rounds/Rounds";


import "rsuite/dist/rsuite.min.css";
import { UserNav, ProjectNav } from "./layout/Layout";
import { OVERVIEW, ROUND, UPLOAD } from "./store/TYPES";



class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<AlertModal />
				<LoaderModal />
				<Routes>
					<Route path="*" element={<UserNav Component={Projects} />} />
					<Route path="/projects" element={<UserNav Component={Projects}/>} />
					<Route path="/projects/new" element={<UserNav Component={ProjectForm} />} />
					<Route path="/project/edit/:id" element={<UserNav Component={ProjectForm} />} />


					<Route path="/projects/:id" element={<ProjectNav tab={OVERVIEW} Component={ProjectOverview} />} />
					<Route path="/projects/:id/round" element={<ProjectNav  tab={ROUND} Component={ProjectRounds} />} />
					<Route path="/projects/:id/upload" element={<ProjectNav  tab={UPLOAD} Component={ProjectUpload} />} />
				</Routes>
			</BrowserRouter>
		);
	}
}


const mapStateToProps = (state) => ({
	project: state.project.project,
});
export default connect(mapStateToProps, null)(Router);
