function showCalculator() {
    document.getElementById('calculatorSection').style.display = 'block';
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('materialSection').style.display = 'none';
}

function showProfile() {
    document.getElementById('calculatorSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('materialSection').style.display = 'none';
}

function showMaterial() {
    document.getElementById('calculatorSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('materialSection').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    function startTypingAnimation() {
        document.getElementById("calculatorTitle").style.animation = "typing 4s steps(40) 1s 1 normal, blink-caret 0.5s step-end infinite";
    }

    setTimeout(startTypingAnimation, 1000); // Jeda sebelum memulai animasi pertama kali

    setInterval(function () {
        document.getElementById("calculatorTitle").style.animation = "none";
        setTimeout(startTypingAnimation, 1000); // Jeda sebelum mengulang animasi
    }, 5000); // Ubah angka 5000 menjadi jumlah detik yang Anda inginkan sebelum animasi diulang
});

function appendToFunction(value) {
    const functionInput = document.getElementById('function');
    const limitInput = document.getElementById('limit');

    // Hanya tambahkan ke fungsi jika tidak di kolom nilai batas
    if (limitInput !== document.activeElement) {
        const lastChar = functionInput.value.charAt(functionInput.value.length - 1);
        if (!isNaN(lastChar) && value === 'x') {
            functionInput.value += '*';
        }
        functionInput.value += value;
    }
}

function clearFunction() {
    document.getElementById('function').value = '';
    document.getElementById('limit').value = '';
    document.getElementById('limitResultText').innerText = "Hasil Limit"; // Menambahkan ini untuk mengembalikan teks "Hasil Limit"
    document.getElementById('outputLimit').innerText = ''; // Menambahkan ini untuk menghapus output limit
}

function appendToLimit(value) {
    document.getElementById('limit').value += value;
}

function calculateLimit() {
    const functionInput = document.getElementById('function').value;
    const limitInput = document.getElementById('limit').value;

    if (functionInput.trim() === "" || isNaN(limitInput)) {
        alert("Mohon masukkan fungsi dan nilai batas yang valid.");
        return;
    }

    try {
        const sanitizedFunction = functionInput.replace(/\^/g, '**').replace(/∞/g, 'Infinity');
        const result = Function('x', 'return ' + sanitizedFunction)(parseFloat(limitInput));

        // Menampilkan hasil limit dan menghapus output limit
        document.getElementById('limitResultText').innerText = "Hasil Limit";
        document.getElementById('outputLimit').innerText = result;

        // Gambar grafik fungsi
        drawGraph(sanitizedFunction);
    } catch (error) {
        alert("Terjadi kesalahan dalam menghitung limit. Pastikan fungsi Anda valid.");
    }
}

// ... (Fungsi-fungsi lainnya)

function drawGraph(functionString) {
    const x = [...Array(100).keys()]; // Generate x values
    const y = x.map(x => eval(functionString.replace("x", x)));

    const trace = {
        x: x,
        y: y,
        type: "scatter",
        mode: "lines"
    };

    const layout = {
        title: "Grafik Fungsi",
        xaxis: {
            title: "x"
        },
        yaxis: {
            title: "f(x)"
        }
    };

    Plotly.newPlot('plot', [trace], layout);
}

