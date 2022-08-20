import AsideNav from "../../components/AsideNav/AsideNav";

const Friends = () => {
	return (
		<div className="default_page">
			<AsideNav/>
			<div className="default_page__content" style={{height: "70vh"}}>
				<div style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					flexDirection: "column",
					height: 80
				}}>
				<h1>Скоро тут будут <span style={{color: "royalblue"}}>друзья</span></h1>
				<p>Наверное...</p>
				</div>
			</div>
		</div>
	);
};

export default Friends;