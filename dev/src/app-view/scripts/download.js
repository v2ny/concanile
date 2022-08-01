const urlinput = get("url-input");
const downloadbutton = get("download-button");
const clearbutton = get("clear-button");

const remainingText = get("remaining");
const progressBar = get("progress");
const progressText = get("progress-text");

try {
    window.onload = () => {
        Object.keys(localStorage).forEach(function(key){
            get("downloads").innerHTML += `<div class="download-i-box"><img src="https://www.pngall.com/wp-content/uploads/2018/05/Files-PNG-File.png" alt="img" class="i-logo"><div class="i-text">${localStorage.getItem(key)}</div><div class="i-percentage">100%</div></div>`;
        });
    }

    clearbutton.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
    let bool = false;
    var url;
    setInterval(() => {
        if(bool == false) 
        {
            app.fetchURL().then((r) => {
                if(r.indexOf("http://") !== -1 || r.indexOf("https://") !== -1)
                {
                    bool = true;
                    url = r;
                    return r = "";
                }
            });
        }
    }, 1024);
    setInterval(() => {
        if(bool == true)
        {
            var ajax = new XMLHttpRequest();
                ajax.responseType = "blob";
                ajax.open("GET", url, true);
                ajax.send();
                ajax.onreadystatechange = () => {
                    if(this.readyState == 4 && this.status === 200)
                    {
                        var obj = window.URL.createObjectURL(this.response);
                    
                        setTimeout(() => {
                            window.URL.revokeObjectURL(obj);
                        }, 60 * 1000);
                    }
                };

                    var start = new Date().getTime();

                    ajax.onprogress = (e) => {
                        downloadbutton.ariaDisabled = true;
                        downloadbutton.style.cursor = "not-allowed";
                        downloadbutton.disabled = true;
                        progressBar.max = e.total;
                        progressBar.value = e.loaded;

                        var percent = (e.loaded / e.total) * 100;
                        percent = Math.floor(percent);
                        progressText.innerHTML = percent + "%";

                        var end = new Date().getTime();
                        var duration = (end - start) / 1000;
                        var bps = e.loaded / duration;
                        var kbps = bps / 1024;
                        var mbps = kbps / 1024;
                        kbps = Math.floor(kbps);
                        mbps = Number(mbps).toFixed(2);

                        var time = (e.total - e.loaded) / bps;
                        var seconds = time % 60;
                        var minutes = time / 60;

                        seconds = Math.floor(seconds);
                        minutes = Math.floor(minutes);

                        setTimeout(() => {
                            remainingText.innerHTML = mbps + " MB/s" + ". Remaining " + minutes + "m " + seconds + "s ";  
                        }, 1000);

                        if(percent == 100)
                        {
                            downloadbutton.disabled = false;
                            downloadbutton.ariaDisabled = false;
                            downloadbutton.style.cursor = "default";
                            window.localStorage.setItem(bps, url.substring(url.lastIndexOf('/') + 1));
                            get("downloads").innerHTML += `<div class="download-i-box"><img src="https://www.pngall.com/wp-content/uploads/2018/05/Files-PNG-File.png" alt="img" class="i-logo"><div class="i-text">${url.substring(url.lastIndexOf('/') + 1)}</div><div class="i-percentage">${percent}%</div></div>`;
                            const link = document.createElement("a");
                            link.style.display = "none";
                            link.style.position = "absolute";
                            link.href = url;
                            link.setAttribute("download", url.substring(url.lastIndexOf('/') + 1));
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                            remainingText.innerHTML = "Finished downloading!";
                            setTimeout(() => {
                                remainingText.innerHTML = "No downloads yet.";
                            }, 3500);
                            progressBar.value = 0;
                            progressText.innerHTML = "0%";
                            url = "";
                            bool = false;
                        }


                    };
            }
    }, 4096);
    downloadbutton.addEventListener("click", () => {
        var ajax = new XMLHttpRequest();
        ajax.responseType = "blob";
        if(urlinput.value.indexOf("https://") !== -1 || urlinput.value.indexOf("http://") !== -1)
        {
            ajax.open("GET", urlinput.value, true);
        }
        else
        {
            alert("Please make sure you enter an url!");
            return;
        }
        ajax.send();
        ajax.onreadystatechange = () => {
            if(this.readyState == 4 && this.status === 200)
            {
                var obj = window.URL.createObjectURL(this.response);

                setTimeout(() => {
                    window.URL.revokeObjectURL(obj);
                }, 60 * 1000);
            }
        };

        var start = new Date().getTime();

        ajax.onprogress = (e) => {
            downloadbutton.disabled = true;
            downloadbutton.ariaDisabled = true;
            downloadbutton.style.cursor = "not-allowed";
            progressBar.max = e.total;
            progressBar.value = e.loaded;

            var percent = (e.loaded / e.total) * 100;
            percent = Math.floor(percent);
            progressText.innerHTML = percent + "%";

            var end = new Date().getTime();
            var duration = (end - start) / 1000;
            var bps = e.loaded / duration;
            var kbps = bps / 1024;
            var mbps = kbps / 1024;
            kbps = Math.floor(kbps);
            mbps = Number(mbps).toFixed(2);

            var time = (e.total - e.loaded) / bps;
            var seconds = time % 60;
            var minutes = time / 60;

            seconds = Math.floor(seconds);
            minutes = Math.floor(minutes);

            setTimeout(() => {
                remainingText.innerHTML = mbps + " MB/s" + ". Remaining " + minutes + "m " + seconds + "s ";  
            }, 1000);
            
            if(percent == 100)
            {
                downloadbutton.disabled = false;
                downloadbutton.ariaDisabled = false;
                downloadbutton.style.cursor = "default";
                window.localStorage.setItem(bps, urlinput.value.substring(urlinput.value.lastIndexOf('/') + 1));
                get("downloads").innerHTML += `<div class="download-i-box"><img src="https://www.pngall.com/wp-content/uploads/2018/05/Files-PNG-File.png" alt="img" class="i-logo"><div class="i-text">${urlinput.value.substring(urlinput.value.lastIndexOf('/') + 1)}</div><div class="i-percentage">${percent}%</div></div>`;
                const link = document.createElement("a");
                link.style.display = "none";
                link.style.position = "absolute";
                link.href = urlinput.value;
                link.setAttribute("download", urlinput.value.substring(urlinput.value.lastIndexOf('/') + 1));
                document.body.appendChild(link);
                link.click();
                link.remove();
                remainingText.innerHTML = "Finished downloading!";
                setTimeout(() => {
                    remainingText.innerHTML = "No downloads yet.";
                }, 3500);
                progressBar.value = 0;
                progressText.innerHTML = "0%";
            }

            
        };
    });
}
catch (err)
{
    if(err)
    {
        alert("Please make sure that you entered a correct url!");
    }
}
