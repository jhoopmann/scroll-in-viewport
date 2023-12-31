import type {DirectiveBinding, ObjectDirective} from "vue";

type ElementType = HTMLElement & { elementScrollPositionListener?: (event: Event) => void };

enum ScrollInViewportEventType {
    InView = 'scroll-in-viewport-in-view',
    OutOfView = 'scroll-in-viewport-out-of-view'
}

export interface ScrollInViewportEvent extends Event {
    type: ScrollInViewportEventType
}

export default <ObjectDirective<ElementType>>{
    mounted(el: ElementType): void {
        if (el.elementScrollPositionListener !== undefined) {
            return;
        }

        el.elementScrollPositionListener = (): void => {
            const rect: DOMRect = el.getBoundingClientRect();
            const position: number = rect.top + rect.height / 2;

            const eventType: ScrollInViewportEventType = position < window.innerHeight && position > 0 ?
                ScrollInViewportEventType.InView :
                ScrollInViewportEventType.OutOfView;

            el.dispatchEvent(new CustomEvent<ScrollInViewportEvent>(eventType));
        };

        document.addEventListener('scroll', el.elementScrollPositionListener);
        window.addEventListener('load', el.elementScrollPositionListener);
    },
    unmounted(el: ElementType): void {
        if (el.elementScrollPositionListener === undefined) {
            return;
        }

        document.removeEventListener('scroll', el.elementScrollPositionListener);
        window.removeEventListener('load', el.elementScrollPositionListener);

        delete el.elementScrollPositionListener;
    }
};
