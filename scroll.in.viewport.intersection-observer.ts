import type {ObjectDirective} from "vue";

type ElementType = HTMLElement & { intersectionObserver?: IntersectionObserver };

enum ScrollInViewportEventType {
    InView = 'scroll-in-viewport-in-view',
    OutOfView = 'scroll-in-viewport-out-of-view'
}

export interface ScrollInViewportEvent extends Event {
    type: ScrollInViewportEventType,
    target: ElementType
}

export default <ObjectDirective<ElementType>>{
    mounted(el: ElementType): void {
        if (el.intersectionObserver !== undefined) {
            return;
        }

        el.intersectionObserver = new IntersectionObserver(
            (event: IntersectionObserverEntry[]) => {
                const eventType: ScrollInViewportEventType = event[0].isIntersecting ?
                    ScrollInViewportEventType.InView :
                    ScrollInViewportEventType.OutOfView;

                el.dispatchEvent(new CustomEvent<ScrollInViewportEvent>(eventType));
            }
        );
        el.intersectionObserver.observe(el);
    },
    unmounted(el: ElementType): void {
        if (el.intersectionObserver === undefined) {
            return;
        }

        el.intersectionObserver.disconnect();
        delete el.intersectionObserver;
    }
};
