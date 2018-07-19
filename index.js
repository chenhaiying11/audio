// 获取音频对象与按钮对象
var oMp3 = document.querySelector("#mp3"),//获取音频audio
	oBf = document.querySelector(".bf"),//获取播放按钮
	oSys = document.querySelector(".sys"),//上一首
	oNext = document.querySelector(".next"),//下一首
	oMyspan = document.querySelector(".myspan"),//进度条上的圆点
	oprogressBar = document.querySelector(".progress-bar"),//进度条
	ostartTime = document.querySelector(".time1"),//播放时长
	ostopTime = document.querySelector(".time2"),//总时长
	oName = document.querySelector(".p1"),//歌曲名字
	oSinger =document.querySelector(".p2"),//歌手
	oImg = document.querySelector(".main img"),//旋转歌曲海报图片
	oBg = document.querySelector(".box"),//背景图
	oList=document.querySelector(".lt"),//歌曲列表
	oclose=document.querySelector(".close"),//关闭
	oProgressTop=document.querySelector(".progressTop")//滚动条跟随变色部分
// 播放
//进行判断，当点击播放按钮时，如果是暂停，则点击以后音频播放并且切换图标，然后开始旋转;否则相反
oBf.onclick = function(){
	if (oMp3.paused){
		oMp3.play();
		oBf.src = 'img/暂停.png';
		turn();
		time_interval=setInterval(goTime,10)
	}else{
		oMp3.pause();
		oBf.src= 'img/播放.png';
		oImg.style.animationPlayState="paused";
	}
}

// 用数组模拟播放列表
oMp3.list=[{singer:"陈一发儿",name:"童话镇",src:"陈一发儿-童话镇.mp3",imgsrc:"img/1.jpg"},
		 {singer:"梁咏琪",name:"中意他",src:"梁咏琪 - 中意他.mp3",imgsrc:"img/2.jpg"},
		 {singer:"王冕",name:"勉为其难",src:"王冕-勉为其难.mp3",imgsrc:"img/3.png"}];

//声明音频的初始值下标为0;
oMp3.cur=0;

// 创建切换歌曲函数
oMp3.show=function(){
	oName.innerHTML = oMp3.list[oMp3.cur].name;//获取音频列表中歌曲名称
	oSinger.innerHTML = oMp3.list[oMp3.cur].singer;//获取音频列表中歌手名字
	oMp3.src = oMp3.list[oMp3.cur].src;//获取音频列表中歌曲路径
	oImg.src = oMp3.list[oMp3.cur].imgsrc;//获取音频列表中背景图片
	oBg.style.backgroundImage ="url("+oMp3.list[oMp3.cur].imgsrc+")";
	oMp3.load();//audio加载
}

// 切换歌曲
// 下一首
oNext.onclick=function(){
	oMp3.cur++;
	if (oMp3.cur>oMp3.list.length-1){
		oMp3.cur=0;
	}
	// 判断播放状态
	if(oMp3.paused){
		oMp3.show();
	}
	else{
		oMp3.show();
		oMp3.play();
	}
}

// 上一首
oSys.onclick = function(){
	oMp3.cur--;
	if (oMp3.cur<0) {
		oMp3.cur=oMp3.list.length-1;
	}
	// 判断播放状态
	if(oMp3.paused){
		oMp3.show();
	}
	else{
		oMp3.show();
		oMp3.play();
	}
}

// 自动播放下一首(ended是音频的播放是否已结束。)
// oMp3.ended = function(){
// 	// oMp3.next();//播放完成以后自动播放下一首
// 	oMp3.oNext();
// 	oMp3.play();
// }


 // // 监听视口改变事件
 // document.querySelector("html").style.fontSize=document.documentElement.clientWidth/414*100+"px";
 // window.onresize = function(){
 // 	document.querySelector("html").style.fontSize=document.documentElement.clientWidth/414*100+"px";
 // }



 //点击列表图标显示列表
  oList.onclick=function(){
     list.style.display="block";
  };
  //点击关闭按钮列表隐藏
 oclose.onclick=function(){
 	list.style.display="none";
 }
//圆圈转动
function turn(){
	oImg.style.animation="turnMove 2s linear 0s infinite" ;
}
//进度条部分功能
//获取视频时间，并保留小数点后面2位
    var timeInterval=setInterval(getTime,10);
    function getTime(){
        if (oMp3.duration != NaN) {
            var time_1 = parseInt(oMp3.duration/60);
            var time_2 = parseInt(oMp3.duration%60);
            var min = time_1 > 9? time_1:"0"+time_1;
            var sec = time_2 > 9? time_2:"0"+time_2;
            ostopTime.innerText=min+":"+sec;
        }
    }
    //获取视频时间当前播放时间
    function goTime(){
        var time_1=parseInt(oMp3.currentTime/60);
        var time_2=parseInt(oMp3.currentTime%60);
        var nowMin = time_1 > 9? time_1:"0"+time_1;
        var nowSec = time_2 > 9? time_2:"0"+time_2;
        ostartTime.innerText=(nowMin+":"+nowSec);
    }
    //进度条
    oMp3.ontimeupdate=function(){
        // 计算播放进度百分比
        var pre = oMp3.currentTime/oMp3.duration;
        //视频当前的播放位置/当前视频的长度
        // 根据百分比改变进度条位置
        oMyspan.style.left = 10 * pre + "rem";
        //跟随变颜色
        var pro =0;//设置移动跟随变颜色的初始值
        var proBar = setInterval(function(){
            oProgressTop.style.width=oMyspan.style.left;
            if(pro == 10 ){
                clearInterval(proBar);
            }
        },10);
    }
    //当音频播放完成时
    oMp3.onended=function(){
        oMyspan.style.left = 0;
        oMp3.pause();
        oBf.src = 'img/播放.png';
        oImg.style.animationPlayState="paused";
    }



