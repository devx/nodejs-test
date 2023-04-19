import { registerInstrumentations } from "@opentelemetry/instrumentation";
import {
  ConsoleSpanExporter,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { WinstonInstrumentation } from "@opentelemetry/instrumentation-winston";

const memoryExporter = new InMemorySpanExporter();
const provider = new NodeTracerProvider();
provider.register();
const tracer = provider.getTracer("default");
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
registerInstrumentations({
  instrumentations: [
    new WinstonInstrumentation({
      enabled: true,
      logHook: (_span, record) => {
        record["resource.service.name"] = "test-service";
      },
    }),
  ],
});

import * as winston from "winston";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

function main() {
  tracer.startActiveSpan("main", (span) => {
    logger.info("Started the span, printing context");
    logger.info(span.spanContext());
    logger.info("In main main spanning");
  });
  logger.info("Ended span in main");
}

main();
