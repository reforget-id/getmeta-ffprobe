# getmeta-ffprobe
Get metadata from a video with ffprobe

Originally fork from get-video-dimensions. Because it can only get width and height from a video, then i modified it so i could get other metadata.

This module only work if you install @ffmpeg-installer/ffmpeg first. Then getmeta-ffprobe will automaticly find ffprobe path. 

## Instalation
```sh
npm install getmeta-ffprobe
```

## Usage

```javascript
const getMeta = require('getmeta-ffprobe')

const metadata = getMeta(filename, type, select, parameters) 
console.log(metadata[0])
console.log(metadata[1])
...
```

## API

- **filename** : It can be path to filename or url

- **type** : `stream | format`   
Use `stream` if you want to get specific information in video or audio stream. Or `format` if you want get format information.

- **select** : `v | a`  
When you use `stream` **type**, **select** must be `v` (video metadata) or `a` (audio metadata). But when you use `format` **type**, this option will be ignored and you can fill it with `v` or `a`.

- **parameters** : Information that you want to get. Support multiple parameter separate by comma. Error will come out if you write incorrect parameter. 

[See FFProbe tips for more info](https://trac.ffmpeg.org/wiki/FFprobeTips)


## Example

###### Async/Await

```javascript
const getMeta = require('getmeta-ffprobe')

(async () => {
	try {
        const metadata = await getMeta('video.mp4', 'stream', 'v', 'width,height,bit_rate')
        console.log(metadata[0])    //width
        console.log(metadata[1])    //height
        console.log(metadata[2])    //bit_rate

        const format = await getMeta('video.mp4', 'format', 'v', 'duration')
        console.log(format[0])  //duration
		
	} catch (error) {
		console.log(error)
	}
})();
```

Output will return in array according to parameters. Normally, output can be string, number, unknown, and N/A. 
