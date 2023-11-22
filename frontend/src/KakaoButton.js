function KakaoButton() {
  /**
   * @description URL 가져오기
   */
  const fetchGetURL = async () => {
    try {
      const { url } = await (
        await fetch("http://localhost:3001/kakao/url")
      ).json();

      console.log(url); // 응답으로 온 url

      document.location.href = url;
    } catch (error) {
      alert("Function fetchGetURL error!");
      console.error(error);
    }
  };

  return (
    <button className="kakao" onClick={fetchGetURL}>
      카카오 로그인하기
    </button>
  );
}

export default KakaoButton;