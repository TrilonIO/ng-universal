import { HttpRequest } from '@angular/common/http';

export interface TransferStateOptions {
  cacheKeyTransformer?: (key: string) => string;
  cachePOSTFilter?: (req: HttpRequest<any>, storeKey: string) => boolean;
}
