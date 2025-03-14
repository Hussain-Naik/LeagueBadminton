import axios from "axios";

const axiosAPI = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbxbeNEAokBC6j2mtLnMPYVqEpWWB1DNo8GVQ-oKpUky-5exfBX_cDaLHWQsEhf5AtIzIQ/exec"
});

const axiosReq = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbxt9zQrVdNFPy0A7WEX56TfQnLppfMnQvOFDpy_KpYkMVTGsQyR2eT76a7Ddh1f6p1fNw/exec"
});

export {
    axiosAPI,
    axiosReq
  };
