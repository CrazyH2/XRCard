 // © Copyright 2022 CrazyH
 // This file was originally made by CrazyH
 // Do not rebrand if you are distributing it
 // © Copyright 2022 CrazyH

import EventTarget from "../libraries/EventTarget";
import CardboardVRDisplay from '../libraries/cardboard-vr-display';

export default class XRSession extends EventTarget {
   constructor(config, mode, features) {
      super();
      this._config = config;
      this._cardboardConfig = this._config["cardboard"];
      this._mode = mode;
      this._features = features;
      this._ended = false;

      this._vrDisplay = CardboardVRDisplay(this.cardboardConfig);
      window.VRFrameData = this._vrDisplay.VRFrameData;

      this.inputSources = [];
      this.interactionMode = "world-space";
      this.preferredReflectionFormat = "srgba8";
      this.renderState = "fix this"; // fix this
      this.visibilityState = "visible";
   };

   cancelAnimationFrame(handle) {
      if(this._ended == false) this._vrDisplay.cancelAnimationFrame(handle);
   };

   async end() {
      if(this._ended == true) return;

      this.dispatchEvent("end", { session: this });
      this._ended = true;
      return this;
   };

   requestAnimationFrame(animationFrameCallback) {
      if(this._ended == false) this._vrDisplay.requestAnimationFrame(animationFrameCallback);
   };

   requestReferenceSpace(referenceSpaceType) {

   };

   updateRenderState(state = null) {
      if(state !== null) this._vrDisplay.requestPresent([{source: state.baseLayer.gl.canvas}]);
   };

};