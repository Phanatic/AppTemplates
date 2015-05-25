var amqp = require('amqp')
  , shell = require('shelljs/global')
  , Logger = require('./sdk/logger');

var connection = amqp.createConnection({host: 'localhost'});

connection.on('ready', function(){
    connection.queue('task_queue',
          { autoDelete: false,
            durable: true},
    function(queue) {
        var logger = new Logger();
        logger.log(' [*] Waiting for messages. To exit press CTRL+C');
        queue.subscribe({ack: true, prefetchCount: 1}, function(msg) {
            var body = msg.data.toString('utf-8');
            logger.log(body);
            var result = exec('stackato target --json');
            logger.log(' stackato target is : ', result.status);
            // acknowledge that the message has been received.
            queue.shift();
        });
    });
});
