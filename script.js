window.addEventListener('load', function () {

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Canvas settings
    ctx.lineCap = 'round';
     ctx.shadowColor = 'rgba(5,5,5,5)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    //effect settings 

    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3; // opérateur ternaire pour le responsive de la fractale
    let maxLevel = 1;
    let branches = 3;
    let sides = 2;
    let scale = 0.85;
    let spread = -0.2;
   let color = colorPicker;
    let lineWidth =  Math.floor(Math.random() * 20 + 10)  ;


    //controles 
    const randomize = document.getElementById('randomize');
    const reset = document.getElementById('reset');

    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for="spread"]');

    const slider_sides = document.getElementById('sides');
    const label_sides = document.querySelector('[for="sides"]');

    const slider_maxLevel = document.getElementById('maxLevel');
    const label_maxLevel = document.querySelector('[for="maxLevel"]');

    const slider_branches = document.getElementById('branches');
    const label_branches = document.querySelector('[for="branches"]');

    const slider_colorPicker = document.getElementById('colorPicker');



    slider_spread.addEventListener('change', function(e){
        spread = e.target.value;
        updateSliders()
        drawFractal();
    })
    slider_sides.addEventListener('change', function(e){
        sides = e.target.value;
        updateSliders()
        drawFractal();
    })
    slider_maxLevel.addEventListener('change', function(e){
        maxLevel = e.target.value;
        updateSliders()
        drawFractal();
    })
    slider_branches.addEventListener('change', function(e){
        branches = e.target.value;
        console.log(e)
        updateSliders()
        drawFractal();
    })
    slider_colorPicker.addEventListener('change', function(e){
        color = hexToHSL(e.target.value);
        colorPicker = color;
        updateSliders()
        drawFractal();
    })

    function hexToHSL(H) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
          r = "0x" + H[1] + H[1];
          g = "0x" + H[2] + H[2];
          b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
          r = "0x" + H[1] + H[2];
          g = "0x" + H[3] + H[4];
          b = "0x" + H[5] + H[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
      
        if (delta == 0)
          h = 0;
        else if (cmax == r)
          h = ((g - b) / delta) % 6;
        else if (cmax == g)
          h = (b - r) / delta + 2;
        else
          h = (r - g) / delta + 4;
      
        h = Math.round(h * 60);
      
        if (h < 0)
          h += 360;
      
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
      
        return "hsl(" + h + "," + s + "%," + l + "%)";
      }

    function drawBranch(level) {
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size , 0 );
        ctx.stroke();


        for (let i = 0; i < branches; i++) {
            ctx.save()
            
            ctx.translate(size - (size / branches) * i, 0);
            ctx.scale(scale, scale);

            ctx.save()
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();

          ctx.save()
          ctx.rotate(-spread);
          drawBranch(level + 1);
          ctx.restore();
            ctx.restore();



        }
        ctx.beginPath();
        ctx.arc(0,size,size * 0.1 ,0, Math.PI * 2);
        ctx.fill();

    }



    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(1, 1);
        ctx.rotate(0);
        for (let i = 0; i < sides; i++) {
            ctx.rotate((Math.PI * 2) / sides);
            drawBranch(0);
   
        }
        ctx.restore();

    }


    function randomizeFractal() {
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.3 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        branches = Math.floor(Math.random() * 3 + 1);
        color = 'hsl(' + Math.random() * 360 + '0,100%,50%)';
        lineWidth =  Math.floor(Math.random() * 20 + 1)  ;
        maxLevel =  Math.floor(Math.random() * 4 + 1)  ;

0,
        drawFractal();


    }

    function resetFractal(){
        sides = 5;
        scale = 0.4;
        spread = 0.7;
        color = 'hsl( 100 ,100% ,50%)';
        lineWidth =  5  ;
        maxLevel = 3  ;
        branches = 1;
        console.log(colorPicker)

    }

    randomize.addEventListener('click', function(){
        updateSliders()
        randomizeFractal();
        drawFractal();

    });
    reset.addEventListener('click', function(){
        resetFractal();
        updateSliders();
        drawFractal();

    });
    
    function updateSliders(){
        slider_spread.value = spread;
        label_spread.innerText = 'Spread: ' + Number(spread).toFixed(1) ;

        slider_sides.value = sides;
        label_sides.innerText = 'Sides: ' + sides ;



        slider_maxLevel.value = maxLevel;
        label_maxLevel.innerText = 'maxLevel: ' + maxLevel ;

        slider_branches.value = branches;
        label_branches.innerText = 'branches: ' + branches ;

        slider_colorPicker.value = 'hsl(' + colorPicker + ',' + '100%,50%)';


  }

  window.addEventListener('resize', function () { // pour rendre le canvas responsive
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
     size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1; // opérateur ternaire pour le responsive de la fractale
     ctx.shadowColor = 'rgba(5,5,5,5)';
     ctx.shadowOffsetX = 10;
     ctx.shadowOffsetY = 5;
     ctx.shadowBlur = 10;
    drawFractal();
});



});







