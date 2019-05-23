import React from 'react';
const ChatMessage = ({isUserMessage,id,name,content,deleteMessage}) => {
  
    return (
        <React.Fragment>
            {isUserMessage ? 
              <div className="chat-message d-flex flex-column align-self-end d-block mb-3">
               {content}
 
               <div className="align-self-end edit-content"> 
                   <label className="m-1" > edit |</label>
                   <label onClick={()=>deleteMessage(id)}> delete</label>
                </div>
            </div>
              :
              <div className="chat-message d-flex flex-column mb-3">
              {name}: {content}

            </div>}
            
        </React.Fragment>
    )
}

export default ChatMessage;