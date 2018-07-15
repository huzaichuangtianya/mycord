/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage);


function setLocalStorage() {
    // var aa=localStorage.getItem("111");
    // console.log("555:"+localStorage.getItem("111"));
    // localStorage.setItem("Name", "John");
    // showLocalStorage();
    // getVs();

    load("http://10.50.30.189:8080/web1/img/sxgw.apk");
}


function showLocalStorage() {
    console.log(localStorage.getItem("Name"));
}










function load(appurl){
    var fileName=appurl.slice( appurl.lastIndexOf('/')+1)
    var targetPath = cordova.file.externalDataDirectory;//cordova.file.documentsDirectory;//'cdvfile://localhost/persistent/apk/';
    var filePath=targetPath+fileName;
    // alert("fileName"+fileName+",targetPath:"+targetPath);
    downLoadFile(filePath,appurl);

    //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
    //       fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
    //           console.log(fileEntry);
    //           //调用fileTransfer插件，下载文件
    //           downLoadFile(fileEntry.toURL(),appurl);
    //       }, function(err) {
    //          console.log(err);
    //       });
    //    }, function(error) {
    //       console.log(error);
    //    });

}

function downLoadFile(filePath,remoteURL){
    // 服务器下载地址
    // var uri = encodeURI(remoteURL);
    var fileTransfer = new FileTransfer();
    // var fileURL = fileEntry.toURL();
    // var progress = window.navigator.dialogsPlus.progressStart("更新","获取中....");
    alert("uri0:"+remoteURL);
    fileTransfer.download(
        remoteURL,
        filePath,
        function(entry){
            alert("uri111：");
            //下载成功回调
            //打开下载完成的文件
            //progress.hide();
            cordova.plugins.fileOpener2.open(
                entry.toURL(),
                'application/vnd.android.package-archive',
                {

                    error : function(e){ alert('失败status:'+JSON.stringify(e)+ " 路径："+entry.toURL() )},
                    success : function(){


                        alert("成功");
                    }

                });
        },
        function(error){
            //下载失败回调
            //下载失败的提示
            progress.hide();
            alert(JSON.stringify(error))
        },
        null,
        {}
    )
    // fileTransfer.onprogress=function(progressEvent){
    //     if (progressEvent.lengthComputable) {
    //         progress.setValue((progressEvent.loaded/progressEvent.total)*100);
    //         if((progressEvent.loaded/progressEvent.total)==1){
    //             progress.hide();
    //         }
    //     }
    //     else{
    //         alert(progressEvent.loaded+":"+progressEvent.total)
    //     }
    //     //alert(JSON.stringify(progressEvent))
    // }

}




function getVs() {
    // alert("kankan")
    // 获取当前移动设备已经安装的版本
    cordova.getAppVersion.getVersionCode().then(function (version) {
        // var versionCode = parseInt(version.toString().replace(/\./g,''));
        // console.log(versionCode);
        // 1.获取当前版本号
        // 2.获取服务器端的最新版本的数据源
        // 3.进行版本比较,如果当前的版本号与服务器的版本号不一致时,下载并安装最新的应用程序安装包
       alert("3.aa5:"+version.toString());

    });
}