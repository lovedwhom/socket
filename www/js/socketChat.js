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
        this.socket.on('newImg',function(user,img){
            // const chatMsg =
            that._displayImage(user, img);
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
            var msg = document.getElementById('chatMsg').innerHTML;
            if(isNotNull(msg.trim())){
                that.__displayUserLoginMsg('me',msg);
                that.socket.emit('sendChatMsg',msg);
                // document.getElementById('chatMsg').innerHTML ='';
            }else{
                promptJS('聊天信息不能为空')
            }

        },false);
        document.getElementById('select__emoji').addEventListener('click',function(e){
            const emojiWrapper = document.getElementById('emojiWrapper');
            emojiWrapper.style.display ='block';
            e.stopPropagation();
        },false);
        document.getElementById('emojiWrapper').addEventListener('click',function (evt) {
            var target =evt.target;
            if(target.nodeName.toLowerCase() =='img'){
                const chatMsg = document.getElementById('chatMsg');
                chatMsg.focus();
                chatMsg.innerHTML = chatMsg.innerHTML  + '[emoji:' + target.title + ']';
                this.style.display ='none';
                // this.parentNode.style.display ='none';
            }
        },false);
        document.body.addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            }
        });
        this._initEmoji(70);
        
        document.getElementById('sendImage').addEventListener('change',function () {
            if(this.files.length != 0){
                var file = this.files[0];
                var reader =new FileReader();
                if(!reader){
                    that.__displayUserLoginMsg('system', '!your browser doesn\'t support fileReader');
                    this.value = '';
                    return;
                }
                reader.onload=function(e){
                    this.value = '';
                    that.socket.emit('img', e.target.result);
                    that._displayImage('me', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },false)
        document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('content').innerHTML = '';
        }, false);
    },
    __displayUserLoginMsg:function (user,msg) {
        const  date = new Date().toTimeString().substring(0,8);
        const userMsg = user + '(' +date +')';
        var msg = this._showEmoji(msg);
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
    },
    _showEmoji:function (msg) {
        var match,result =msg;
        reg =   /\[emoji:\d+\]/g;
        var emojiIndex;
        totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            console.log(match);
            console.log(match[0]);
            emojiIndex = match[0].slice(7, -1);
            console.log(emojiIndex);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="../resource/emoji/' + emojiIndex + '.gif" />');//todo:fix this in chrome it will cause a new request for the image
            };
        };
        return result;
    },

    _displayImage:function (user,img) {
        var container = document.getElementById('content');
        var msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
            msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + img + '" target="_blank"><img style="width: 200px;height: 200px;" src="' + img + '"/></a>';
            container.appendChild(msgToDisplay);
            container.scrollTop = container.scrollHeight;
    }

};
