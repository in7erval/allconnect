import AsideNav from "./AsideNav/AsideNav";
import PropTypes from "prop-types";
import {observer} from "mobx-react-lite";
import BackgroundWork from "./BackgroundWork";

const DefaultPage = ({children}) => {

	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content">
				{children}
			</div>
			<BackgroundWork/>
		</div>
	);
};

DefaultPage.propTypes = {
	children: PropTypes.element
}

export default observer(DefaultPage);