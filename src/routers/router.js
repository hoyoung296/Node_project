module.exports = (app) => {
    // 모든 요청에서 session.uid 값을 res.locals.id에 설정
    app.use((req, res, next) => {
        res.locals.username = req.session.name || null;  // session에서 이름 가져오기
        res.locals.id = req.session.uid || null;         // session에서 uid 가져오기
        next(); // 다음 미들웨어로 전달
    });

    const memberRouter = require("../routers/member/member_router");
    app.use("/member", memberRouter)

    const gameRouter = require("../routers/game/game_router")
    app.use("/game", gameRouter)

    const boardRouter = require("../routers/board/board_router")
    app.use("/board", boardRouter)

    const boardRepRouter = require("./board/board_reply_router")
    app.use("/board_rep", boardRepRouter)

    const productRouter = require("../routers/product/product_router")
    app.use("/product", productRouter)

    const mypageRouter = require("../routers/mypage/mypage_router")
    app.use("/mypage", mypageRouter)

    const friendsRouter = require("../routers/friends/friends_router")
    app.use("/friends", friendsRouter)

    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.render("main_cover", { id: req.session.uid })
    })
    router.get("/main", (req, res) => {
        const isLogin = req.cookies.isLogin === "true";
        res.render("main", { isLogin })
    })

    return router;
}