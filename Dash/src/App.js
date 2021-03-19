
import React,{ useState, useEffect, useRef } from 'react';
import {BrowserRouter as Router ,Switch,Route,useHistory} from 'react-router-dom';
import { Button, FormControl, InputLabel, Input,FormHelperText,TextField} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './App.css';
import Chat from './Component/chat.js';

export default function App(){
	return(
		<Router>
		<Switch>
		<Route exact path="/" component={Login}/>
		<Route exact path="/Chat" component={()=><Chat user={User.username} firestore={User.firestore}/>}/>
		</Switch>

		</Router>
		
	);
}

var User={username:'Unknown',firestore:'group'};
function Login(){
	
	const [user,setUser]=useState('');
	const history=useHistory();
	function log(e){
		e.preventDefault();
		User.username=user;
		 User.firestore="group";	
			
		history.push("/Chat");


	}
	return(

	<div className="form-style">
		<form >
			<FormControl className='login' >
				<AccountCircleIcon style={{fontSize:100}} color='primary' />
					<TextField margin='dense' 
						id="outlined-basic"
					 	color="primary"
					 	onChange={(e)=>setUser(e.target.value)} 
					 	value={user}
					 	label="Username" 
					 	variant="outlined" />
					<Button
						disabled={!user}
						id="login-button"
						type="submit"
						variant="contained"
						color="primary"
						onClick={log}
						type="type">
						 Login</Button>
				</FormControl>
			</form>
		</div>
	);
}
