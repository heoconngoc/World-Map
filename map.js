// document.querySelectorAll(".allPaths").forEach(e => {
//   e.setAttribute('class', `allPaths ${e.id}`);
//   e.addEventListener("mouseover", function () {
//     window.onmousemove = function (j) {
//       x = j.clientX;
//       y = j.clientY;
//       if (x> 1000 && y> 1000) {
//         document.getElementById('name').style.top = y + 20 + 'px';
//         document.getElementById('name').style.left = x - 60 + 'px';
//       } else {
//         document.getElementById('name').style.top = y + 'px';
//         document.getElementById('name').style.left = x + 'px';
//       }
//     }

//     const classes = e.className.baseVal.replace(/ /g, '.');
//     document.querySelectorAll(`.${classes}`).forEach(country => {
//       country.style.fill = "pink";
//     });
//     document.getElementById("name").style.opacity = 1;

//     document.getElementById("namep").innerText = e.id;
//   });

//   e.addEventListener("mouseleave", function () {
//     const classes = e.className.baseVal.replace(/ /g, '.');
//     document.querySelectorAll(`.${classes}`).forEach(country => {
//       country.style.fill = "#ececec";
//     });
//     document.getElementById("name").style.opacity = 0;
//   });
// });

let countriesGuessed = 0;
const totalCountries = document.querySelectorAll(".allPaths").length;
const countryNames = {}; // Lưu tên quốc gia theo ID
let selectedCountry = null;

document.querySelectorAll(".allPaths").forEach(e => {
  e.setAttribute('class', `allPaths ${e.id}`);
  countryNames[e.id] = e.id; // Lưu tên quốc gia vào đối tượng
});

// Chọn ngẫu nhiên một quốc gia
// Chọn ngẫu nhiên một quốc gia
function selectRandomCountry() {
  const allCountries = document.querySelectorAll(".allPaths");
  const randomIndex = Math.floor(Math.random() * allCountries.length);
  selectedCountry = allCountries[randomIndex];
  selectedCountry.style.fill = "pink";

  // Lấy tất cả các phần của quốc gia có cùng id
  const countryId = selectedCountry.id;
  const countryParts = document.querySelectorAll(`#${countryId}`);

  // Highlight tất cả các phần của quốc gia đã chọn
  countryParts.forEach(part => {
    part.style.fill = "pink"; // Đổi màu để highlight
  });

  document.getElementById("namep").innerText = countryId; // Hiển thị tên quốc gia cần đoán
  document.getElementById("name").style.opacity = 1;
}

// Gọi hàm chọn ngẫu nhiên khi trò chơi bắt đầu
selectRandomCountry();

// Kiểm tra câu trả lời
function checkAnswer() {
  const userInput = document.getElementById("countryInput").value.trim().toLowerCase();
  const countryId = selectedCountry.id.toLowerCase(); // Tên quốc gia đang hiển thị

  if (userInput === countryId) {
    countriesGuessed++;
    // Lấy tất cả các phần của quốc gia có cùng id
    const countryId = selectedCountry.id;
    const countryParts = document.querySelectorAll(`#${countryId}`);

    // Highlight tất cả các phần của quốc gia đã chọn
    countryParts.forEach(part => {
      part.style.fill = "green"; // Đổi màu để highlight
    });
    
    document.getElementById("countryInput").value = ''; // Xóa ô nhập liệu

    // Kiểm tra nếu người chơi hoàn thành
    if (countriesGuessed === 1) {
      document.getElementById("resultMessage").style.visibility = 'visible';
      document.getElementById("resultMessage").classList.add("show"); // Hiển thị thông báo
      document.getElementById("resultText").innerHTML = "Congratulations!<br>You completed the game!";
      document.getElementById("playAgainButton").style.display = 'block'; // Hiển thị nút play again
    } else {
      // Chọn quốc gia ngẫu nhiên tiếp theo
      setTimeout(() => {
        // selectedCountry.style.fill = "#ececec"; // Đặt lại màu cũ cho quốc gia đã hoàn thành
        selectRandomCountry(); // Chọn quốc gia tiếp theo
      }, 1000); // Delay trước khi chọn quốc gia mới
    }
  } else {
    alert("Wrong! Try again.");
  }
}
// Khi nhấn Play Again, reset game
document.getElementById("playAgainButton").addEventListener("click", function () {
  resetGame(); // Gọi hàm resetGame để bắt đầu lại trò chơi
});

function resetGame() {
  // Ẩn thông báo kết thúc game
  document.getElementById("resultMessage").style.visibility = 'hidden';
  document.getElementById("playAgainButton").style.display = 'none'; // Ẩn nút Play Again
  
  // Reset các biến và trạng thái game
  countriesGuessed = 0; // Ví dụ: Reset số quốc gia đã đoán
  selectRandomCountry(); // Lựa chọn lại quốc gia ngẫu nhiên
  
  // Đặt lại màu cho tất cả các phần của các quốc gia
  document.querySelectorAll(".allPaths").forEach(path => {
    path.style.fill = "#ececec"; // Đặt lại màu mặc định cho tất cả các phần
  });
}

