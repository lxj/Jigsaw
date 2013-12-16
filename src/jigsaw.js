/**
 * Created with JetBrains WebStorm.
 * User: LXJ
 * Date: 13-5-18
 * Time: 下午5:18
 * To change this template use File | Settings | File Templates.
 */
Array.prototype.confound = function() {
    this.sort(function() {
        return Math.random() - .5
    })
};

/**
 * randomColor
 * @return {String}
 */
function randomColor(){
    return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
}

/**
 * 将16进制颜色转换成rgb
 * @param a
 * @return {*}
 */
function torgb(a){
    var b=[],c;
    if(a.substr(0,1)==="#"){
        a=a.substring(1);
    }
    a=a.toLowerCase();
    c=new String(a).split('');
    if(c.length<3 || c.length>6) return false;
    if(c.length===3){
        a=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    }
    for(x=0;x<3;x++){
        b[0]=a.substr(x*2,2);
        b[3]="0123456789abcdef";
        b[1]=b[0].substr(0,1);
        b[2]=b[0].substr(1,1);
        b[20+x]=b[3].indexOf(b[1])*16+b[3].indexOf(b[2]);
    }
    return {r:b[20],g:b[21],b:b[22]}
};

/**
 * 数组随机排序
 * @param arr  array
 * @return {Array}
 *  //console.log(arrRandom([{1:1},{2:2},{3:4},{4:4},{5:5}]))
 */
function arrRandom(arr){
    var arrCache = [],
        arrClone = arr.concat(),
        index = Math.floor(Math.random()*arrClone.length),
        bg = arrClone[index];
    while(arrClone.length!==0){
        index = Math.floor(Math.random()*arrClone.length);
        bg = arrClone[index];
        arrCache.push(bg);
        arrClone.splice(index,1);
    }
    return arrCache;
};

/**
 * 拼图布局函数
 * @param layoutJson  布局json数据
 * @param S 参数对象 {width:'',height:'',callback:function(){}}
 * @return {Array} 返回一个数组，数组中的每个元素是一个对象，对象包含一个元素的top，left，width，height和面积等数据
 */
function jigsaw(layoutJson,S){
    var contentWidth = S.width || $(window).width(),
        contentHeight = S.height || $(window).height(),
        count= 0,
        jigsawTmp=[];

    var jigsawBase = function(json,callback){
        var height=json.real_height || contentHeight,
            width=json.real_width || contentWidth,
            jsonData = json.cols || json.rows,
            left = json.left || 0,
            top = json.top || 0,
            background = json.background;
        if(json.random){
            jsonData = arrRandom(jsonData);
        }
        if(jsonData){
            var jsonDataLength = jsonData.length,
                colrowCount= 0,
                isCols = json.cols ?  true : false,
                offset = 0;
            $(jsonData).each(function(i,v){
                var w_pixels = v.width ? Math.floor(v.width*width/100) : width,
                    h_pixels = v.height ? Math.floor(v.height*height/100) : height,
                    fontSize = Math.floor(Math.sqrt(w_pixels * h_pixels)*.14);
                    if(jsonDataLength==++colrowCount){
                        isCols ? (w_pixels = width-offset) : (h_pixels =height-offset);
                    };
                offset += isCols ? w_pixels : h_pixels;
                if(!v.cols && !v.rows){
                    var jigsawTmpItem={
                        left:left,
                        top:top,
                        width:w_pixels,
                        height:h_pixels,
                        fontSize:fontSize,
                        area:w_pixels * h_pixels,
                        count:count++
                    };
                    background && (jigsawTmpItem.background = background);
                    S.callBack && S.callBack.call(jigsawTmpItem,jigsawTmpItem);
                    jigsawTmp.push(jigsawTmpItem);
                };
                v.left = left;
                v.top = top;
                v.real_height=h_pixels;
                v.real_width=w_pixels;
                background && (v.background = background);
                if(isCols){
                    left = left+ w_pixels;
                }else{
                    top = top+h_pixels;
                }
                callback && callback(v);
            });
        };
    };

    jigsawBase(layoutJson,function(v){
        (v.cols || v.rows) && jigsawBase(v,arguments.callee)
    });
    return jigsawTmp
}
