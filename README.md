```
Note: this only supports "immersive-vr" and "inline" currently.
```

# XRCard
A polyfill that makes webxr run on iOS using Cardboard.

# Setup and installation
- Download `/build/xrcard.min.js`
- Add the following to your HTML: `import XRCard from "./xrcard.min.js"` (Requires ESM)
- Initialize XRCard
```js
import XRCard from "./xrcard.min.js";

var xr_ios = XRCard({
  cardboard: {
    // Optionally inject custom Viewer parameters as an option. Each item
    // in the array must be an object with the following properties; here is
    // an example of the built in CardboardV2 viewer:
    //
    // {
    //   id: 'CardboardV2',
    //   label: 'Cardboard I/O 2015',
    //   fov: 60,
    //   interLensDistance: 0.064,
    //   baselineLensDistance: 0.035,
    //   screenLensDistance: 0.039,
    //   distortionCoefficients: [0.34, 0.55],
    //   inverseCoefficients: [-0.33836704, -0.18162185, 0.862655, -1.2462051,
    //     1.0560602, -0.58208317, 0.21609078, -0.05444823, 0.009177956,
    //     -9.904169E-4, 6.183535E-5, -1.6981803E-6]
    // }
    // Added in 1.0.12.
    ADDITIONAL_VIEWERS: [],
  
    // Select the viewer by ID. If unspecified, defaults to 'CardboardV1'.
    // Added in 1.0.12.
    DEFAULT_VIEWER: '',
  
    // By default, on mobile, a wakelock is necessary to prevent the device's screen
    // from turning off without user input. Disable if you're keeping the screen awake through
    // other means on mobile. A wakelock is never used on desktop.
    // Added in 1.0.3.
    MOBILE_WAKE_LOCK: true,
  
    // Whether or not CardboardVRDisplay is in debug mode. Logs extra
    // messages. Added in 1.0.2.
    DEBUG: false,
  
    // The URL to JSON of DPDB information. By default, uses the data
    // from https://github.com/WebVRRocks/webvr-polyfill-dpdb; if left
    // falsy, then no attempt is made.
    // Added in 1.0.1
    DPDB_URL: 'https://dpdb.webvr.rocks/dpdb.json',
  
    // Complementary filter coefficient. 0 for accelerometer, 1 for gyro.
    K_FILTER: 0.98,
  
    // How far into the future to predict during fast motion (in seconds).
    PREDICTION_TIME_S: 0.040,
  
    // Flag to disabled the UI in VR Mode.
    CARDBOARD_UI_DISABLED: false,
  
    // Flag to disable the instructions to rotate your device.
    ROTATE_INSTRUCTIONS_DISABLED: false,
  
    // Enable yaw panning only, disabling roll and pitch. This can be useful
    // for panoramas with nothing interesting above or below.
    YAW_ONLY: false,
  
    // Scales the recommended buffer size reported by WebVR, which can improve
    // performance.
    // UPDATE(2016-05-03): Setting this to 0.5 by default since 1.0 does not
    // perform well on many mobile devices.
    BUFFER_SCALE: 0.5,
  
    // Allow VRDisplay.submitFrame to change gl bindings, which is more
    // efficient if the application code will re-bind its resources on the
    // next frame anyway. This has been seen to cause rendering glitches with
    // THREE.js.
    // Dirty bindings include: gl.FRAMEBUFFER_BINDING, gl.CURRENT_PROGRAM,
    // gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING,
    // and gl.TEXTURE_BINDING_2D for texture unit 0.
    DIRTY_SUBMIT_FRAME_BINDINGS: false,
  },
});
```

# Compile
```sh
rollup /src/index.js --file /builds/xrcard.js --format iife
```
```sh
rollup /src/index.js --file /builds/xrcard.min.js --format iife
```

# License
<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title">XRCard</span> by <span property="cc:attributionName">CrazyH</span> is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution-NonCommercial-ShareAlike 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>
