const lastOne = document.querySelector('.last-one')

const myObserver = new IntersectionObserver((t)=> {

        t.forEach((entry)=>{
                if(entry.isIntersecting){
                        entry.target.classList.add("show")
                }else {
                        entry.target.classList.remove("show")

                }
        })
})
const elements = document.querySelectorAll(".hidden")


elements.forEach((e)=>{
        myObserver.observe(e)
})
