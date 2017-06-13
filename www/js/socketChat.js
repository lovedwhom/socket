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
        this.socket.on('loginSuccess',function(nick_name){
            console.log(nick_name);
            document.getElementById('login_wrapper').style.display = 'none';
            document.getElementById('user_name').innerHTML = nick_name;
        });
        this.socket.on('system',function(nickname,userCount,type){
            var msg = '用户'+nickname + (type == 'login' ? ' 进入聊天室' : ' 离开聊天室');
            that.__displayUserLoginMsg('system ', msg);
            document.getElementById('online_num').textContent = userCount
        });
        this.socket.on('newMsg',function(nickname,msg){
            // const chatMsg =
            that.__displayUserLoginMsg(nickname,msg)
        });

        document.getElementById('loginBtn').addEventListener('click',function(){
            var nickName = document.getElementById('nicknameInput').value;
            if(isNotNull(nickName)){
                that.socket.emit('login', nickName);
            }else{
                promptJS('请输姓名')
            }
        },false);
        document.getElementById('sendMsg').addEventListener('click',function () {
            const msg = document.getElementById('chatMsg').innerHTML;
            if(isNotNull(msg)){
                that.__displayUserLoginMsg('me',msg);
                that.socket.emit('sendChatMsg',msg);
            }else{
                promptJS('聊天信息不能为空')
            }

        },false);

        this._initEmoji(70);
    },
    __displayUserLoginMsg:function (user,msg) {
        const  date = new Date().toTimeString().substring(0,8);
        const userMsg = user + '(' +date +')';
        var container = document.getElementById('content'),
            userShow = document.createElement('div');
            userShow .innerHTML = userMsg;
            container.appendChild(userShow);
        
            msgToDisplay = document.createElement('div');
            msgToDisplay .innerHTML = msg;
            container.appendChild(msgToDisplay);

    },
    _initEmoji:function (_num) {
        const emojiContainer = document.getElementById('emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 1; i <_num; i++) {
            var emojiItem = document.createElement('img');
            emojiItem.src = '../resource/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        }
        emojiContainer.appendChild(docFragment);
    }

};
