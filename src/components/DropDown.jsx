import { Dropdown } from "rsuite";

import { Link } from "react-router-dom";


export const SingleProjectDropdown = ({
	placement,
	renderNode,
	openAlert,
	id,
}) => (
	<Dropdown
		renderToggle={renderNode}
		placement={placement ? placement : "bottomEnd"}
	>
		<div className="dropdown_item pnt">
			<Link to={`/project/edit/${id}`} className=" the_link">
				<div className="drop_icon edit_icon "></div>
				<div className="drop_text ">Edit Project</div>
			</Link>
		</div>
		<div className="dropdown_item pnt" onClick={openAlert}>
			<div className="drop_icon delete_icon"></div>
			<div className="drop_text ">Delete Project</div>
		</div>
	</Dropdown>
);

export const LogoutDropdown = ({
	placement,
	renderNode,
	openAlert,
	id,
}) => (
	<Dropdown
		renderToggle={renderNode}
		placement={placement ? placement : "bottomEnd"}
	>		
		<div className="dropdown_item pnt" >
			<div className="logout_icon drop_icon"></div>
			<div className="drop_text ">Log out</div>
		</div>
	</Dropdown>
);

export const ProjectsDropdown = ({
	id,
	dropdowndata,
	renderNode,
	navigate,
	refreshContent,
}) => (
	<div className="folder_items">
		<Dropdown renderToggle={renderNode}>
			{dropdowndata.map((data, index) => (
				<Link
					className="the_link"
					to={`/projects/${data._id}`}
					onClick={refreshContent ? refreshContent : () => {}}
				>
					<div className="folder_items">
						<div
							className="dropdown_item pnt folders rounded-lg"
							onClick={() => {}}
						>
							<div className="drop_icon folder_icon border"></div>
							<div className="drop_text ">{data.title}</div>
						</div>
					</div>
				</Link>
			))}
		</Dropdown>
	</div>
);
