function Sync()
{
    this.start = function(){
        const DEBUG = false;

        var _t = this;
        var xmlhttp = new XMLHttpRequest();
        var syncStartDate = new Date();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                if(DEBUG)
                    console.info("on_time_received", data);
                _t.dispatchEvent(new CustomEvent("on_time_received", {"detail":data}));

                var syncDateReceived = new Date();
                var requestDiff = syncDateReceived.getTime() - syncStartDate.getTime(); // difference in milliseconds
               
                var serverTime = new Date(data.now*1000 - requestDiff/2);
                var then = new Date(2022,5,20,0,0,0);
                var diff = serverTime.getTime() - then.getTime(); // difference in milliseconds
                var diffMillis = diff % 1000;
                var seconds = Math.floor(diff / 1000);

                setTimeout(function(){
                    var start = +new Date();
                    var count = 0;
                    setInterval(function(){
                        seconds++;

                        if(DEBUG){
                            console.log((new Date() - start) % 1000,
                            ++count,
                            Math.round((new Date() - start)/1000),
                            seconds);
                        }
                        _t.dispatchEvent(new CustomEvent("on_1s_tick", {"detail":{seconds}}));
                    }, 1000)
                }, diffMillis)                
            }
        };
        xmlhttp.open("GET", "https://use.ntpjs.org/v1/time.json", true);
        xmlhttp.send();
    }


    //event listeners
    this.eventListeners = new Array();
    this.addEventListener = function(type, eventHandler)
    {
        this.eventListeners.push({type, eventHandler});
    }

    this.dispatchEvent = function(event)
    {
        for (var i = 0; i < this.eventListeners.length; i++)
            if (event.type == this.eventListeners[i].type)
                this.eventListeners[i].eventHandler(event);
    }
}