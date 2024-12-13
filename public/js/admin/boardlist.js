function deleteBoard(no) {
    if (confirm('정말 삭제하시겠습니까?')) {
        fetch(`/admin/board_del/${no}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('게시글 삭제 성공');
                    window.location.href = "/admin/boardlist";  // 삭제 후 리스트로 이동
                } else {
                    alert('게시글 삭제 실패');
                }
            })
            .catch(error => {
                console.error('삭제 중 오류 발생:', error);
                alert('게시글 삭제 실패');
            });
    }
}