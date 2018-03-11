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
        // Здесь будет запрос, получающий сообщения данного диалога
        return dialogCont;
    }

    chooseDialog(dialog){
        this.setState({content: "dialog:" + dialog.id});
    }

    sendMessage(){
        // Здесь будет запрос, отправляющий сообщение на сервер
        if (this.messageText != ""){
            dialogCont.content.push({
                position: 'right',
                type: 'text',
                text: this.messageText,
                date: new Date(),
            });
            this.forceUpdate();
        }
    }

    render(){
        console.log("!")
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