const imgUploaderForm = document.getElementById("imgUploaderForm");
const fileImg = document.getElementById("fileImg");

imgUploaderForm.onsubmit = function (e) {
  e.preventDefault();
  //   let imgUrl = imgUploadImgur(fileImg.files[0]);
  uploadAndShowingImage();
};

/************ This My Client ID ********************/
//const imgurClientId = "91c782febef5d38";
const imgurClientId = "7b042d2014a5d60";
/********** Uploading Image to Imgur  ********************/
export async function imgUploadImgur(imgFile) {
  if (imgFile) {
    let formData = new FormData();
    formData.append("image", imgFile);
    try {
      let response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        //headers: { Authorization: `Client-ID ${imgurClientId}` },
        headers: { Authorization: "Client-ID" },
        body: formData,
      });
      let data = await response.json();
      let imgUrl = data.data.link;
      console.log(imgUrl);
      return imgUrl;
    } catch (error) {
      console.error("Error uploading image to Imgur:", error);
    }
  } else {
    console.error("Error While Getting Image From User");
  }
}

/********** Showing Image in the page *****************/
async function uploadAndShowingImage() {
  //   let imgId = "1Pz45Py";
  //   let imgId = await imgUploadImgur(fileImg.files[0]);
  //   let imgId = "kXkBpbP";
  let imgId = "cvWgXFc";
  console.log(imgId);
  try {
    let response = await fetch(`https://api.imgur.com/3/image/${imgId}`, {
      method: "GET",
      headers: { Authorization: `Client-ID ${imgurClientId}` },
    });
    let data = await response.json();
    console.log(data);
    let imgUrl = data.data.link;
    console.log(imgUrl);
    console.log("Fetched Image URL:", imgUrl);

    // Verify if the URL is accessible
    let img = document.createElement("img");
    img.src = imgUrl;
    img.onload = () => {
      document.body.appendChild(img);
      console.log("Image successfully loaded and displayed.");
    };
    img.onerror = (e) => {
      console.error("Failed to load image. Please check the URL.", e);
    };
  } catch (error) {
    console.error("Error fetching image from Imgur:", error);
  }

  //   console.log(imgUrl);

  //   let img = document.createElement("img");
  //   img.src = imgUrl;
  //   document.body.appendChild(img);
}
