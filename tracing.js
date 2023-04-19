const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const {
  WinstonInstrumentation,
} = require("@opentelemetry/instrumentation-winston");
const { trace } = require("@opentelemetry/api");
//instrumentations
const {
  ExpressInstrumentation,
} = require("opentelemetry-instrumentation-express");
const {
  MongoDBInstrumentation,
} = require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");

//Exporter
module.exports = (serviceName) => {
  //  const exporter = new ConsoleSpanExporter();
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });
  //  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  provider.register();
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new MongoDBInstrumentation(),
      new WinstonInstrumentation({
        logHook: (span, record) => {
          record["resource.service.name"] =
            provider.resource.attributes["service.name"];
        },
      }),
    ],
    tracerProvider: provider,
  });
  return trace.getTracer(serviceName);
};
