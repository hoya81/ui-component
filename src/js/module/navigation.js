import EventEmitter from './eventEmitter';

export default class Navigator extends EventEmitter {
    constructor(opts) {
        super();
        try {
            this.ele = document.querySelector(opts.ele);  
            this.speed = opts.speed ?opts.speed:0.5;
            this.subOpenType = opts.subOpenType ? opts.subOpenType : 'nomal'
            this.lists = this.ele.querySelectorAll(':scope >ul>li');   
            this.btns = this.ele.querySelectorAll('li>a');
            this.selected = opts.selected ?opts.selected:null ;  
            this.resetTimer = null;                             
            this._init();
        }
        catch (e){
            console.log(e)
        }
    }
    _init(){
        let listCons =  this.ele.querySelectorAll('div');
        for(let ele of listCons){           
            if(this.subOpenType == 'always') {
                ele.style.cssText = 'height:auto;';
                ele.querySelector('ul').style.cssText = 'display:block';
            }else{
                ele.querySelector('ul').style.cssText = 'transform:translateY(-100%)';
            }
        }

        if(this.subOpenType != 'always'){
            this.lists.forEach((list)=>{
                ['mouseenter', 'focusin'].forEach((type)=>{
                    list.addEventListener(type, (e)=>{
                        this._overHandler(e.currentTarget);   
                        if(this.subOpenType == 'selected')clearTimeout(this.resetTimer);      
                    });
                });

                ['mouseleave', 'focusout'].forEach((type)=>{
                    list.addEventListener(type, (e)=>{       
                        if(this.subOpenType == 'selected'){
                            this.resetTimer = setTimeout(()=>{                                
                                this._overHandler(this._getSelectDepth1Node()); 
                            }, 1000)  
                        }else{
                            this._overHandler(null); 
                        }         
                    });
                });
            })
        }
        this.btns.forEach((btn)=>{
            btn.addEventListener('click', (e)=>{
                this._selectHandler(e.currentTarget);                
            });
        })
    }
    _overHandler(target){
        this.lists.forEach((list)=>{
            let con = list.querySelector('div'),
                tarH = 0, 
                tarY = 0;
            if(con != null){
                if(target == list){
                    tarH = con.querySelector('ul').offsetHeight;
                    tarY = 0;
                }else{
                    tarH = 0;
                    tarY = -con.querySelector('ul').offsetHeight;
                }
                TweenMax.to(con, this.speed, {height:tarH})
                TweenMax.to(con.querySelector('ul'), this.speed, {y:tarY})
            }
            
        });
    }
   
    _selectHandler(target){       
        let key = target.getAttribute('data-key')
        if(key === this.selected)return;    
        this.selected = key;
        this._selectAct(key);
        this.emit('select', this.selected);        
    }
    
    _selectAct(key){
        let depth = key.split('-');
        let seletedAll =this.ele.querySelectorAll(`[data-key="${key}"]`);
        
        this.btns.forEach((btn)=>{
            btn.classList.remove('active');  
            if(depth.length>1){
                let parentBtns = this.ele.querySelector(`[data-key="${depth[0]}"]`);
                if(parentBtns)parentBtns.classList.add('active')
            } 
        })
        seletedAll.forEach((btn)=>{
            btn.classList.add('active');
        })
    }

    _getSelectDepth1Node(){
        let depth = this.selected ?  this.selected.split('-') : null;
        let parentBtns = null;
        if(depth){
            parentBtns = this.ele.querySelector(`[data-key="${depth[0]}"]`).parentNode;
        }   
        return parentBtns;
    }
    set select(key){
        if(key === this.selected)return;    
        this.selected = key;
        this._selectAct(key);

        if(this.subOpenType == 'selected')this._overHandler(this._getSelectDepth1Node()); 
    }
}
