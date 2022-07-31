const get = (function(element_id){return document.getElementById(element_id);});

const maxButton = get("maximize-button");
const minButton = get("minimize-button");
const closeButton = get("close-button");

window.addEventListener("load", max_changer());
window.addEventListener("resize", max_changer());

maxButton.addEventListener("click", async function(){
    app.window.maximize();
    max_changer();
});

minButton.addEventListener("click", async function(){
    app.window.minimize();
    max_changer();
});

closeButton.addEventListener("click", async function(){
    app.window.close();
});

function max_changer() 
{
    app.maximizeState().then(function(e){
        if(e.indexOf("MAXIMIZED") !== -1)
        {
            maxButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="maximize-button" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>`;
        }
        if(e.indexOf("NOT_MAXIMIZED") !== -1)
        {
            maxButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="maximize-button" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`;
        }
    });
};
