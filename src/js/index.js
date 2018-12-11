import '@babel/polyfill';
import './util/polyfill';
import style from "../sass/index.scss";
import Navi from './module/navigation';
import TabMenu from './module/tabMenu';
import SelectBox from './module/selectBox';
import QuickMenu from './module/quickMenu';



const navi1 = new Navi({
    ele:'#navi-1',
    speed:0.2
})

navi1.addEventListener('select', (selected)=>{
    console.log(selected)
});
navi1.select = 'menu1-2';

const navi2 = new Navi({
    ele:'#navi-2',
    subOpenType:'selected'
})
navi2.select = 'menu1-2';

const navi3 = new Navi({
    ele:'#navi-3',
    subOpenType:'always'
})
navi3.select = 'menu2-1';


const tabMenu = new TabMenu({
    ele:'#tabMenu'
})
const tabSelect = (target)=>{
    console.log(target.selected) 
}
tabMenu.addEventListener('select', tabSelect);


const selectBox = new SelectBox({
    ele:'#selectBox'
})
selectBox.addEventListener('select', ()=>{
    console.log(selectBox.value);
});


const quickMenu = new QuickMenu({
    ele:'#quickMenu',
    follow:'#contents',
    fixedTop:160,
    fixedSpaceTop:0,
    fixedSpaceBottom:160,
    isTrack:true,
    srollSpeed:600,
})





