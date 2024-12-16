function deleteMember(id) {
    if (confirm('정말 탈퇴하시겠습니까?')) {
        fetch(`/admin/member_del/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('회원 삭제 성공');
                    window.location.href = "/admin/memberlist2";  // 삭제 후 리스트로 이동
                } else {
                    alert('회원 삭제 실패');
                }
            })
            .catch(error => {
                console.error('삭제 중 오류 발생:', error);
                alert('회원 삭제 실패');
            });
    }
}