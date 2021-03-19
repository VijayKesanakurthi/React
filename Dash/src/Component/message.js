import React from 'react';
import { Card,CardContent,Typography } from '@material-ui/core'
import './message.css';
import 'fontsource-roboto';

export default function Message({msg,username}){
	const isUser=username===msg.username;

	return(
	<div  className={`message ${isUser && 'message_user'}`}>
		<p>{isUser?"":msg.username}</p>
	<Card className={isUser?"userCard":"message_guestCard"}>

      <CardContent  className="card_content" >
      
      <Typography varient="subtitle1" color="textSecondary">
      
      </Typography>
 		<Typography
 			varient="h5"
 			component="h2"
 		>
 		
 		 {msg.message} 
       </ Typography>

       </CardContent>
    </Card>
    
	</div>	
)
}