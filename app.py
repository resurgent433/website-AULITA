from flask import Flask, render_template
import os

app = Flask(__name__)

# =========================
# Data Organisasi AULITA
# =========================
data = {
    "nama": "AULITA",
    "kepanjangan": "Aulad Like To Tadabbur Alam",

    "visi": "Menjadi organisasi santri pecinta alam yang berakhlak mulia, peduli terhadap lingkungan, serta mampu menjaga kelestarian alam sebagai bentuk ibadah kepada Allah SWT.",

    "misi": [
        "Menanamkan rasa cinta terhadap alam kepada seluruh anggota.",
        "Menyelenggarakan pendidikan dan pelatihan kepecintaalaman.",
        "Menumbuhkan kepedulian terhadap lingkungan hidup.",
        "Membangun ukhuwah dan kerja sama dengan organisasi lain.",
        "Mencetak anggota yang disiplin, bertanggung jawab, dan berjiwa pemimpin."
    ],

    "tujuan": [
        "Membentuk santri yang peduli lingkungan.",
        "Mengembangkan kemampuan survival.",
        "Meningkatkan jiwa kepemimpinan.",
        "Melestarikan alam melalui kegiatan konservasi."
    ],

    "kegiatan": [
        "Pendakian Gunung",
        "Camping",
        "Pelatihan Survival",
        "Navigasi Darat",
        "Penghijauan",
        "Bersih Sungai",
        "Bakti Sosial",
        "Pendidikan Dasar Anggota"
    ],

    "Ikrar": [
        "Asas kami Al Quran dan Assunnah dengan pemahaman salaful ummah .",
        "Menjunjung tinggi kebersamaan dan solidaritas.",
        "Pantangan kami dekstruktif dan anarkis.",
        "Selesai."
    ]
    
}


# =========================
# Halaman Beranda
# =========================
@app.route("/")
def home():
    return render_template("index.html", data=data)


@app.route("/sejarah")
def sejarah():
    return render_template("sejarah.html")

# =========================
# Halaman Galeri
# =========================
@app.route("/galeri")
def galeri():
    return render_template("galeri.html")


# =========================
# Halaman Anggota
# =========================
@app.route("/anggota")
def anggota():
    return render_template("anggota.html")


# =========================
# Jalankan Server
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)