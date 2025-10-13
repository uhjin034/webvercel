document.getElementById("checkBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const resultDiv = document.getElementById("result");

  if (!fileInput.files.length) {
    resultDiv.textContent = "파일을 선택해주세요.";
    resultDiv.style.color = "red";
    return;
  }

  const file = fileInput.files[0];
  
  // 여기서 실제 악성 검사 API 호출 가능
  // 임시 더미 결과
  const isMalware = Math.random() < 0.5; // 랜덤 true/false

  if (isMalware) {
    resultDiv.textContent = `${file.name} 은/는 악성파일일 가능성이 있습니다!`;
    resultDiv.style.color = "red";
  } else {
    resultDiv.textContent = `${file.name} 은/는 안전한 파일입니다.`;
    resultDiv.style.color = "green";
  }
});
