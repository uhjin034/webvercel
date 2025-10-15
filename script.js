document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  document.getElementById('fileName').textContent = file ? file.name : '선택된 파일 없음';
});

document.getElementById('scanBtn').addEventListener('click', function() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
    alert('파일을 선택하세요!');
    return;
  }

  // 예시로 로컬에서 가짜 분석 데이터를 표시 (실제 백엔드 연결 시 fetch로 대체 가능)
  document.getElementById('llmSummary').value = 
`## 문서 악성코드 분석 보고서
**파일:** ${file.name}
**판정:** 의심(Suspicious)

---
### 실행 요약
이 문서는 열릴 시 자동 실행되는 매크로(AutoOpen)를 포함하고 있으며, 외부 명령어를 실행할 수 있는 키워드(Shell)가 탐지되었습니다.

### 권고 조치
1. 샌드박스 환경에서 분석 후 삭제 권장
2. 외부 명령 실행 방지 설정을 활성화하십시오.`;

  document.getElementById('jsonResult').value = JSON.stringify({
    file: file.name,
    result: "Suspicious",
    reason: ["AutoOpen macro detected", "Shell command keyword found"]
  }, null, 2);
});
