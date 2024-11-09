// // Thiết lập sự kiện di chuyển chuột một lần duy nhất
// window.onmousemove = function (j) {
//   const x = j.clientX;
//   const y = j.clientY;
//   const nameDiv = document.getElementById('name');
//   if (x > window.innerWidth / 2 && y > window.innerHeight / 2) {
//       nameDiv.style.top = y + 20 + 'px';
//       nameDiv.style.left = x - 60 + 'px';
//   } else {
//       nameDiv.style.top = y + 'px';
//       nameDiv.style.left = x + 'px';
//   }
// };

// document.querySelectorAll(".allPaths").forEach(e => {
//   // Thêm lớp quốc gia vào mỗi phần tử SVG
//   e.setAttribute('class', `allPaths ${e.id}`);

//   e.addEventListener("mouseover", function () {
//       const classes = e.className.baseVal.replace(/ /g, '.');
      
//       // Thay đổi màu sắc các phần tử SVG liên quan
//       document.querySelectorAll(`.${classes}`).forEach(country => {
//           country.style.fill = "pink";
//       });
      
//       // Hiển thị tên quốc gia
//       document.getElementById("name").style.opacity = 1;
//       document.getElementById("namep").innerText = e.id;
//   });

//   e.addEventListener("mouseleave", function () {
//       const classes = e.className.baseVal.replace(/ /g, '.');
      
//       // Đặt lại màu sắc ban đầu khi rời chuột
//       document.querySelectorAll(`.${classes}`).forEach(country => {
//           country.style.fill = "#ececec";
//       });

//       // Ẩn tên quốc gia
//       document.getElementById("name").style.opacity = 0;
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
function selectRandomCountry() {
  const allCountries = document.querySelectorAll(".allPaths");
  const randomIndex = Math.floor(Math.random() * allCountries.length);
  selectedCountry = allCountries[randomIndex];

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

function checkAnswer() {
  const userInput = document.getElementById("countryInput").value.trim().toLowerCase();
  const countryId = selectedCountry.id.toLowerCase(); // Tên quốc gia đang hiển thị

  if (userInput === countryId) {
    countriesGuessed++;

    // Lấy tất cả các phần của quốc gia có cùng id và đổi màu khi đúng
    const countryId = selectedCountry.id;
    const countryParts = document.querySelectorAll(`#${countryId}`);

    // Highlight tất cả các phần của quốc gia đã chọn
    countryParts.forEach(part => {
      part.style.fill = "green"; // Đổi màu để highlight
    });

    document.getElementById("countryInput").value = ''; // Xóa ô nhập liệu

    // Kiểm tra nếu người chơi hoàn thành
    if (countriesGuessed === 3) {
      document.getElementById("resultMessage").style.visibility = 'visible';
      document.getElementById("resultMessage").classList.add("show"); // Hiển thị thông báo
      document.getElementById("resultText").innerHTML = "Congratulations!<br>You completed the game!";
    } else {
      // Tiến hành chọn quốc gia tiếp theo
      setTimeout(() => {
        selectRandomCountry(); // Chọn quốc gia tiếp theo
      }, 10); // Delay trước khi chọn quốc gia mới
    }

  } else {
    alert("Wrong! Try again.");
  }
}
