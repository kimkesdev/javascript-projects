.max-height{
 min-height: 100vh;
 background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)) ,url('../img/background.jpg')center/cover no-repeat fixed;
}
.title-heading{
 color:rgb(95, 152, 206);
}
.title-subheading{
 color: white;
}
.customer-card{
 background: transparent!important;
 color:white;
 border:0.05rem solid white;
 padding-bottom: 1rem;
 padding-left: 1rem;
 padding-right: 1rem;
 position: relative;
}
.img-card{
 border-radius: 50%;
 margin-bottom: 1rem;
 margin-top: -3rem;
}
.star-icon{
 color: rgb(95, 152, 206);
}
.quote-icon{
 font-size: 2rem;
 color: rgb(95, 152, 206);
}
.prevBtn,.nextBtn{
 font-size: 1.5rem;
 padding: 0.1rem;
 color:rgb(95, 152, 206);
 border:0.1rem solid rgb(95, 152, 206);
 display: inline-block;
 position: absolute;
 padding: 0.4rem;
 border-radius: 50%;
 transition: all 1s ease-in-out;
}
.prevBtn:hover{
background: rgb(95, 152, 206);
color: white;

}
.nextBtn:hover{
background: rgb(95, 152, 206);
color: white;

}
.prevBtn{
 top: 50%;
 left: 0;
 transform: translate(-120%,-50%);
}
.nextBtn{
 top: 50%;
 right: 0;
 transform: translate(120%,-50%);
}