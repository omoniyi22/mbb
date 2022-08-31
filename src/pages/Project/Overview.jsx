import React from "react";
const iframe = (id) => {
	return `<iframe height="500" style="width: 100%; min-height: 91vh;" scrolling="no" title="fx." src="https://molstar.org/viewer/?collapse-left-panel=1&pdb=${id}
	" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>`;
};

function Iframe(props) {
	return (
		<div
			dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
		/>
	);
}

function ProjectOverview({ project }) {
	return (
		<div className="project_pack border">
			<div className="project_overview border mx-auto">
				<div className="top_title">Objectives</div>

				<div className="top_objectives border flex">
					{project &&
						project.objectivity &&
						project.objectivity.map((data, index) => (
							<div className="object border">
								<pre className="p-0 m-0">
									{data.goal} {data.property}
								</pre>
							</div>
						))}

					{!(
						project &&
						project.objectivity &&
						project.objectivity.length > 0
					) && (
						<div className="object border transparent">
							<pre className="p-0 m-0">No Objectiive</pre>
						</div>
					)}
				</div>

				<div className="divider "></div>

				<div className="sequence border ">
					<Iframe iframe={iframe(project ? project.pdbId : "")} />
				</div>
			</div>
		</div>
	);
}

export default ProjectOverview;
