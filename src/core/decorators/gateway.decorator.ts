import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";
import { TGateway } from "../utils/types";

export function SocketGateway(options: TGateway = {}): ClassDecorator {
  return setMetadata(
    METADATA_KEYS.socket_gateway_metadata_key,
    options
  ) as ClassDecorator;
}
