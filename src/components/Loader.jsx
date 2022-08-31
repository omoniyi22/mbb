import { connect } from "react-redux";
import { Loader, Modal } from "rsuite";

const LoaderModal = ({ loading }) => (
	<>
		<Modal
			className=" loader"
			size={"xs"}
			open={loading}
		>
			<Loader size="md"  color="black" center content="" />
		</Modal>
	</>
);

const mapStateToProps = (state) => {
	return {
		loading: state.info.loading,
	};
};

export default connect(mapStateToProps, null)(LoaderModal);
