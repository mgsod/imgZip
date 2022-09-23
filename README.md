# imgZip
 图片压缩插件
 
<a href="https://www.npmjs.org/package/imgzip">
   <img src="https://img.shields.io/npm/v/imgzip.svg">
</a>
<a href="https://npmcharts.com/compare/imgzip?minimal=true">
   <img src="http://img.shields.io/npm/dm/imgzip.svg">
</a>

### Demo示例

[图片压缩](https://unpkg.com/imgzip@2.0.8/example/index.html) 

### 安装

#### npm
```
 npm i imgzip
```

#### script
````
<script src="https://unpkg.com/imgzip@2.0.8/dist/index.min.js"></script>
````
`@2.0.8`为固定版本,可自行调整

### 使用方法

#### 2.x版本（支持ts）

```javascript
import imgzip from "imgzip";

export default {
  name: "App",
  mounted() {
    // 监听选择文件
    document.getElementById("file").onchange = function () {
      // @2.x版本后采用 class Api。所以需要 new 一个 imgZip 对象
      let compress = new imgzip({ quality: 0.5 });
      // 调用图片压缩
      compress.photoCompress(this.files[0], function (base64) {
        // document.getElementById('img').src = base64  //预览图片
        // 转 blob 流上传 convertBase64UrlToBlob函数为 imgzip 的静态函数
        let blob = imgzip.convertBase64UrlToBlob(base64);
        let formData = new FormData();
        formData.append("file", blob, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
        // 上传操作....
      });
    };
  },
};
```
### 函数说明

> @2.x版本后改用class api, 原`photoCompress`函数中传入的`options`参数改为实例化imgzip时传入。

* new imgZip(options)

| 参数 | 说明 | 是否必须 | 默认值 |
| ------ | ------ | ------ | ------ |
| options.width | 图片宽度 | 否 | 图片原始宽度 | 
| options.height | 图片高度 | 否 | 图片原始高度 | 
| options.quality | 图片质量 | 否 | 0.7 | 



* photoCompress(图片压缩函数) 无返回值

| 参数 | 说明 | 是否必须 | 默认值 |
| ------ | ------ | ------ | ------ |
| file | 文件对象(Blod) | 是 |  - ||
| callback | 压缩后回调函数,回调参数返回压缩后的base64编码 | 是 |  - |





#### 1.x版本(不支持ts)

```javascript
import imgzip from "imgzip";

export default {
  name: "App",
  mounted() {
    // 监听选择文件
    document.getElementById("file").onchange = function () {
      // 调用图片压缩
      imgzip.photoCompress(this.files[0], {}, function (base64) {
        // document.getElementById('img').src = base64  //预览图片
        // 转 blob 流上传
        let blob = imgzip.convertBase64UrlToBlob(base64);
        let formData = new FormData();
        formData.append("file", blob, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
        // 上传操作....
      });
    };
  },
};
```
### 函数说明
* photoCompress(图片压缩函数) 

| 参数 | 说明 | 是否必须 | 默认值 |
| ------ | ------ | ------ | ------ |
| file | 文件对象(Blod) | 是 |  - |
| options | 压缩参数(宽/高/质量)| 否 | {width:图片高度,height:图片宽高比,quality:0.7}|
| callback | 压缩后回调函数,回调参数返回压缩后的base64编码 | 是 |  - |




* convertBase64UrlToBlob(base64编码转blod流) 1.x版本和2.x版本均为`imgzip`的静态函数

| 参数 | 说明 | 是否必须 | 默认值 | 返回值 |
| ------ | ------ | ------ | ------ | ------ |
| base64 | 图片base64编码 | 是 |  - | Blod |


## 致谢
感谢[JetBrains](https://www.jetbrains.com)提供的开源License

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)

[https://jb.gg/OpenSourceSupport](https://jb.gg/OpenSourceSupport)




