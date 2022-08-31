import { Modal } from "rsuite";
import { connect } from "react-redux";
import { closeAlert } from "../store/actions/info";
import RemindFillIcon from "@rsuite/icons/RemindFill";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import CloseIcon from "@rsuite/icons/Close";
import { ERROR, SUCCESS } from "../store/TYPES";

const AlertModal = (props) => {
	const handleClose = () => {
		props.closeAlert();
	};
	return (
		<>
			<Modal
				className="  Alert"
				size={"xs"}
				open={props.status ? true : false}
				onClose={handleClose}
			>
				<div className="div alert_box   p-2 w-100 flex">
					<div className="alert_icon ">
						<div className="icon ">
							{props.status === ERROR ? (
								<RemindFillIcon height={"100%"} width={"100%"} />
							) : (
								""
							)}
							{props.status === SUCCESS ? (
								<CheckRoundIcon height={"100%"} width={"100%"} />
							) : (
								""
							)}
						</div>
					</div>
					<div className="alert_body  ">
						<div className="title flex  w-100">
							<div className="text">
								{props.status === ERROR ? ERROR : ""}
								{props.status === SUCCESS ? SUCCESS : ""}
							</div>
							<div className="close pnt mr-2">
								<CloseIcon
									height={"100%"}
									width={"100%"}
									onClick={handleClose}
								/>
							</div>
						</div>

						<div className="message my-auto mr-auto  text-left">
							{props.message}
						</div>

						<div className="buttons  mt-auto">
							<div className="action_button pnt" onClick={handleClose}>
								OK
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		message: state.info.message,
		status: state.info.status,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeAlert: () => closeAlert(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertModal);

export const DeleteModal = (props) => {
	const handleClose = () => {
		props.closeAlert();
	};
	const deleteFunctionClose = () => {
		props.closeAlert();
		props.handleDelete();
	};
	return (
		<>
			<Modal
				className="  Alert"
				size={"xs"}
				open={props.openAlert}
				onClose={handleClose}
			>
				<div className="div alert_box   p-2 w-100 flex">
					<div className="alert_icon ">
						<div className="icon ">
							<RemindFillIcon height={"100%"} width={"100%"} />
							{/* <CheckRoundIcon height={"100%"}  width={"100%"}/> */}
						</div>
					</div>
					<div className="alert_body  ">
						<div className="title flex  w-100">
							<div className="text text-left">
								Are you sure you want to delete this project?
							</div>
							<div className="close pnt mr-2">
								<CloseIcon
									height={"100%"}
									width={"100%"}
									onClick={handleClose}
								/>
							</div>
						</div>

						<div className="message  text-left">
							This is a permanent action and you’ll lose all the information
							you’ve created within this project.
						</div>

						<div className="buttons  mt-auto">
							<div className="cancel_button pnt mt-3" onClick={handleClose}>
								Cancel
							</div>
							<div
								className="action_button pnt mt-3"
								onClick={deleteFunctionClose}
							>
								Delete
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};
