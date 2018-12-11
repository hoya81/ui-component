import EventEmitter from './eventEmitter';

export default class TabMenu extends EventEmitter {
    constructor(opts) {
        super();
        try {
            this.ele = document.querySelector(opts.ele);
            this.tabWrap = this.ele.querySelector('[data-tab="tab-wrap"]');
            this.tabs = this.tabWrap.querySelectorAll('[data-tab="tab-wrap"]>li:not([disabled])');
            this.tabContentWrap = this.ele.querySelector('[data-tab="tab-contents"]');
            this.tabContent = this.tabContentWrap.querySelectorAll('[data-tab]');
            //this.selected = opts.selected ? opts.selected : this.tabWrap.querySelector('.active').getAttribute('data-tab');
            if( opts.selected ){
                this.selected = opts.selected ;
            }else{
                if(this.tabWrap.querySelector('.active')){
                    this.selected =  this.tabWrap.querySelector('.active').getAttribute('data-tab');
                }else{
                    //this.selected = 'tab-1'
                }
            }
            this._init();
        }
        catch (e){
            console.log(e)
        }
    }

    _init(){
        this.tabWrap.addEventListener('click', (e)=>{
            if(e.target && e.target.nodeName == "BUTTON") {
                if(e.target.parentNode.hasAttribute('disabled'))return;
                if(e.target.parentNode.classList.contains('active'))return;
                this._tabSelect(e.target.parentNode.getAttribute('data-tab'));                
            }    
        });
        if(this.selected != undefined)this._tabSelect(this.selected);
    }

    _tabSelect(name){
        this.selected = name;
        this.tabContent.forEach(content=>{
            content.classList.remove('active'); 
        });
        this.tabs.forEach(tab=>{
            tab.classList.remove('active');
        });
        this.tabWrap.querySelector(`[data-tab="${name}"]`).classList.add('active');
        this.tabContentWrap.querySelector(`[data-tab="${name}"]`).classList.add('active');

        this.emit('select', this);
    }

    set select(name){
        this._tabSelect(name)
    }
}

