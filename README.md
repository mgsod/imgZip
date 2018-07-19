# imgZip
 图片压缩插件
 
<a href="https://www.npmjs.org/package/imgzip">
   <img src="https://img.shields.io/npm/v/imgzip.svg">
</a>
<a href="https://npmcharts.com/compare/imgzip?minimal=true">
   <img src="http://img.shields.io/npm/dm/imgzip.svg">
</a>

### Demo示例

[图片压缩](https://unpkg.com/imgzip@1.0.4/example/index.html) 

### 安装

#### npm
```
 npm i imgzip
```

#### cnd
````
<script src="https://unpkg.com/imgzip@1.0.4/dist/index.min.js"></script>
````
`@1.0.4`为固定版本,可自行调整

### 使用方法
```javascript
import imgzip from 'imgzip'  
  export default {
    name: 'App',
    components: {
      HelloWorld
    },
    mounted() {
      //监听选择文件
      document.getElementById('file').onchange = function () {
        //调用图片压缩
        imgzip.photoCompress(this.files[0], {}, function (base64) {
          //document.getElementById('img').src = base64  //预览图片
          
          //转blod流上传
          let blod =  imgzip.convertBase64UrlToBlob(base64); 
          let formData = new FormData();
          formData.append("file", blod, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
          //上传操作....
        })
      }
    }
  }
```
### 函数说明
> photoCompress(图片压缩函数) 无返回值

| 参数 | 说明 | 是否必须 | 默认值 |
| ------ | ------ | ------ | ------ |
| file | 文件对象 | 是 |  - |
| options | 压缩参数(宽/高/质量)| 否 | {width:img.width,height:img.width/(img.width/img.height),quality:0.7}|
| callback | 压缩后回调函数,回调参数返回压缩后的base64编码 | 是 |  - |



> convertBase64UrlToBlob(base64编码转blod流) 

| 参数 | 说明 | 是否必须 | 默认值 |
| ------ | ------ | ------ | ------ |
| base64 | 图片base64编码 | 是 |  - |

`返回值为blod对象`


