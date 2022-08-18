import React, {useState} from 'react';
import cl from "./SearchNav.module.css";
import UserService from "../../../API/UserService";
import {parseError} from "../../../store/errorReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const SearchNav = () => {

		const [searchInput, setSearchInput] = useState("");
		const dispatch = useDispatch();
		const navigate = useNavigate();

		const searchUser = e => {
			e.preventDefault();
			const params = searchInput.toString().split(" ");
			const firstName = params[0].trim();
			const lastName = params[1].trim();

			UserService.getByName(firstName, lastName)
				.then(res => {
						if (res.body != null) {
							console.log(`user found: ${res.body._id}`);
							navigate(`/user${res.body._id}`, { replace: true });
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
					<input type="text" className={cl.search_input} placeholder="Поиск..."
								 value={searchInput}
								 onChange={e => setSearchInput(e.target.value)}
					/>
				</form>
			</div>
		);
	}
;

export default SearchNav;