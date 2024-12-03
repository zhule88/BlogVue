export default {
  mounted(el: HTMLElement) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };
    el.style.transition = 'all 0.7s ease-out';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
       if (entry.isIntersecting) {
        el.style.transform='scale(1) '
        el.style.opacity = '1';
        } else {
           el.style.transform='scale(0) '
           el.style.opacity = '0';
        }
      });
    }, options);

    observer.observe(el);


    onUnmounted(() => {
      observer.unobserve(el);
    });
  },
};


