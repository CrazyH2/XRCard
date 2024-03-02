 // © Copyright 2022 CrazyH
 // This file was originally made by CrazyH
 // Do not rebrand if you are distributing it
 // © Copyright 2022 CrazyH

import EventTarget from "../libraries/EventTarget";
import CardboardVRDisplay from 'cardboard-vr-display';

export default class XRSession extends EventTarget {
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

};
 