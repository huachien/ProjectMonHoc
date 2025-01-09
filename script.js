// script.js

// Hàm hiển thị một phần cụ thể và ẩn các phần khác
function showSection(sectionId, link = null) {
    // Ẩn tất cả các phần
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Hiển thị phần được chọn
    document.getElementById(sectionId + '-section').style.display = 'block';

    // Loại bỏ lớp 'active' khỏi tất cả các liên kết
    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.classList.remove('active');
    });

    // Thêm lớp 'active' cho liên kết được nhấn
    if (link) {
        link.classList.add('active');
    }
}


document.addEventListener("DOMContentLoaded", function() {
    // Chọn mục "KHU VỰC" mặc định
    const khuVucLink = document.querySelector('.sidebar ul li a[href="#khuvuc"]');
    if (khuVucLink) {
        // Kích hoạt hiển thị section "KHU VỰC"
        showSection('khuvuc');
        
        // Thêm lớp 'active' vào mục này
        khuVucLink.classList.add('active');
    }
});


const links = document.querySelectorAll('.sidebar ul li a');

links.forEach(link => {
    link.addEventListener('click', function() {
        // Xóa lớp active khỏi tất cả các mục
        links.forEach(item => item.classList.remove('active'));
        
        // Thêm lớp active vào mục được bấm
        this.classList.add('active');
    });
});


