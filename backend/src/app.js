import express from "express";
import cors from "cors";
import { KakaoClient } from "./kakao.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/login", async (req, res, next) => {
  console.log("/login start");
  try {
    const { code } = req.body;

    const { access_token } = await KakaoClient.getToken(code); // 토큰 받아오기
    const userData = await KakaoClient.getUserData(access_token); // 유저 정보 받아오기

    // 그 후 DB로 사용자 등록 처리
    // 세션 or 토큰 처리
    // 등등 로그인 관련 처리를 해줘야 함

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);

    const errorData = {
      message: "Internal server error.. :(",
    };
    res.status(500).json(errorData);
  }

  console.log("/login finish");
});

app.get("/kakao/url", (req, res, next) => {
  console.log("/kakao/url start");

  const url = KakaoClient.getAuthCodeURL();

  res.status(200).json({
    url,
  });
  
  console.log("/kakao/url finish");
});

export default app;