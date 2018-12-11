import EventEmitter from './eventEmitter';

export default class SelectBox extends EventEmitter{
    constructor(opts) {
        super();
        try {
            this.ele = document.querySelector(opts.ele);
            this.title = this.ele.querySelector('[data-select="title"]');
            this.listWrap = this.ele.querySelector('[data-select="list-wrap"]');
            this.val = this.title.getAttribute('data-value');
            this._init();
        }
        catch (e){
        }
    }

    _init(){
        this.title.addEventListener("click", (e)=> {
            if(e.currentTarget.getAttribute('disabled') != null) return;
            if(!e.currentTarget.classList.contains('active')){
                this._viewListWrap(true)
            }else{
                this._viewListWrap(false)
            }
        })

        // $(this.listWrap).on('click', '>li', (e)=> {
        //     this._listSelect(e.currentTarget);
        // })

        this.listWrap.addEventListener('click', (e)=>{
            if(e.target && e.target.nodeName == "LI") {
                this._listSelect(e.target);                
            }    
        });
    }

    _viewListWrap(open){
        if(open){
            this.title.classList.add('active');
            this.listWrap.classList.add('active');
        }else{
            this.title.classList.remove('active');
            this.listWrap.classList.remove('active');
        }
    }

    _listSelect(target){
        let value = target.getAttribute('data-value');
        this.val = value;
        this.title.setAttribute('data-value', value)
        this.title.innerHTML = target.innerHTML;
        this._viewListWrap(false);

        this.emit('select', this);
    }

    get value(){
        let value = this.val;
        return value;
    }
}
