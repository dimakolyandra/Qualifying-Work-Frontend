import 'react-chat-elements/dist/main.css';
import '../../css/messageBox.css';
import React, {Component} from 'react';
import {ChatList, MessageList, Navbar, ChatItem, Input, Button} from 'react-chat-elements';
import {dialogCont} from '../../mockedData/dialogContent';


class Chat extends ChatList{
    constructor(props){
        super(props);
        this.state = {content: "chatList"};
        this.messageText = "";
        this.getDialogData = this.getDialogData.bind(this);
        this.chooseDialog = this.chooseDialog.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.changeText = this.changeText.bind(this);
        this.toDialogList = this.toDialogList.bind(this);
    }

    toDialogList(){
        this.setState({content: "chatList"});
    }

    changeText(event){
        this.messageText = event.target.value;
    }

    getDialogData(dialogId){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/chats/dialog', false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
          sessionKey: this.props.sessionKey(),
          contractId: dialogId
        }));
        var resp = JSON.parse(xhr.responseText);
        resp.content.map((item) => {item.date = new Date(item.date)});
        if(resp.status != 'ok'){
            alert(resp.status)
            return;
        }
        this.contractId = dialogId;
        return resp;
    }

    chooseDialog(dialog){
        this.setState({content: "dialog:" + dialog.id});
    }

    sendMessage(){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/chats/new', false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
          sessionKey: this.props.sessionKey(),
          contractId: this.contractId,
          text: this.messageText
        }));
        var resp = JSON.parse(xhr.responseText);
        this.setState({content: "dialog:" + this.contractId});
    }

    render(){
        if (this.state.content.includes("chatList")){
            return (
                <ChatList
                    className="chat-list"
                    dataSource={this.props.dataSource}
                    onClick={this.chooseDialog}
                />
            );
        }
        if (this.state.content.includes("dialog")){
            var dialogInfo = this.state.content.split(":");
            var dialogData = this.getDialogData(dialogInfo[1]);

            return (
                <div className="message-window">
                    <Button
                        className="back"
                        color='white'
                        backgroundColor='black'
                        text='Вернуться к списку диалогов'
                        onClick={this.toDialogList}
                    />
                    <div className="message header">
                        <ChatItem
                            avatar={dialogData.header.avatar}
                            alt={'Reactjs'}
                            title={dialogData.header.title}
                        />
                    </div>
                    <div className="message block">
                        <MessageList
                            className="message-list"
                            dataSource={dialogData.content}
                        />
                    </div>
                    <div className="message input">
                        <Input
                            placeholder="Наберите сообщение ..."
                            multiline={true}
                            onChange={this.changeText}
                            rightButtons={
                                <Button
                                    color='white'
                                    backgroundColor='black'
                                    text='Отправить'
                                    onClick={this.sendMessage}
                                />
                            }
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Chat;