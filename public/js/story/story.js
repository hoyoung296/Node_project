document.addEventListener("DOMContentLoaded", () => {
    const addIcon = document.getElementById("add-photo-icon"); // 아이콘 선택
    const storyContainer = document.querySelector(".story-icons");
    const storyPopup = document.getElementById("story-popup");
    const storyPopupImage = document.getElementById("popup-image");

    // 사진 추가 클릭 이벤트
    addIcon.addEventListener("click", () => {
        // 파일 선택 창 생성
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".jpg, .jpeg, .img"; // 허용되는 확장자 설정

        // 파일 선택 시 처리
        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const allowedExtensions = ["jpg", "jpeg", "img"];
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (!allowedExtensions.includes(fileExtension)) {
                    alert("허용되지 않은 파일 형식입니다. .jpg, .jpeg, .img 파일만 업로드 가능합니다.");
                    return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                    // 새 사진 아이콘 생성
                    const newIcon = document.createElement("div");
                    newIcon.className = "story-icon";

                    const img = document.createElement("img");
                    img.src = reader.result;
                    newIcon.appendChild(img);

                    // 사진 클릭 이벤트 (팝업)
                    newIcon.addEventListener("click", () => {
                        storyPopupImage.src = reader.result;
                        storyPopup.style.display = "block";
                    });

                    storyContainer.appendChild(newIcon);
                };
                reader.readAsDataURL(file);
            }
        });

        // 파일 선택 창 표시
        input.click();
    });

    // 팝업 닫기
    storyPopup.addEventListener("click", () => {
        storyPopup.style.display = "none";
    });
});
