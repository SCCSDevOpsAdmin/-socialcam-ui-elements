import { EventBus } from 'src/utils/Utils';

type OverlayServiceActionType = 'overlay-click' | 'confirm-dialog';

interface OverlayServiceParams {
    originalEvent: React.SyntheticEvent;
    target: HTMLElement;
}

export interface OverlayServiceOptions {
    on(action: OverlayServiceActionType, fn: any): void;
    emit(action: OverlayServiceActionType, params?: OverlayServiceParams): void;
    off(action: OverlayServiceActionType, fn: any): void;
}

export const OverlayService: OverlayServiceOptions = EventBus();