// Hàm cuộn đến một phần cụ thể
function scrollToSection(sectionId) {
    // Ẩn tất cả các phần
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Hiển thị phần được chọn
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';

        // Cuộn đến phần được chọn
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Hàm cập nhật giá trị gauge (nhiệt độ, độ ẩm, khói)
function updateGauge(gaugeId, value) {
    const gaugeValue = document.getElementById(gaugeId);
    gaugeValue.textContent = value;
    // Bạn có thể thêm logic để cập nhật biểu đồ hoặc giao diện khác ở đây
}

// Liên kết với Firebase Realtime Database
document.addEventListener('DOMContentLoaded', () => {
    // Tham chiếu đến các giá trị trong database cho Khu Vực 1
    const tempRef_khuVuc1 = database.ref('khuVuc1/nhiệt_độ');
    const humRef_khuVuc1 = database.ref('khuVuc1/độ_ẩm');
    const gasRef_khuVuc1 = database.ref('khuVuc1/gas');

    // Tham chiếu đến các giá trị trong database cho Khu Vực 2
    const tempRef_khuVuc2 = database.ref('khuVuc2/nhiệt_độ');
    const humRef_khuVuc2 = database.ref('khuVuc2/độ_ẩm');
    const gasRef_khuVuc2 = database.ref('khuVuc2/gas');

    // Cập nhật giá trị nhiệt độ cho Khu Vực 1
    tempRef_khuVuc1.on('value', (snapshot) => {
        const temp = snapshot.val();
        if (temp !== null) {
            document.getElementById('temp_khuVuc1').textContent = temp;
            document.getElementById('temp_khuVuc1_display').textContent = temp;
            updateGauge('temp_khuVuc1_display', temp);
        }
    });

    // Cập nhật giá trị độ ẩm cho Khu Vực 1
    humRef_khuVuc1.on('value', (snapshot) => {
        const humidity = snapshot.val();
        if (humidity !== null) {
            document.getElementById('hum_khuVuc1').textContent = humidity;
            document.getElementById('hum_khuVuc1_display').textContent = humidity;
            updateGauge('hum_khuVuc1_display', humidity);
        }
    });

    // Cập nhật giá trị khói cho Khu Vực 1
    gasRef_khuVuc1.on('value', (snapshot) => {
        const gas = snapshot.val();
        if (gas !== null) {
            document.getElementById('gas_khuVuc1').textContent = gas;
            document.getElementById('gas_khuVuc1_display').textContent = gas;
            updateGauge('gas_khuVuc1_display', gas);
        }
    });

    // Cập nhật giá trị nhiệt độ cho Khu Vực 2
    tempRef_khuVuc2.on('value', (snapshot) => {
        const temp = snapshot.val();
        if (temp !== null) {
            document.getElementById('temp_khuVuc2').textContent = temp;
            document.getElementById('temp_khuVuc2_display').textContent = temp;
            updateGauge('temp_khuVuc2_display', temp);
        }
    });

    // Cập nhật giá trị độ ẩm cho Khu Vực 2
    humRef_khuVuc2.on('value', (snapshot) => {
        const humidity = snapshot.val();
        if (humidity !== null) {
            document.getElementById('hum_khuVuc2').textContent = humidity;
            document.getElementById('hum_khuVuc2_display').textContent = humidity;
            updateGauge('hum_khuVuc2_display', humidity);
        }
    });

    // Cập nhật giá trị khói cho Khu Vực 2
    gasRef_khuVuc2.on('value', (snapshot) => {
        const gas = snapshot.val();
        if (gas !== null) {
            document.getElementById('gas_khuVuc2').textContent = gas;
            document.getElementById('gas_khuVuc2_display').textContent = gas;
            updateGauge('gas_khuVuc2_display', gas);
        }
    });
});

// Khởi tạo các giá trị ban đầu (nếu cần)
updateGauge('temp_khuVuc1_display', 15);
updateGauge('hum_khuVuc1_display', 14);
updateGauge('gas_khuVuc1_display', 80);

updateGauge('temp_khuVuc2_display', 15);
updateGauge('hum_khuVuc2_display', 12);
updateGauge('gas_khuVuc2_display', 29);

// giá trị ngưỡng nha
// Hàm cập nhật giá trị ngưỡng từ Firebase lên giao diện
function syncThresholdValues() {
    const thresholdRef = database.ref('giaTriNguong');

    thresholdRef.on('value', (snapshot) => {
        const thresholds = snapshot.val();
        if (thresholds) {
            // Cập nhật nhiệt độ
            document.getElementById('temp-threshold1').value = thresholds.nhiệt_độ;
            document.getElementById('temp-value1').textContent = thresholds.nhiệt_độ;

            // Cập nhật độ ẩm
            document.getElementById('humidity-threshold1').value = thresholds.độ_ẩm;
            document.getElementById('humidity-value1').textContent = thresholds.độ_ẩm;

            // Cập nhật khói
            document.getElementById('gas-threshold1').value = thresholds.gas;
            document.getElementById('gas-value1').textContent = thresholds.gas;
        }
    });
}

// Hàm gửi giá trị ngưỡng từ giao diện lên Firebase
function sendThreshold(areaId, type) {
    const inputId = `${type}-threshold1`; // ID của slider giá trị ngưỡng
    const inputValue = document.getElementById(inputId).value; // Lấy giá trị từ slider

    const thresholdRef = database.ref('giaTriNguong'); // Đường dẫn đến Firebase
    const updateData = {};

    // Xác định loại ngưỡng và cập nhật giá trị
    if (type === 'temp') {
        updateData['nhiệt_độ'] = parseInt(inputValue);
    } else if (type === 'humidity') {
        updateData['độ_ẩm'] = parseInt(inputValue);
    } else if (type === 'gas') {
        updateData['gas'] = parseInt(inputValue);
    }

    // Gửi dữ liệu lên Firebase
    thresholdRef.update(updateData, (error) => {
        if (error) {
            console.error('Không thể cập nhật giá trị ngưỡng:', error);
        } else {
            console.log('Giá trị ngưỡng đã được cập nhật thành công:', updateData);
        }
    });
}


// Hàm cập nhật giá trị slider
function updateThresholdValue(labelId, value) {
    document.getElementById(labelId).textContent = value;
}

// Gọi hàm đồng bộ giá trị ngưỡng khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    syncThresholdValues();
});





/////để sau 
// Ngưỡng chung
let nguongNhietDo = 50; // Ngưỡng nhiệt độ
let nguongDoAm = 50;    // Ngưỡng độ ẩm (thấp hơn là nguy hiểm)
let nguongKhoi = 50;    // Ngưỡng khói

// lắng nghe giá trị ngưỡng từ firebase
function capNhatGiaTriNguong() {
    const nguongRef = database.ref("giaTriNguong");

    nguongRef.on("value", (snapshot) => {
        const thresholds = snapshot.val();
        if (thresholds) {
            nguongNhietDo = thresholds["nhiệt_độ"];
            nguongDoAm = thresholds["độ_ẩm"];
            nguongKhoi = thresholds["gas"];

            console.log("Giá trị ngưỡng cập nhật:", { nguongNhietDo, nguongDoAm, nguongKhoi });

            // Cập nhật trạng thái loa cho từng khu vực khi giá trị ngưỡng thay đổi
            database.ref("khuVuc1").once("value", (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    capNhatTrangThaiLoaKhuVuc("khuVuc1", data, nguongNhietDo, nguongDoAm, nguongKhoi);
                }
            });

            database.ref("khuVuc2").once("value", (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    capNhatTrangThaiLoaKhuVuc("khuVuc2", data, nguongNhietDo, nguongDoAm, nguongKhoi);
                }
            });
        }
    });

}

