import {BootNotificationRequest, BootNotificationResponse, OcppClient, OcppError} from "ocpp-ts";

export function createClient(port: number) {
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
    chargingPointSimple.connect(`ws://localhost:${port}/`);
    return chargingPointSimple;
}

if (require.main === module) {
    createClient(9220);
}
