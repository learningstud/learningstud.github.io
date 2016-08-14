var portall = new Array();

onconnect = function(e)
{
    var port = e.ports[0];
    
    portall.push(port);
    port.onmessage = function(e)
    {
        for(var c1 = 0; c1 < portall.length; c1++)
        {
            portall[c1].postMessage(e.data);
        }
    }
}