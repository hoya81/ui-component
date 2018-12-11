import '@babel/polyfill';

export default class QuickMenu{
    constructor(opts) {
        try {
            this.ele = document.querySelector(opts.ele);
            this.follow = document.querySelector(opts.follow);
            this.followCons = [];
            this.btns = this.ele.querySelectorAll("[data-list='list']>a");
            this.srollSpeed = opts.srollSpeed?opts.srollSpeed:600;
            this.isTrack = opts.isTrack?opts.isTrack:false;
            this.state = {
                top: this.follow.offsetTop + opts.fixedSpaceTop,
                fixedTop: opts.fixedTop,
                endY: this.follow.clientHeight + this.follow.offsetTop - this.ele.clientHeight - opts.fixedTop - opts.fixedSpaceBottom,
                fixedBottom: this.follow.clientHeight + this.follow.offsetTop - this.ele.clientHeight - opts.fixedSpaceBottom
            };

            this._init();
            this._scroll();
        }
        catch (e){

        }
    }

    _init(){
        window.addEventListener('scroll', this._scroll.bind(this));

        for (let i=0; i < this.btns.length; i++) {
            let id;
            id = this.btns[i].getAttribute('href').replace(/#/g, "");
            this.followCons.push(document.querySelector(`[data-id='${id}']`));
            
            this.btns[i].addEventListener("click", (e)=> {
                    let hash, reStr, conOffset;
                    hash = e.currentTarget.getAttribute('href');
                    reStr = hash.replace(/#/g, "");
                    conOffset = document.querySelector(`[data-id='${reStr}']`).offsetTop;
                    $("html, body").stop().animate({scrollTop:conOffset}, this.srollSpeed);
                    //TweenLite.to(window, this.srollSpeed/1000, {scrollTo:conOffset});
            })
        }
    }

    _scroll(){
        let scltop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
        if (scltop >= this.state.top - this.state.fixedTop) {
            this.ele.classList.add("fix")
            this.ele.style.cssText =`top: ${this.state.fixedTop}px`;
            if(scltop > this.state.endY ){
                this.ele.classList.remove("fix");
                this.ele.style.cssText =`top: ${this.state.fixedBottom}px`;
            }
        } else {
            this.ele.classList.remove("fix");
            this.ele.style.cssText =`top: ${this.state.top}px`;

        }
        if(this.isTrack)this._anchor(scltop);
    }

    _anchor(scltop){
        let firstScroll, lastScroll, id, conLength, btnLength;
        conLength = this.followCons.length;
        btnLength = this.btns.length;
        firstScroll = this.followCons[0].offsetTop;
        lastScroll = this.followCons[conLength-1].offsetTop + this.followCons[conLength-1].clientHeight;

        for (let i = 0; i < conLength; i++) {
            let conTop = this.followCons[i].offsetTop;
            if (conTop <= scltop) {
                id = i;
            }
        }

        for (let i=0; i < btnLength; i++) {
            this.btns[i].classList.remove("active");
            if(scltop < firstScroll || scltop > lastScroll){

            }else{
                this.btns[id].classList.add("active");
            }
        }

    }
}
