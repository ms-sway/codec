/**
 * Payload Decoder for Chirpstack and Milesight network server
 *
 * Copyright 2022 Milesight IoT
 *
 * @product WS301
 */
function Decode(fPort, bytes) {
    var decoded = {};

    for (var i = 0; i < bytes.length;) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];
        // BATTERY
        if (channel_id === 0x01 && channel_type === 0x75) {
            decoded.battery = bytes[i];
            i += 1;
        }
        // DOOR / WINDOW STATE (0: close 1: open)
        else if (channel_id === 0x03 && channel_type === 0x00) {
            decoded.opened = bytes[i];
            i += 1;
        }
        // INSTALL STATE (0: install 1: removed)
        else if (channel_id === 0x04 && channel_type === 0x00) {
            decoded.removed = bytes[i];
            i += 1;
        } else {
            break;
        }
    }

    return decoded;
}