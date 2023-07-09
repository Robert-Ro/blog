# Frontend Media

## MediaDevices

### Instance Methods

- `enumerateDevices()`
  requests a list of the available media input and output devices, such as `microphones`, `cameras`, `headsets`, and so forth
- `getSupportedConstraints()`
- `getDisplayMedia()`
  prompts the user to select and grant permission to **capture the contents of a display** or portion thereof (such as a window) as a MediaStream.屏幕捕捉
- `getUserMedia()`
  prompts the user for permission to use a media input which produces a MediaStream with tracks containing the requested types of media,(遇到多个设备，则浏览器自动返回默认的摄像头设备)

### Events

- `devicechange`

## MediaStreamTrack

## MediaRecorder

## Resources

- [mediadevices w3c](https://w3c.github.io/mediacapture-main/#mediadevices)
- [MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
