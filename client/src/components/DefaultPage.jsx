import AsideNav from "./AsideNav/AsideNav";
import PropTypes from "prop-types";

const DefaultPage = ({children}) => {
	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content">
				{children}
			</div>
		</div>
	);
};

DefaultPage.propTypes = {
	children: PropTypes.element
}

export default DefaultPage;