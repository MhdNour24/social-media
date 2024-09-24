import { useState, useEffect } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { BASE_URL } from "../../utils/constant";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // 1. استخدم useState لتخزين حالة الصورة الحالية
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. مصفوفة تحتوي على مسارات الصور
  const images = [
    `${BASE_URL}/assets/info1.jpeg`,
    `${BASE_URL}/assets/info2.jpeg`,
    `${BASE_URL}/assets/info3.jpeg`,
    `${BASE_URL}/assets/info4.jpeg`
  ];

  // 3. استخدم useEffect لتغيير الصورة كل ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // كل ثانية

    return () => clearInterval(interval); // تنظيف الـ interval عند إلغاء تركيب العنصر
  }, [images.length]);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src={images[currentImageIndex]} // عرض الصورة الحالية بناءً على الفهرس
        alt="advert"
        width="240px"
        height="160px"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>MikaCosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
