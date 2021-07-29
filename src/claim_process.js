"use strict";

const { Client, logging, Variables } = require("camunda-external-task-client-js");

const caumdaConfig = { baseUrl: "http://localhost:8077" + "/engine-rest", use: logging };
const client = new Client(caumdaConfig);
console.log("Starting claim process workflow");

client.subscribe("ASSIGN_TO_CLAIM", async function ({ task, taskService }) {
    console.log("ASSIGN_TO_CLAIM started from workflow");
    console.log(">>STEP: Assign incident team, surveyor, adjustor");
    await taskService.extendLock(task, 150000);
    var processVariables = new Variables();
    await taskService.complete(task, processVariables);
});

client.subscribe("NOTIFY_AMOUNT_APPROVED", async function ({ task, taskService }) {
    console.log("NOTIFY_AMOUNT_APPROVED started from workflow");
    console.log(">>STEP: Customer AND workshop notified with approved amount");
    await taskService.extendLock(task, 150000);
    var processVariables = new Variables();
    await taskService.complete(task, processVariables);
});

client.subscribe("NOTIFY_PAYMENT_DETAILS", async function ({ task, taskService }) {
    console.log("NOTIFY_PAYMENT_DETAILS started from workflow");
    console.log(">>STEP: User notified with payment details and payment link");
    await taskService.extendLock(task, 150000);
    var processVariables = new Variables();
    await taskService.complete(task, processVariables);
});

client.subscribe("CLAIM_REJECTED", async function ({ task, taskService }) {
    console.log("CLAIM_REJECTED started from workflow");
    console.log(">>STEP: Claim rejected, user informed");
    await taskService.extendLock(task, 150000);
    var processVariables = new Variables();
    await taskService.complete(task, processVariables);
});

client.subscribe("CUSTOMER_PAYMENT_RETRY", async function ({ task, taskService }) {
    console.log("CUSTOMER_PAYMENT_RETRY started from workflow");
    console.log(">>STEP: Payment failed, notify user and retry");
    await taskService.extendLock(task, 150000);
    var processVariables = new Variables();
    await taskService.complete(task, processVariables);
});

client.subscribe("CLAIM_SUCCESS", async function ({ task, taskService }) {
    console.log("CLAIM_SUCCESS started from workflow");
    console.log(">>STEP: CLAIM SUCCESS");
    await taskService.extendLock(task, 150000);
    var processVariables = new Variables();
    // processVariables.set("ownership_transfer_semati_completed", true);
    await taskService.complete(task, processVariables);
});
