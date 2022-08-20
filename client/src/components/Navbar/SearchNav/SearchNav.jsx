import {useState} from 'react';
import cl from "./SearchNav.module.css";
import UserService from "../../../API/UserService";
import {parseError} from "../../../store/errorReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const SearchNav = () => {

		const [searchInput, setSearchInput] = useState("");
		const dispatch = useDispatch();
		const navigate = useNavigate();

		const searchUser = event_ => {
			event_.preventDefault();
			const parameters = searchInput.toString().split(" ");
			const firstName = parameters[0].trim();
			const lastName = parameters[1].trim();

			UserService.getByName(firstName, lastName)
				.then(response => {
						if (response.body != null) {
							console.log(`user found: ${response.body._id}`);
							navigate(`/user${response.body._id}`, {replace: true});
							navigate(0);
						} else {
							dispatch(parseError({code: 101, msg: `User ${searchInput} not found`}));
						}
					}
				)
		};

		return (
			<div className={cl.search}>
				<form onSubmit={searchUser}>
					<input
						type="text"
						className={cl.search_input}
						placeholder="Поиск..."
						value={searchInput}
						onChange={event_ => setSearchInput(event_.target.value)}
					/>
				</form>
			</div>
		);
	}
;

export default SearchNav;