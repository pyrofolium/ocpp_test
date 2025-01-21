/**
 * @jest-environment node
 */
import {
    BootNotificationRequest,
    BootNotificationResponse,
    OcppClient,
    OcppClientConnection,
    OcppError,
    OcppServer
} from "ocpp-ts"
import {createServer} from "./server";
import {createClient} from "./client";
const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

describe("simple test", () => {
    let centralSystemSimple: OcppServer
    // let expressServer: ApiServer
    let client: OcppClient
    const wsPort: number = 9220
    // const apiPort = 1340
    // let wsAgent: WSChain

    beforeAll(async () => {
        centralSystemSimple = createServer(wsPort)
    })

    it("should work", async () => {
        createClient(wsPort)
    })

    afterAll(async () => {
        // await sleep(9999)
    })
})
