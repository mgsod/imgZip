"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Imgzip = /** @class */ (function () {
    function Imgzip(options) {
        if (options) {
            var _a = options.quality, quality = _a === void 0 ? 0.7 : _a, width = options.width, height = options.height;
            this.options = {
                quality: quality,
                width: width,
                height: height
            };
        }
        else {
            this.options = {
                quality: 0.7
            };
        }
    }
    /**
     * @param path 文件路径
     * @param callback 图片压缩后执行的回调函数
     */
    Imgzip.prototype.canvasDataURL = function (path, callback) {
        var _this = this;
        var img = new Image();
        img.src = path;
        img.onload = function (e) {
            var that = e.target;
            // 默认按比例压缩
            var w = that.width, h = that.height, scale = w / h;
            w = _this.options.width || w;
            h = _this.options.height || (w / scale); //默认等比压缩
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w.toString();
            var anh = document.createAttribute("height");
            anh.nodeValue = h.toString();
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(that, 0, 0, w, h);
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', _this.options.quality);
            // 回调函数返回base64的值
            callback && callback(base64);
        };
    };
    /**
     * @param file 文件对象
     * @param callback
     */
    Imgzip.prototype.photoCompress = function (file, callback) {
        var _this = this;
        var ready = new FileReader();
        //开始读取指定的Blob对象或File对象中的内容.
        //当读取操作完成时,readyState属性的值会成为DONE
        // 如果设置了onloadend事件处理程序,则调用之.
        //同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
        ready.readAsDataURL(file);
        ready.onload = function (event) {
            var imgFile = event.target;
            var path = imgFile.result;
            _this.canvasDataURL(path, callback);
        };
    };
    /**
     * base64转blod流
     * @param urlData
     * @returns {Blob}
     */
    Imgzip.convertBase64UrlToBlob = function (urlData) {
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/);
        if (!mime)
            return;
        var type = mime[1];
        var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: type });
    };
    return Imgzip;
}());
exports.default = Imgzip;
