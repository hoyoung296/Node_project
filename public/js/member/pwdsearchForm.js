// 폼 제출 시 action URL을 동적으로 업데이트
function updateActionUrl(event) {
    // 폼의 id 값을 가져와서 URL에 추가
    const idValue = document.getElementById('id').value;
    const form = event.target;
    form.action = `/member/pwdsearch_checkform?uid=${idValue}`;
}