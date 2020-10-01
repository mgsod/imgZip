declare type compressOptions = {
    height?: number | undefined;
    width?: number | undefined;
    quality?: number | undefined;
};
declare class Imgzip {
    private options;
    constructor(options?: compressOptions);
    /**
     * @param path 文件路径
     * @param callback 图片压缩后执行的回调函数
     */
    canvasDataURL(path: string, callback: Function): void;
    /**
     * @param file 文件对象
     * @param callback
     */
    photoCompress(file: Blob, callback: Function): void;
    /**
     * base64转blod流
     * @param urlData
     * @returns {Blob}
     */
    static convertBase64UrlToBlob(urlData: string): Blob | undefined;
}
export default Imgzip;
