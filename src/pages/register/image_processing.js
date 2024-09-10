// Image Processing

  function calc_image_size(image)
  {
      let y = 1
      if(image.endswith('=='))
      {
          y = 2
      }
      const x_size = (image.length * (3 / 4)) - y
      return Math.round(x_size / 1024)
  }

  async function comingImages(advertImage)
  {
      let oldImageSize = calc_image_size(advertImage)
      console.log({'oldImageSize': oldImageSize})

      let reducedSize = await reduceImageSize(advertImage)

      let newImageSize = calc_image_size(reducedSize)
      console.log({'newImageSize': newImageSize})
  }

  async function reduceImageSize(base64String, MAX_WIDTH = 450, MAX_HEIGHT = 450)
  {
      let reducedImage = await new Promise((resolve) => 
      {
          let img = new Image()
          img.src = base64String
          img.onload = () => 
          {
              let canvas = document.createElement('canvas')
              let width = img.width
              let height = img.height
              if(width > height)
              {
                  if(width > MAX_WIDTH)
                  {
                      height *= MAX_WIDTH / width
                      width = MAX_WIDTH
                  }
              } else {
                  if(height > MAX_HEIGHT)
                  {
                      width *= MAX_HEIGHT / height
                      height = MAX_HEIGHT
                  }
              }
              canvas.width = width
              canvas.height = height
              let workedImage = canvas.getContext('2d')
              workedImage.drawImage(img, 0, 0, width, height)
              resolve(canvas.toDataURL())
          }
      })
      return reducedImage
  }

  async function converImageToBase64(image)
  {
      let base64Image = await new Promise((resolve) => {
         let fileReader = new FileReader()
         fileReader.onload = (e) => resolve(fileReader.result)
         fileReader.onerror = (error) => {

         }
         fileReader.readAsDataURL(image)
      })
      return base64Image
  }

  function base64Size(base64Image) 
  {
      var length = base64Image.length;
      var buf = new ArrayBuffer(length);
      var arr = new Uint8Array(buf);
      for (var i = 0; i < length; i++) {
        arr[i] = base64Image.charCodeAt(i);
      }
      return buf;
  }