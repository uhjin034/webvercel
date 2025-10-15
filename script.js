document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  document.getElementById('fileName').textContent = file ? file.name : '선택된 파일 없음';
});

document.getElementById('scanBtn').addEventListener('click', async function() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
    alert('파일을 선택하세요!');
    return;
  }

  const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
  const jsonUrl = `./security_oletools/${fileNameWithoutExt}.json`;

  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error('분석 결과 파일을 찾을 수 없습니다.');
    }

    const data = await response.json();

    // LLM 요약 표시
    document.getElementById('llmSummary').value = 
`## 문서 악성코드 분석 보고서
**파일:** ${file.name}
**판정:** ${data.result}

---
### 실행 요약
${data.summary || '요약 정보 없음'}

### 권고 조치
${(data.recommendations || []).map((r, i) => `${i+1}. ${r}`).join('\n')}`;

    // 원본 JSON 표시
    document.getElementById('jsonResult').value = JSON.stringify(data, null, 2);

  } catch (error) {
    document.getElementById('llmSummary').value = `❌ 분석 결과를 불러올 수 없습니다.\n(${error.message})`;
    document.getElementById('jsonResult').value = '';
  }
});
