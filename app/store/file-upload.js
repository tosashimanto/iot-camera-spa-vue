import axios from 'axios'

export const state = () => ({})


export const getters = {}

export const mutations = {}

export const actions = {

  async uploadImage({commit}, uploadInfo) {

    // var imageFileList = []
    // imageFileList.push(file)

    // const data = {
    //   imageFileList : imageFileList
    // }
    // const uploadPromises = [];
    // imageFileList.forEach(core => {
    //   uploadPromises.push(dispatch('http/uploadImage', {
    //     uploadUrl: file.upload_url,
    //     imageFile: file.file
    //   }, {root: true}));
    // });

    var imageFile = uploadInfo.imageFileList[0]
    console.log("imageFile.name=", imageFile.name)
    const options = {
      headers: {
        'content-type': 'image/jpeg'
      }
    };
    var uploadUrl = 'http://localhost:8080/iot_camera/v1/upload/100'
    await axios.put(uploadUrl, imageFile, options)
      .then(function (response) {
        const japan = response.data
      });
  }
}
