/*
    
*/


export class VideoLoad {

    constructor(videoWrapSelector, controls, autoplay, muted, loop = true) {
        this.videoWrap = document.querySelector(videoWrapSelector);
        this.videoSrc = this.videoWrap.dataset.src;
        this.videoPoster = this.videoWrap.dataset.poster;
        this.controls = controls || false;
        this.autoplay = autoplay || false;
        this.muted = muted || true;
        this.loop = loop;
        this.videoElement = null;
        this.modalVideo = document.querySelector(".modal-video") || null;

        this.videoInit();
        this.addPoster();
        this.videoSetAttr();
    }

    videoInit() {
        this.videoElement = document.createElement("video");
        
        this.videoElement.setAttribute("src", this.videoSrc);
        this.videoWrap.appendChild(this.videoElement);
        this.videoElement.load();
    }

    videoSetAttr() {
        if (this.controls) this.videoElement.controls = true;
        if (this.autoplay) this.videoElement.autoplay = true;
        if (this.muted) this.videoElement.muted = true;
        if (this.loop) this.videoElement.loop = true;
        console.log(this.loop)
    }

    addPoster() {
        if (this.videoPoster) {
            this.videoElement.setAttribute("poster", this.videoPoster);
        }
    }
}