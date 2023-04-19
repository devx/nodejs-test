# nodejs-test

Testing Nodejs express + winston + openTelemetry + logz.io

This is a simple test not meant for anything other than understanding how everything is put together.

Run this by doing the following:

```
$ node index.js                                                                                                                                              2m 23s ⬢ 19.8.1 ⎈ victor-palma@logz-io-o11y-2-workshop.us-east-2.eksctl.io  logz-se
Server Listening on port http://localhost:4000

```

example output:

```
{"level":"info","message":"HTTP GET / 304 0ms","meta":{"req":{"headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9","cache-control":"max-age=0","connection":"keep-alive","dnt":"1","host":"localhost:4000","if-none-match":"W/\"28-s3zLIZdBgIQ+NBxtS/gOHBi/z/8\"","sec-ch-ua":"\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"","sec-ch-ua-mobile":"?0","sec-ch-ua-platform":"\"macOS\"","sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"none","sec-fetch-user":"?1","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"},"httpVersion":"1.1","method":"GET","originalUrl":"/","query":{},"url":"/"},"res":{"statusCode":304},"responseTime":0},"resource.service.name":"api-service","span_id":"3b3f4b352cd1adfb","trace_flags":"01","trace_id":"2737a6618f3fe509bac39825dcd94fd2"}

```

you can test the service by doing a curl like the following:

```
$ curl http://localhost:4000
```
