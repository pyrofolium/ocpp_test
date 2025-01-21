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
const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

describe("simple test", () => {
    let centralSystemSimple: OcppServer
    // let expressServer: ApiServer
    let client: OcppClient
    const wsPort: number = 1337
    // const apiPort = 1340
    // let wsAgent: WSChain

    beforeAll(async () => {
        centralSystemSimple = new OcppServer();
        centralSystemSimple.listen(9220);
        centralSystemSimple.on('connection', (client: OcppClientConnection) => {
            console.log(`Client ${client.getCpId()} connected`);
            client.on('close', (code: number, reason: Buffer) => {
                console.log(`Client ${client.getCpId()} closed connection`, code, reason.toString());
            });

            client.on('BootNotification', (_: BootNotificationRequest, cb: (response: BootNotificationResponse) => void) => {
                const response: BootNotificationResponse = {
                    status: 'Accepted',
                    currentTime: new Date().toISOString(),
                    interval: 60,
                };
                cb(response);
            });
        });
        sleep(3000)
    })

    it("should work", async () => {
        const chargingPointSimple = new OcppClient('CP1111');
        chargingPointSimple.on('error', (err: Error) => {
            console.log(err.message);
        });
        chargingPointSimple.on('close', () => {
            console.log('Connection closed');
        });

        chargingPointSimple.on('connect', async () => {
            const boot: BootNotificationRequest = {
                chargePointVendor: 'eParking',
                chargePointModel: 'NECU-T2',
            };

            try {
                const bootResp: BootNotificationResponse = await chargingPointSimple.callRequest('BootNotification', boot);
                if (bootResp.status === 'Accepted') {
                    console.log('Bootnotification accepted');
                }
            } catch (e) {
                if (e instanceof Error || e instanceof OcppError) {
                    console.error(e.message);
                }
            }
        });
        chargingPointSimple.connect('ws://localhost:9220/');
    })

    afterAll(async () => {
        // await sleep(9999)
    })
})
