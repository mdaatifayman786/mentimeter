let boo = Boolean(true)
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
async function trip(){
    while(boo){
        let data = document.querySelector('#timeword')
        data.style.color = 'rgb(255,199,56)'
        data.textContent = 'Time'
        await delay(4200)
        data.textContent = "meeting"
        data.style.color = 'rgb(0,219,145)'
        await delay(4200)
        data.textContent = 'voices'
        data.style.color = 'rgb(255,0,0)'
        await delay(4200)
        data.textContent = 'teaching'
        data.style.color = 'rgb(25,108,255)'
        await delay(4200)
    }
}
trip()