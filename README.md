# Vue 3 Directive ScrollInViewPort

Directive for detecting elements visibility in viewport while scrolling and onload.

scroll.in.viewport.ts => via getClientBoundingRect
scroll.in.viewport.intersection-observer.ts => via IntersectionObserver


### Usage

Register in your application startup as directive, usable via "v-scroll-in-viewport"

Emits following events:

```
InView = 'scroll-in-viewport-in-view', 
OutOfView = 'scroll-in-viewport-out-of-view'
```
