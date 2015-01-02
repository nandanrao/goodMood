
/*
Here is what I am using for my Android and IOS apps
Keep attention to a couple of things:
-	Android and IOS have other directorynames for files
-	$cordovaFile functions prefixes all pathnames with root
	$cordovaFileTransfer functions needs absolute pathnames

Here I create the prefixes for File functions and FileTransfer functions for Android and IOS
*/

		// if (ionic.Platform.isAndroid()) {
  //   console.log('cordova.file.externalDataDirectory: ' + cordova.file.externalDataDirectory);
  //   			myFsRootDirectory1 = 'file:///storage/emulated/0/'; // path for tablet
  //   			myFsRootDirectory2 = 'file:///storage/sdcard0/'; // path for phone
  //   			fileTransferDir = cordova.file.externalDataDirectory;
  //   			if (fileTransferDir.indexOf(myFsRootDirectory1) === 0) {
  //   				fileDir = fileTransferDir.replace(myFsRootDirectory1, '');
  //   			}
  //   			if (fileTransferDir.indexOf(myFsRootDirectory2) === 0) {
  //   				fileDir = fileTransferDir.replace(myFsRootDirectory2, '');
  //   			}
  //   console.log('Android FILETRANSFERDIR: ' + fileTransferDir);
  //   console.log('Android FILEDIR: ' + fileDir);
  //   		}
  //   		if (ionic.Platform.isIOS()) {
  //   console.log('cordova.file.documentsDirectory: ' + cordova.file.documentsDirectory);
  //   			fileTransferDir = cordova.file.documentsDirectory;
  //   			fileDir = '';
  //   console.log('IOS FILETRANSFERDIR: ' + fileTransferDir);
  //   console.log('IOS FILEDIR: ' + fileDir);
  //   		}
		// }
