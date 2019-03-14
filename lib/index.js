/**
 Created by mgso  2018/7/16 0016
 */
/**
 * @param path 文件路径
 * @param options 包含宽,高,质量
 * @param callback 图片压缩后执行的回调函数
 */
function canvasDataURL(path, options, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = options.width || w;
        h = options.height || (w / scale); //默认等比压缩
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (options.quality && options.quality <= 1 && options.quality > 0) {
            quality = options.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}

/**
 * @param file 文件对象
 * @param options 包含宽,高,质量
 * @param callback
 */
export function photoCompress(file, options, callback) {
    var ready = new FileReader();
    //开始读取指定的Blob对象或File对象中的内容.
    //当读取操作完成时,readyState属性的值会成为DONE
    // 如果设置了onloadend事件处理程序,则调用之.
    //同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
    ready.readAsDataURL(file);
    ready.onload = function () {
        var path = this.result;
        canvasDataURL(path, options, callback)
    }
}

/**
 * base64转blod流
 * @param urlData
 * @returns {Blob}
 */
export function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

export default {
    photoCompress: photoCompress,
    convertBase64UrlToBlob: convertBase64UrlToBlob,

}