// Hàm kiểm tra giá trị cảm biến và cập nhật trạng thái loa cho một khu vực
function capNhatTrangThaiLoaKhuVuc(khuVucId, giaTri, nguongNhietDo, nguongDoAm, nguongKhoi) {
    const ref = database.ref(khuVucId); // Tham chiếu đến Firebase
    const imgElement = document.getElementById(`loakhuVuc${khuVucId}`); // Hình ảnh loa cảnh báo
    let loaCanhBao = "off";

    // Kiểm tra nếu bất kỳ giá trị nào vượt ngưỡng
    if (
        giaTri["nhiệt_độ"] > nguongNhietDo ||
        giaTri["độ_ẩm"] < nguongDoAm ||
        giaTri["gas"] > nguongKhoi
    ) {
        loaCanhBao = "on";
    }

    // Cập nhật hình ảnh trên giao diện
    imgElement.src = loaCanhBao === "on" ? "./img/loaon.jpg" : "./img/loaoff.jpg";

    // Cập nhật trạng thái loa vào Firebase
    ref.update({ loaCanhBao }, (error) => {
        if (error) {
            console.error(`Không thể cập nhật trạng thái loa cho ${khuVucId}:`, error);
        } else {
            console.log(`Loa cảnh báo của ${khuVucId} đã cập nhật thành: ${loaCanhBao}`);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    capNhatGiaTriNguong();


    // Lắng nghe dữ liệu cảm biến của Khu Vực 1
    database.ref("khuVuc1").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
            capNhatTrangThaiLoaKhuVuc("khuVuc1", data, nguongNhietDo, nguongDoAm, nguongKhoi);
        }
    });

    // Lắng nghe dữ liệu cảm biến của Khu Vực 2
    database.ref("khuVuc2").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
            capNhatTrangThaiLoaKhuVuc("khuVuc2", data, nguongNhietDo, nguongDoAm, nguongKhoi);
        }
    });
    capNhatTrangThaiLoaTong();
});
// Tiếp tục thêm lắng nghe cho các khu vực khác (nếu có)
// Lấy dữ liệu ban đầu cho tất cả khu vực
database.ref().once("value", (snapshot) => {
    const data = snapshot.val();

    // Cập nhật trạng thái loa cho Khu Vực 1
    if (data.khuVuc1) {
        capNhatTrangThaiLoaKhuVuc("khuVuc1", data.khuVuc1, nguongNhietDo, nguongDoAm, nguongKhoi);
    }

    // Cập nhật trạng thái loa cho Khu Vực 2
    if (data.khuVuc2) {
        capNhatTrangThaiLoaKhuVuc("khuVuc2", data.khuVuc2, nguongNhietDo, nguongDoAm, nguongKhoi);
    }
});

// loa tổng
function capNhatTrangThaiLoaTong() {
    // Tham chiếu trạng thái loa cảnh báo từ Firebase
    const loaKhuVuc1Ref = database.ref("khuVuc1/loaCanhBao");
    const loaKhuVuc2Ref = database.ref("khuVuc2/loaCanhBao");

    // Lắng nghe thay đổi của loa cảnh báo từng khu vực
    loaKhuVuc1Ref.on("value", (snapshot1) => {
        const loaKhuVuc1 = snapshot1.val();

        loaKhuVuc2Ref.on("value", (snapshot2) => {
            const loaKhuVuc2 = snapshot2.val();

            // Xác định trạng thái loa tổng
            const loaTongElement = document.getElementById("loakhuVucTong");
            const loaTongTrangThai = loaKhuVuc1 === "on" || loaKhuVuc2 === "on" ? "on" : "off";

            // Cập nhật hình ảnh trên giao diện
            loaTongElement.src = loaTongTrangThai === "on" ? "./img/loaon.jpg" : "./img/loaoff.jpg";

            console.log(`Loa tổng cập nhật thành: ${loaTongTrangThai}`);
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // Gọi hàm cập nhật loa tổng
    capNhatTrangThaiLoaTong();
    capNhatGiaTriNguong();
});
