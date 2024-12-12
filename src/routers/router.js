const ctrl = require("../controller/controller")

module.exports = (app) => {
    // 모든 요청에서 session.uid 값을 res.locals.id에 설정
    app.use((req, res, next) => {
        res.locals.username = req.session.name || null;  // session에서 이름 가져오기
        res.locals.id = req.session.uid || null;         // session에서 uid 가져오기
        next(); // 다음 미들웨어로 전달
    });
    
    // 각각의 라우터 설정
    const memberRouter = require("../routers/member/member_router");
    app.use("/member", memberRouter);

    const adminRouter = require("../routers/member/admin_router");
    app.use("/admin",adminRouter);

    const gameRouter = require("../routers/game/game_router");
    app.use("/game", gameRouter);

    const boardrepRouter = require("../routers/board/board_reply_router");
    app.use("/board_rep", boardrepRouter);

    const boardRouter = require("../routers/board/board_router");
    app.use("/board", boardRouter);

    const boardRepRouter = require("../routers/board/board_reply_router");
    app.use("/board_rep", boardRepRouter)

    const productRouter = require("../routers/product/product_router");
    app.use("/product", productRouter);

    const mypageRouter = require("../routers/mypage/mypage_router");
    app.use("/mypage", mypageRouter);

    const friendsRouter = require("../routers/friends/friends_router");
    app.use("/friends", friendsRouter);

    // 메인 라우터 설정
    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.render("main_cover", { id: req.session.uid });  // id를 템플릿에 전달
    });
    router.get("/main", (req, res) => {
        ctrl.main(req, res);
    });

    return router;
};