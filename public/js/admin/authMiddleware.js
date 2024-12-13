// middleware/authMiddleware.js
module.exports = (req, res, next) => {
    const allowedUid = "admin";  // 허용된 ID (예: 관리자만 접근 가능)
  
    // 요청 URL의 파라미터에서 ID 가져오기
    const uid  = req.session.uid; // 또는 req.query.uid, req.body.uid 등을 사용할 수 있습니다.
    console.log(uid)
  
    // ID가 일치하면 다음 미들웨어나 컨트롤러로 이동
    if (uid !== allowedUid) {
        return res.redirect("/");
    } else {
      // 권한이 없으면 403 Forbidden 상태 코드 반환
      return next();
    }
  };
  