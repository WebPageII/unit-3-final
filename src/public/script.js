// imige colors


document.getElementById('imageForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];
    const boxnum = document.getElementById('boxnumber').value;
  
    formData.append('image1', image1);
    formData.append('image2', image2);
  
    try {

      // get dimentions of smallest imiage
      const image1Dimentions = await getDimentions(image1);
      const image2Dimentions = await getDimentions(image2);

      // decide witch one is smaller
      if(image1Dimentions.width + image1Dimentions.height < image2Dimentions.width + image2Dimentions.height){
        console.log('Image 1 is smaller');
        console.log('Imige 1: ', image1Dimentions);
        const slmallest = {width: image1Dimentions.width, height: image1Dimentions.height};

        var display1 = document.getElementById('display1');
        display1.style.height = slmallest.height + 'px';
        display1.style.width = slmallest.width + 'px';
        var display2 = document.getElementById('display2');
        display2.style.height = slmallest.height + 'px';
        display2.style.width = slmallest.width + 'px';

        createGrid(boxnum, slmallest.width, slmallest.height, 1, display1);
        createGrid(boxnum, slmallest.width, slmallest.height, 2, display2);

      } else {
        console.log('Image 2 is smaller');
        console.log('Imige 2: ', image2Dimentions);
        const slmallest = {width: image2Dimentions.width, height: image2Dimentions.height};

        var display1 = document.getElementById('display1');
        display1.style.height = slmallest.height + 'px';
        display1.style.width = slmallest.width + 'px';
        var display2 = document.getElementById('display2');
        display2.style.height = slmallest.height + 'px';
        display2.style.width = slmallest.width + 'px';

        createGrid(boxnum, slmallest.width, slmallest.height, 1, display1);
        createGrid(boxnum, slmallest.width, slmallest.height, 2, display2);

      }

    } finally {}
    
  });


  // render into grid!!

  async function createGrid(boxnum, gridSizeW, gridSizeH, the, imige) {
    if(the === 1){
      var container = await document.getElementById('gridContainer1');
      container.innerHTML = await ''; // Clear previous grid

      // size box proporly
      container.style.transform = await `translatey(-${gridSizeH}px)`;
      container.style.width = await gridSizeW + 'px';
      container.style.height = await gridSizeH + 'px';
  
    } else if(the === 2){
      var container = await document.getElementById('gridContainer2');
      container.innerHTML = await ''; // Clear previous grid

      // size box proporly
      container.style.transform = await `translatey(-${gridSizeH}px)`;
      container.style.width = await gridSizeW + 'px';
      container.style.height = await gridSizeH + 'px';

    }

    const boxSize = await gridSizeH / boxnum; // Calculate box size based on grid size and smallest dimension

    await console.log(boxSize);

    var hexCodes = [];
    for (let i = 0; i < 200; i++) {
      const hexCode = await '#' + Math.floor(Math.random() * 16777215).toString(16);
      await hexCodes.push(hexCode);
    }


    for (let i = 0; i < boxnum; i++) {
     
        if(i >= 1){
        
        }
  
        for (let j = 0; j < boxnum; j++) {

            var rgbb = await getAverageColor(imige, gridSizeW / boxnum * j, gridSizeH / boxnum * i, boxSize, boxSize);
            const box = await document.createElement('div');
            box.style.position = await '  ';
            box.style.top = await `${gridSizeH / i}px`;
            box.style.left = await `${gridSizeW / j}px`;
            box.style.marginLeft = await '0%';
            box.style.width = await `${boxSize}px`;
            box.style.height = await `${boxSize}px`;
            box.style.opacity = await '100%';
            box.style.backgroundColor = `rgb(${rgbb.r}, ${rgbb.g}, ${rgbb.b})`;
            box.style.float = await 'left';
            await container.appendChild(box);

        }

    }

  }



function getDimentions(image){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(image);
  });
}

function previwImage(selector) {

  if(selector === 1){
    const image1 = document.getElementById('image1').files[0];
    var display1 = document.getElementById('display1');
    display1.src = URL.createObjectURL(image1);

  } else if (selector === 2){
    const image2 = document.getElementById('image2').files[0];
    var display2 = document.getElementById('display2');
    display2.src = URL.createObjectURL(image2);
  }
}

  
// get avrage
function getAverageColor(image, x, y, height, width) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, x, y, width, height, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height).data;

    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
    let totalPixels = 0;

    
      const red = imageData[0];
      const green = imageData[1];
      const blue = imageData[2];

      totalRed += red;
      totalGreen += green;
      totalBlue += blue;
      totalPixels++;


    const averageRed = Math.round(totalRed / totalPixels);
    const averageGreen = Math.round(totalGreen / totalPixels);
    const averageBlue = Math.round(totalBlue / totalPixels);


    console.log(`X: ${x}, Y: ${y} imige Data: ${imageData}`);
    console.log(`rgb(${averageRed}, ${averageGreen}, ${averageBlue})`);
    resolve({
      r: totalRed,
      g: totalGreen,
      b: totalBlue,
    });
  });
}