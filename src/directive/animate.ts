export default {
  mounted(el: HTMLElement, vnode:any) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };
    el.style.transition = 'all 0.7s ease-out';
    let original = '';
    nextTick(()=>{
      original = window.getComputedStyle(el).transform;
      console.log(original)
      console.log(el)
    })
/*     setTimeout(() => {
      original = window.getComputedStyle(el).transform;
      console.log(original)

    }, 5000); */


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
       /* if (entry.isIntersecting) {
        el.style.transform='scale(1)'
        el.style.opacity = '1';
        } else {
           el.style.transform='scale(0)'
           el.style.opacity = '0';
        } */
       /*  if(original != '' ){
         setTimeout(() => {
          el.style.transform=original;
        }, 700);
      } */
      });
    }, options);

    observer.observe(el);


    onUnmounted(() => {
      observer.unobserve(el);
    });
  },
};


