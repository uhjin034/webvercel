document.getElementById("scanBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const llmSummary = document.getElementById("llmSummary");
  const jsonResult = document.getElementById("jsonResult");

  if (!file) {
    alert("파일을 선택하세요!");
    return;
  }

  document.getElementById("fileName").textContent = file.name;
  llmSummary.value = "🔄 파일을 분석 중입니다...";
  jsonResult.value = "";

  const formData = new FormData();
  formData.append("file", file);

  try {
    // FastAPI 백엔드 엔드포인트로 업로드
    const response = await fetch("/scan/ms", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const result = await response.json();

    // JSON 결과를 보기 좋게 표시
    jsonResult.value = JSON.stringify(result.analysis, null, 2);

    // LLM 요약 출력
    if (result.llm_summary) {
      llmSummary.value = result.llm_summary;
    } else {
      llmSummary.value = "⚠️ LLM 요약 생성 실패";
    }

  } catch (err) {
    llmSummary.value = `❌ 분석 실패: ${err.message}`;
  }
});
