type compressOptions = {
    height?: number | undefined,
    width?: number | undefined,
    quality?: number | undefined
}

class Imgzip {
    private options: compressOptions;

    constructor(options?: compressOptions) {
        if (options) {
            let {quality = 0.7, width, height} = options;
            this.options = {
                quality: quality,
                width: width,
                height: height
            }
        } else {
            this.options = {
                quality: 0.7
            }
        }

    }

    /**
     * @param path 文件路径
     * @param callback 图片压缩后执行的回调函数
     */
    canvasDataURL(path: string, callback: Function) {
        let img = new Image();
        img.src = path;
        img.onload = (e) => {
            let that = <CanvasImageSource>e.target;
            // 默认按比例压缩
            let w: number = <number>that.width,
                h: number = <number>that.height,
                scale = w as number / h;
            w = this.options.width || w;
            h = this.options.height || (w / scale); //默认等比压缩
            //生成canvas
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            // 创建属性节点
            let anw: Attr = document.createAttribute("width");
            anw.nodeValue = w.toString();
            let anh: Attr = document.createAttribute("height");
            anh.nodeValue = h.toString();
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx?.drawImage(that, 0, 0, w, h);
            // quality值越小，所绘制出的图像越模糊
            let base64 = canvas.toDataURL('image/jpeg', this.options.quality);
            // 回调函数返回base64的值
            callback && callback(base64);
        }
    }

    /**
     * @param file 文件对象
     * @param callback
     */
    photoCompress(file: Blob, callback: Function) {
        let ready = new FileReader();
        //开始读取指定的Blob对象或File对象中的内容.
        //当读取操作完成时,readyState属性的值会成为DONE
        // 如果设置了onloadend事件处理程序,则调用之.
        //同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.
        ready.readAsDataURL(file);
        ready.onload = (event) => {
            let imgFile = <FileReader>event.target;
            let path = imgFile.result;
            this.canvasDataURL(<string>path, callback)
        }
    }

    /**
     * base64转blod流
     * @param urlData
     * @returns {Blob}
     */
    static convertBase64UrlToBlob(urlData: string): Blob | undefined {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/);
        if (!mime) return;
        let type = mime[1];
        let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type});
    }
}

export default Imgzip


