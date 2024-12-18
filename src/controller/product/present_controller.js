const commonSer = require("../../service/ser_common")
const mctrl = require("../controller") //thema설정하려고 추가
const ser = require("../../service/product/present_service")

const presentForm = async (req, res) => {
    const check = commonSer.sessionCheck(req.session)
    if(check == 0){
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        res.render("product/present", {thema})
    }else{
        res.send(check)
    }
    
}

const check = async (req, res) => {
    console.log(req.body)
    const result = await ser.transmitCheck(req.body)
    let msg='', url=''
    if(result.length == 0){
        msg = `<script>
                alert('받는 분 id를 다시 입력해주세요.');
                location.href = '/present';
            </script>`;
        res.send(msg)
    }else{
        console.log(req.session)
        const receive = await ser.receiveDotoriCheck(req.session.uid)
        console.log("..", receive)
        if(receive.DOTORI < req.body.dotori){
            msg = `<script>
                alert('보낼 도토리가 부족합니다.');
                location.href = '/present';
            </script>`;
            res.send(msg)
        }else{
            msg = await ser.sendDotori(req.body, req.session.uid)
            res.send(msg)
        }
    }
    
}


module.exports = {presentForm, check}