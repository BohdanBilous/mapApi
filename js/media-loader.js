/**
 *
 * @param {Object} element js query selector
 * @param {String} mediaType mediaType "image", "background" or "video"
 * @param {Object} mediaQueryArray object containing parameters
 * @param {Function} callback callback after load file
 * @param {Object} videoControls object containing video parameters
 *
 */

export class MediaLoader {
  constructor(element, mediaType, mediaQueryArray, videoControls, callback) {
    this.mediaType = mediaType;
    this.element = element;
    this.mediaQueryArray = mediaQueryArray;
    this.videoControls = videoControls;
    this.videoElement = null;
    this.mediaQueryArray = mediaQueryArray;
    this.callback = callback;

    if (!this.mediaQueryArray) {
      if (this.mediaType === "bg") this.setBackground();
      if (this.mediaType === "image") this.setImage();
      if (this.mediaType === "video") this.initVideo();
    } else {
      this.setMediaQuery();
    }
  }

  setMediaQuery() {
    for (let i = 0; i < this.mediaQueryArray.length; i++) {
      if (window.matchMedia(this.mediaQueryArray[i].media).matches) {
        let src = this.mediaQueryArray[i].src;

        if (this.mediaType === "bg") this.element.style.backgroundImage = src;
        if (this.mediaType === "image") this.element.src = src;
        if (this.mediaType === "video") this.initVideo(src);
      }
    }
  }

  setBackground() {
    this.element.style.backgroundImage = this.element.dataset.src;
  }

  setImage() {
    this.element.src = this.element.dataset.src;
  }

  initVideo(mediaQuerySrc) {
    let videoSrc = mediaQuerySrc ? mediaQuerySrc : this.element.dataset.src;

    this.videoElement = document.createElement("video");
    this.videoElement.setAttribute("src", videoSrc);
    if (this.videoControls) this.setAttrVideo();
    this.element.appendChild(this.videoElement);

    this.videoElement.load();

    if (this.callback) {
      this.videoElement.oncanplay = this.callback;
    }
  }

  setAttrVideo() {
    // if (this.videoControls.autoplay)
    //   this.videoElement.autoplay = this.videoControls.autoplay;
    // if (this.videoControls.muted)
    //   this.videoElement.muted = this.videoControls.muted;
    // if (this.videoControls.loop)
    //   this.videoElement.loop = this.videoControls.loop;
    // if (this.videoControls.poster)
    //   this.videoElement.poster = this.videoControls.poster;

    for (let attr in this.videoControls) {
      var attrName = attr;
      console.log(this.videoControls.attrName);
      this.videoElement.setAttribute(attrName, this.videoControls.attr);
    }
  }
}
