window.onload = function () {
    var socke_chat = new sockeChat();
    socke_chat.init();
};
var sockeChat = function () {
    this.socket = null;
};
sockeChat.prototype = {
    init:function(){
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect',function () {
            document.getElementById('nickWrapper').style.display ='block'
        });
        this.socket.on('nickExisted',function(){
            promptJS('此用户已存在')
        });
        this.socket.on('loginSuccess',function(){
            document.getElementById('login_wrapper').style.display = 'none';
        });
        this.socket.on('system',function(nickname,userCount,type){
            var msg = nickname + (type == 'login' ? ' joined' : ' left');
            that.__displayNewMsg('system ', msg, 'red');
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
        });

        document.getElementById('loginBtn').addEventListener('click',function(){
            var nickName = document.getElementById('nicknameInput').value;
            if(isNotNull(nickName)){
                that.socket.emit('login', nickName);
            }else{
                promptJS('请输姓名')
            }
        },false)
    },
    __displayNewMsg:function () {
        var container = document.getElementById('chatMsg'),
            msgToShow = document.createElement('p');
            date = new Date().toTimeString().substring(0,8)

    }

};
