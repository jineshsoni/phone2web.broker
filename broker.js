var mosca = require('mosca');
var mqtt = require('mqtt');
var ip = require("ip");
var mqtt = require('mqtt');

var settings = {
	port:1883
}

var server = new mosca.Server(settings);

server.on('ready', function(){
    console.log("Broker running on port: 1883 & ip: " + ip.address());
    var client  = mqtt.connect('mqtt://'+ip.address())

    client.on('connect', function () {
        client.subscribe('isLive')
        console.log("Subscribed to isLive")
        client.publish('isLive', "MQTT is live");
    })

    client.on('message', function (topic, message) {
        context = message.toString();
        console.log("News message on topic: "+ topic)
        console.log("message: "+ context)
    })
    
});



