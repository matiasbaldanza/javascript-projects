export function applyAnimation(element, animationClass, timeout) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass)
     }, timeout );
};