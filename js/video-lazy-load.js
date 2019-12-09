/*
    
*/

export class VideoLoad {
  constructor(
    videoWrapSelector,
    controls,
    autoplay = false,
    muted = true,
    loop = true,
    loadMobile = true,
    callback = null,
  ) {
    this.videoWrap = document.querySelector(videoWrapSelector);
    this.videoSrc = this.videoWrap.dataset.src;
    this.videoPoster = this.videoWrap.dataset.poster;
    this.controls = controls || false;
    this.autoplay = autoplay;
    this.muted = muted;
    this.loop = loop;
    this.loadMobile = loadMobile;
    this.videoElement = null;
    this.modalVideo = document.querySelector(".modal-video") || null;
    this.callback = callback;
    this.width = window.innerWidth;
    this.videoInit();
    this.addPoster();
    this.videoSetAttr();
  }

  videoInit() {
    this.videoElement = document.createElement("video");

    this.videoElement.setAttribute("src", this.videoSrc);
    this.videoWrap.appendChild(this.videoElement);
    this.videoElement.load();

    if (this.callback) this.callback(this);
  }

  videoSetAttr() {
    if (this.width <= 1150 && !this.loadMobile) {
      this.videoElement.autoplay = false;
      this.videoElement.load();
      return
    }
    if (this.controls) this.videoElement.controls = true;
    if (this.autoplay) this.videoElement.autoplay = true;
    if (this.muted) this.videoElement.muted = true;
    if (this.loop) this.videoElement.loop = true;
    this.videoElement.setAttribute("playsinline", "true");
  }

  addPoster() {
    if (this.videoPoster) {
      this.videoElement.setAttribute("poster", this.videoPoster);
    }

  }
}