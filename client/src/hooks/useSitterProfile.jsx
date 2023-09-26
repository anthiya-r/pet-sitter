import React from "react";
import { useSitter } from "../contexts/sitterContext";
import axios from "axios";
import { json, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function useSitterProfile() {
  const param = useParams();
  const { setAlertMessage, setUserData } = useAuth();
  const {
    avatarUrl,
    setAvatarUrl,
    avatarFile,
    setAvatarFile,
    imageGalleryUrls,
    setImageGalleryUrls,
    imageGalleryFile,
    setImageGalleryFile,
    setSitterData,
  } = useSitter();

  const sitterImageUrlsManage = (selectFile) => {
    const imgUrl = selectFile.map((item) => {
      return URL.createObjectURL(item);
    });
    const newImageGalleryUrls = [...imageGalleryUrls];

    for (let item of imgUrl) {
      newImageGalleryUrls.length < 10 ? newImageGalleryUrls.push(item) : null;
    }
    if (imageGalleryUrls.length < 10) {
      setImageGalleryUrls(newImageGalleryUrls);
    }
  };

  const sitterImageFileManage = (selectFile) => {
    const newImageGalleryFile = [...imageGalleryFile];
    for (let item of selectFile) {
      newImageGalleryFile.length < 10 ? newImageGalleryFile.push(item) : null;
    }
    if (imageGalleryFile.length < 10) {
      setImageGalleryFile(newImageGalleryFile);
    }
  };

  const sitterImageArrayManage = (indexParam) => {
    const newImageGalleryFile = imageGalleryFile.filter((item, index) => {
      return item !== imageGalleryFile[indexParam];
    });
    setImageGalleryFile(newImageGalleryFile);

    const newImageGalleryUrls = imageGalleryUrls.filter((item, index) => {
      return item[index] !== item[indexParam];
    });
    setImageGalleryUrls(newImageGalleryUrls);
  };

  const getSitterData = async () => {};

  const createSitterProfile = async (data) => {
    try {
      const serverRespondes = await axios.post(
        "/sitterManagement",
        data,
        data.avatarFile
          ? {
              headers: { "Content-Type": "multipart/form-data" },
            }
          : null
      );
      if (
        serverRespondes.data.message ===
        "Sitter Profile has been created successfully"
      ) {
        setUserData(serverRespondes.data.userData);
        setSitterData(serverRespondes.data.sitterData);
        localStorage.setItem(
          "user",
          JSON.stringify(serverRespondes.data.userData)
        );
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "success",
        });
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
        }, 4000);
      } else {
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      setAlertMessage({
        message: "Error is occurred from client",
        severity: "error",
      });
    }
  };

  const updateSitterProfile = async (data) => {
    let result;
    try {
      const serverRespondes = await axios.put(
        `/sitterManagement/${param.sitterId}`,
        data,
        data.avatarFile || data.imageGalleryFile
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : null
      );
      if (
        serverRespondes.data.message ===
        "Sitter Profile has been updated successfully"
      ) {
        result = serverRespondes.data.data;
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "success",
        });
        setTimeout(() => {
          setAlertMessage({
            message: "",
            severity: "",
          });
        }, 4000);
      } else {
        setAlertMessage({
          message: serverRespondes.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      setAlertMessage({
        message: "Error is occurred from client",
        severity: "error",
      });
    }
  };

  // await supabase.storage.from("avatars").remove([tradeImageName]);
  return {
    sitterImageUrlsManage,
    sitterImageFileManage,
    sitterImageArrayManage,
    createSitterProfile,
    updateSitterProfile,
    getSitterData,
  };
}

export default useSitterProfile;
