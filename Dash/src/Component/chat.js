import './chat.css';
import React, { useState, useEffect, useRef } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './message.js';
import db from '../firebase.js';
import firebase from "firebase";
import {useHistory} from 'react-router-dom'
import SendRoundedIcon from '@material-ui/icons/SendRounded';

function App({user,firestore}) {


	const [msg, takeMsg] = useState('');
	const [message, sendMsg] = useState([]);
	var messageEndRef = useRef(null);
	const history=useHistory();
	const scrollToBottom = () => {
		messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom();
	}, [message])




	useEffect(() => {

		db.collection(firestore)
			.orderBy('timestamp', 'asc')
			.onSnapshot(snapshot => {
				sendMsg(snapshot.docs.map(doc => (doc.data())))
			});
	},[]);
	function pushMsg(e) {
		e.preventDefault();
		db.collection(firestore).add({
			message: msg,
			username: user,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		takeMsg("");
	}

	return (
		<div className='base' >
			<h1 >Hello {user} </h1>
			<div className="text_input">
 
				<form className="form_style ">
					<FormControl className="input_area">
						<InputLabel color="secondary" >Enter message</InputLabel>
						<Input color="secondary" className="input_style" value={msg} onChange={(e) => { takeMsg(e.target.value) }} />
						<Button

							className="input_button"
							type="submit"
							variant="contained"
							color='action'
							endIcon={<SendRoundedIcon fontSize="large" color="secondary" />}
							disabled={!msg}
							onClick={pushMsg} >
						</Button>

					</FormControl>
				</form>
			</div>

			<div className="chat">
				{
					message.map((message) => {
						return (<Message msg={message} username={user} />)
					}
					)
				}
				<div ref={messageEndRef} />
			</div>
		</div>
	);
}
export default App;
