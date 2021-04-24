// 轮播图
class Slider{
    constructor(id){
        // 获取id= slider的容器的dom节点
        this.box = document.querySelector(id)
        this.picBox = this.box.querySelector("ul")
        console.log(this.picBox.style.left)
        this.indexBox = this.box.querySelector(".index-box")
        this.sliderWidth = this.box.clientWidth
        this.index = 1

        //防止轮播图刹不住车跑出去(flag)
        this.animated = false
        this.sliders = this.picBox.children.length

        this.init()
    }
    init(){



        this.initPoint()
        this.copyPic()
        this.leftRight()
    }

    // 初始化小圆点
    initPoint(){
        const  num = this.picBox.children.length;
        // 动态生成小圆点dom
        let frg = document.createDocumentFragment();
        for(let i = 0; i<num; i++){
            let li = document.createElement("li")
            li.setAttribute("data-index",i+1)
            if(i == 0) li.className = "active"

            frg.appendChild(li)
        }
        this.indexBox.children[0].style.width = num * 10 * 2 + "px"
        this.indexBox.children[0].appendChild(frg)
        // 定义小圆点上的方法


        this.indexBox.children[0].addEventListener ("click" , (e) => {
        // e.target获取到当前选中的小圆点dom节点 （target获取触发事件的元素）
            let pointIndex = (e.target).getAttribute("data-index")
            // 让小圆点绑定图片联动
            let offset = (pointIndex - this.index) * this.sliderWidth
            this.index = pointIndex
            this.move(offset)


        })
    }
    // 轮播图完美方案(辅助图)
    copyPic(){
        const first = this.picBox.firstElementChild.cloneNode(true)
        const last = this.picBox.lastElementChild.cloneNode(true)
        


        this.picBox.appendChild(first)
        this.picBox.insertBefore(last,this.picBox.firstElementChild)



    }
    move(offset){

        this.animate(offset)

        // 控制索引变化
        const num = this.indexBox.children[0].children.length
        for(let i = 0;i<num; i++){


            this.indexBox.children[0].children[i].className = ""
            
        }
            this.indexBox.children[0].children[this.index-1].className = "active"





    }
// 一点点移动的动画效果
    animate(offset){
        const time = 1000
        const rate = 200
        // 移动一次的位移
        let speed = offset / (time/rate)

        let goal  = parseFloat(this.picBox.style.left) - offset
        this.animated = true
        let animate = setInterval(() => {
            if( this.picBox.style.left == goal ||  Math.abs(Math.abs(parseFloat(this.picBox.style.left)) - Math.abs(goal)) < Math.abs(speed)){
                this.picBox.style.left == goal
                clearInterval(animate)
                this.animated = false
                // 位置复原形成闭环
                if(parseFloat(this.picBox.style.left) == 0){
                    this.picBox.style.left = -this.sliders * this.sliderWidth + "px"

                }else if(parseFloat(this.picBox.style.left) == -(this.sliders + 1) * this.sliderWidth){
                    // 移动到一号辅助图
                    this.picBox.style.left = -this.sliderWidth + "px"
                }

            }else{
                this.picBox.style.left = parseFloat(this.picBox.style.left) - speed + "px"
            }




            
        }, rate);





    }



    
    // 实现左右轮播切换
    leftRight(){
        this.box.querySelector(".left-box").addEventListener("click" , () => {
            if(this.animated){
                return
            }
            // 设置边界
            if(this.index - 1 < 1){
                this.index = this.sliders
            }else{
                this.index--
            }
            // 改变队列位置达到左右切换
            this.move(-this.sliderWidth)



        })

        this.box.querySelector(".right-box").addEventListener("click" , () => {
            if(this.animated){
                return
            }
            // 设置边界
            if(this.index + 1 > this.sliders){
                this.index = 1
            }else{
                this.index++
            }
            this.move(this.sliderWidth)
        })


    }

}