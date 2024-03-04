(function (CardboardVRDisplay) {
  'use strict';

  // © Copyright 2022 CrazyH
   // This file was originally made by CrazyH
   // Do not rebrand if you are distributing it
   // © Copyright 2022 CrazyH

  var config_defaults$1 = config_defaults = {
    debug: false,
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
  };

  // © Copyright 2022 CrazyH
   // This file was originally made by CrazyH
   // Do not rebrand if you are distributing it
   // © Copyright 2022 CrazyH

  class EventTarget {
      constructor() {
        this.listeners = new Map();
      };
    
      addEventListener(type, listener) {
        if(typeof type !== "string") console.error("Param 'type' needs to be a string");
        if(typeof listener !== "function") console.error("Param 'listener' needs to be a function");

        var currListeners = this.listeners.get(type) || [];
        currListeners.push(listener);
        this.listeners.set(type, currListeners);
      };
    
      dispatchEvent(type, event) {
        if(typeof type !== "string") console.error("Param 'type' needs to be a string");
        if(typeof listener !== "function") console.error("Param 'event' needs to be a object");
        
        var currListeners = Object.freeze(this.listeners.get(type) || []);

        for (const listener of currListeners) {
          listener(event);
        }
        if (typeof this["on" + type] === "function") this["on" + type](event);
      };
    
      removeEventListener(type, listener) {
        if(typeof type !== "string") console.error("Param 'type' needs to be a string");
        if(typeof listener !== "function") console.error("Param 'listener' needs to be a function");

        var currListeners = this.listeners.get(type) || [];
        delete currListeners[currListeners.indexOf(listener)];
        this.listeners.set(type, currListeners);
      };
  }

  // © Copyright 2022 CrazyH

  class XRSession extends EventTarget {
     constructor(config, mode, features) {
        this.config = config;
        this.cardboardConfig = this.config["cardboard"];
        this.mode = mode;
        this.features = features;

        this.vrDisplay = new CardboardVRDisplay(this.cardboardConfig);
        window.VRFrameData = this.vrDisplay.VRFrameData;
     };

     cancelAnimationFrame(handle) {

     };

     end() {

     };

     requestAnimationFrame(animationFrameCallback) {
        this.vrDisplay.requestAnimationFrame(animationFrameCallback);
     };

     requestReferenceSpace(referenceSpaceType) {

     };

     updateRenderState(state = null) {

     };

  }

  // © Copyright 2022 CrazyH

  class XRSystem extends EventTarget {
    constructor(config, supportedSessions) {
      this.config = config;
      this.supportedSessions = supportedSessions;
      this.immersiveSession = null;
    };

    async isSessionSupported(sessionType) {
      return Object.keys(this.supportedSessions).includes(sessionType);
    };

    async requestSession(mode, options) {
      if(!Object.keys(this.supportedSessions).includes(mode)) return console.error("Only the 'immersive-vr' mode is currently supported.");

      const defaultFeatures = this.supportedSessions[mode];
      const supportedFeatures = this.supportedSessions[mode].supportedFeatures;
      const requiredFeatures = Object.freeze(Object.assign({}, defaultFeatures.requiredFeatures, config));
      const optionalFeatures = Object.freeze(Object.assign({}, defaultFeatures.optionalFeatures, config));
      const allFeatures = new Set();

      var featureNotSupported = false;
      for (const feature of requiredFeatures) {
        if(supportedFeatures.includes(feature)) {
          console.error("The required feature " + feature + " is not supported");
          featureNotSupported = true;
        } else {
          allFeatures.add(feature);
        }    }
      if(featureNotSupported) {
        console.warn("Session does not support some required features");
      }
      for (const feature of optionalFeatures) {
        if(supportedFeatures.includes(feature)) {
          console.warn("The optional feature " + feature + " is not supported");
        } else {
          allFeatures.add(feature);
        }    }
      const session = new XRSession(this.config, mode, options);
      this.immersiveSession = session;

      function onSessionEnded() {
        this.immersiveSession = null;
        session.removeEventListener('end', onSessionEnded);
      }    session.addEventListener('end', onSessionEnded);

      return session;
    };
  }

  // © Copyright 2022 CrazyH

  const supportedSessions = {
    "immersive-vr": {
      requiredFeatures: ['viewer', 'local'],
      optionalFeatures: [],
      supportedFeatures: ['viewer', 'local'],
    },
  };

  class XRCard {
    constructor(config = {}) {
      this.config = Object.freeze(Object.assign({}, config_defaults$1, config));

      if (!('xr' in window.navigator) && this.isiOS()) this.run();
    };

    isiOS() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    };

    async run() {
      window.navigator.xr = new XRSystem(this.config, supportedSessions);
    };

  }

  return XRCard;

})(CardboardVRDisplay);
