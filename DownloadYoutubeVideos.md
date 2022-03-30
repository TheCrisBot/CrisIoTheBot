# How to download Youtube videos without installing thirdparty softwares.

In this gist I will show you how to download any youtube video without having to download a third-party software.

Below here is the script for downloading Youtube videos. The script is written using JavaScript. I modified the script a little for my own use.
```javascript
javascript: (function() {
	if (((location.hostname != "musicdownload.zone") | (location.hostname != "iyoutubetomp4.com")) && (location.hostname == "www.youtube.com")) {
		if (window.confirm("Do you want to download its audio version?")) {
			window.open("https://musicdownload.zone/download?ver=bk&url="+encodeURI(location.href))
		} else {
			window.open("https://iyoutubetomp4.com/download?url="+encodeURI(location.href))
		}
	} else if ((location.hostname != "savetik.cc") && (location.hostname == "www.tiktok.com")) {
		window.open("https://savetik.cc/en/download?url="+encodeURI(location.href))
	} else {
		window.alert("1. Drag me to BookMarkBar. \n2. Goto & watch video on YouTube and any video site. \n3. Click this BookMarkLet")
	}
})();
```

Minified version of the above script.
```javascript
javascript: (function() {if (((location.hostname != "musicdownload.zone") | (location.hostname != "iyoutubetomp4.com")) && (location.hostname == "www.youtube.com")) {if (window.confirm("Do you want to download its audio version?")) {window.open("https://musicdownload.zone/download?ver=bk&url="+encodeURI(location.href))} else {window.open("https://iyoutubetomp4.com/download?url="+encodeURI(location.href))}} else if ((location.hostname != "savetik.cc") && (location.hostname == "www.tiktok.com")) {window.open("https://savetik.cc/en/download?url="+encodeURI(location.href))} else {window.alert("1. Drag me to BookMarkBar. \n2. Goto & watch video on YouTube and any video site. \n3. Click this BookMarkLet")}})();
```

Another minified compressed version of the script above.
```js
!function(){"musicdownload.zone"!=location.hostname|"iyoutubetomp4.com"!=location.hostname&&"www.youtube.com"==location.hostname?window.confirm("Do you want to download its audio version?")?window.open("https://musicdownload.zone/download?ver=bk&url="+encodeURI(location.href)):window.open("https://iyoutubetomp4.com/download?url="+encodeURI(location.href)):"savetik.cc"!=location.hostname&&"www.tiktok.com"==location.hostname?window.open("https://savetik.cc/en/download?url="+encodeURI(location.href)):window.alert("1. Drag me to BookMarkBar. \n2. Goto & watch video on YouTube and any video site. \n3. Click this BookMarkLet")}();
```


### step 1: Copy the code below
```js
!function(){"musicdownload.zone"!=location.hostname|"iyoutubetomp4.com"!=location.hostname&&"www.youtube.com"==location.hostname?window.confirm("Do you want to download its audio version?")?window.open("https://musicdownload.zone/download?ver=bk&url="+encodeURI(location.href)):window.open("https://iyoutubetomp4.com/download?url="+encodeURI(location.href)):"savetik.cc"!=location.hostname&&"www.tiktok.com"==location.hostname?window.open("https://savetik.cc/en/download?url="+encodeURI(location.href)):window.alert("1. Drag me to BookMarkBar. \n2. Goto & watch video on YouTube and any video site. \n3. Click this BookMarkLet")}();
```
### step 2: Open Chrome
### step 3: Right-click on the Bookmarks pane which is right below the URL address bar.
### step 4: Click on 'Add page'. A popup box 'Edit Bookmark' will show up.
### step 5: On the 'Name' section, write any name you prefer, I will use 'Download it'.
### step 6: On the 'URL' section paste the script you copied earlier.
### step 7: Click save 
### step 8: Goto Youtube, play a video.
### step 9: Locate the bookmark named 'Download it' and click on it. A popup will be shown asking if you want to download the video as Audio. 
### step 10: Click 'OK' to download its audio file, otherwise click cancel to download its video file.
