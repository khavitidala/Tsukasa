const { create } = require('@open-wa/wa-automate')
const axios = require('axios')
const moment = require('moment')
const serverOption = {
    sessionId: 'Imperial',
    headless: true,
    qrRefreshS: 20,
    qrTimeout: 0,
    authTimeout: 0,
    autoRefresh: true,
    cacheEnabled: false,
    callTimeout: 0,
    chromiumArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0'
    ]
}

const mulaiserver = async () => {
    create(serverOption).then(
        client => {
            console.log('Server berhasil dimuat!')
            client.onMessage((message) => {
                msgHandler(client, message)
            })
        }
    )
}

async function msgHandler(client, message) {
    try {
        const { type, body, from, t, caption} = message
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const commands = ['/menu', '/help', '/info', '/stat', '/rs','/news']
        const cmds = commands.map(x => `${x}\\b`).join('|')
        const cmd = type === 'chat' ? body.match(new RegExp(cmds, 'gi')) : type === 'image' && caption ? caption.match(new RegExp(cmds, 'gi')) : ''
    
        if (cmd) {
          const args = body.trim().split(' ')
          switch (cmd[0].toLowerCase()) {
            case '/menu':
            case '/help':
                menu = "Halo! Aku adalah chatbot yang menyediakan informasi seputar covid-19. Berikut beberapa kata kunci yang bisa dipakai:"+"\n"
                menu = menu + "*/menu* dan */help* untuk menampilkan menu utama\n*/info* untuk mengetahui tentang apa itu covid-19\n"
                menu = menu + "*/stat* untuk menampilkan informasi statistik perkembangan kasus covid-19 terkini di Indonesia, bisa pula ditambahkan dengan provinsi misal /stat Jawa Barat untuk mengetahui statistik covid-19 di provinsi tertentu\n"
                menu = menu + "*/rs <nama provinsi>* misal /rs Jawa Barat, akan menampilkan daftar rumah sakit rujukan covid-19 di provinsi tertentu.\n"
                menu = menu + "*/news* akan menampilkan headline news seputar corona di Indonesia.\n"
                client.sendText(from, menu)
            break
            case '/info':
                info = ""
                if(args.length>1) {
                    switch (args[1].toLowerCase()) {
                        case 'pengertian':
                            info = info + "*Apa itu COVID-19?*\n Penyakit virus corona (COVID-19) adalah penyakit menular yang disebabkan oleh virus corona yang baru-baru ini ditemukan.\nSebagian besar orang yang tertular COVID-19 akan mengalami gejala ringan hingga sedang, dan akan pulih tanpa penanganan khusus."
                            break
                        case 'penularan':
                            info = info + "*Cara Penyebaran Virus Corona*\nVirus yang menyebabkan COVID-19 terutama ditransmisikan melalui droplet (percikan air liur) yang dihasilkan saat orang yang terinfeksi batuk, bersin, atau mengembuskan nafas. Droplet ini terlalu berat dan tidak bisa bertahan di udara, sehingga dengan cepat jatuh dan menempel pada lantai atau permukaan lainnya.\nAnda dapat tertular saat menghirup udara yang mengandung virus jika Anda berada terlalu dekat dengan orang yang sudah terinfeksi COVID-19. Anda juga dapat tertular jika menyentuh permukaan benda yang terkontaminasi lalu menyentuh mata, hidung, atau mulut Anda."
                            break
                        case 'gejala':
                            info = info + "*Gejala COVID-19*\nMasing-masing orang memiliki respons yang berbeda terhadap COVID-19. Sebagian besar orang yang terpapar virus ini akan mengalami gejala ringan hingga sedang, dan akan pulih tanpa perlu dirawat di rumah sakit.\n\nGejala yang paling umum:\n-demam\n-batuk kering\n-kelelahan\n\nGejala yang sedikit tidak umum:\n-rasa tidak nyaman dan nyeri\n-nyeri tenggorokan\n-diare\n-konjungtivitis (mata merah)\n-sakit kepala\n-hilangnya indera perasa atau penciuman\n-ruam pada kulit, atau perubahan warna pada jari tangan atau jari kaki\n"
                            break
                        case 'pencegahan':
                            info = info + "*Upaya Pencegahan*\n\nLindungi diri Anda dan orang lain di sekitar Anda dengan mengetahui fakta-fakta terkait virus ini dan mengambil langkah pencegahan yang sesuai. Ikuti saran yang diberikan oleh otoritas kesehatan setempat.\n\nUntuk mencegah penyebaran COVID-19:\n-Cuci tangan Anda secara rutin. Gunakan sabun dan air, atau cairan pembersih tangan berbahan alkohol.\n-Selalu jaga jarak aman dengan orang yang batuk atau bersin.\n-Kenakan masker jika pembatasan fisik tidak dimungkinkan.\n-Jangan sentuh mata, hidung, atau mulut Anda.\n-Saat batuk atau bersin, tutup mulut dan hidung Anda dengan lengan atau tisu.\n-Jangan keluar rumah jika merasa tidak enak badan.\n-Jika demam, batuk, atau kesulitan bernapas, segera cari bantuan medis.\n-Telepon terlebih dahulu agar penyedia layanan kesehatan dapat segera mengarahkan Anda ke fasilitas kesehatan yang tepat. Tindakan ini akan melindungi Anda serta mencegah penyebaran virus dan infeksi lainnya.\n\n*Masker*\nMasker dapat membantu mencegah penyebaran virus dari orang yang mengenakannya kepada orang lain. Mengenakan masker saja tidak cukup untuk melindungi diri dari COVID-19, sehingga harus dikombinasikan dengan pembatasan fisik dan kebersihan tangan. Ikuti saran yang diberikan oleh otoritas kesehatan setempat."
                            break
                        case 'perawatan':
                            info = info + "*Perawatan diri*\n\nJika Anda merasa sakit, Anda harus beristirahat, minum banyak air, dan makan makanan bergizi. Gunakan ruangan yang terpisah dari anggota keluarga Anda, dan jika memungkinkan gunakan kamar mandi khusus. Bersihkan dan lakukan disinfeksi pada permukaan benda yang sering disentuh.\nSemua orang harus menjaga pola hidup sehat di rumah. Jaga pola diet yang sehat, tidur cukup, tetap aktif, dan lakukan kontak sosial dengan orang-orang yang Anda sayangi melalui telepon atau internet. Selama masa sulit seperti sekarang, anak-anak membutuhkan kasih sayang dan perhatian lebih dari orang dewasa. Usahakan untuk selalu menjaga rutinitas dan jadwal seperti biasanya.\nMerasa sedih, stres, atau bingung selama krisis merupakan hal yang normal. Berbicara dengan orang yang Anda percaya, seperti teman dan keluarga, dapat membantu. Jika Anda merasa kewalahan, hubungi tenaga kesehatan atau konselor."
                            break
                    }
                } else {
                    info = info + "Berikut beberapa informasi yang bisa didapatkan, ketik keyword di bawah untuk mengetahui lebih lanjut:\n/info pengertian\n/info penularan\n/info gejala\n/info pencegahan\n/info perawatan\n"
                }
                client.sendText(from, info)
            break
            case '/stat':
                pesan = ""
                if(args.length > 1) {
                    prov = body.substr(6)
                    index = 0
                    const respons = await axios.get('https://data.covid19.go.id/public/api/prov.json')
                    const { last_date, list_data } = respons.data
                    for(i = 0; i<list_data.length; i++) {
                        key = list_data[i].key.toLowerCase()
                        if(key.search(prov.toLowerCase()) != -1) {
                            index = i
                            break
                        }
                    }
                    data = list_data[index]
                    pesan = pesan + "*Data Statistik COVID-19 di Provinsi "+ data.key + "*\n"+ "Pada tanggal "+last_date+"\n\n"
                    pesan = pesan + "_Kasus Harian:_\nPositif: "+ data.penambahan.positif+"\n"+"Sembuh: "+data.penambahan.sembuh+"\nMeninggal: "+data.penambahan.meninggal+"\n\n"
                    pesan = pesan + "_Kasus Total:_\nJumlah Kasus: "+ data.jumlah_kasus+"\nJumlah sembuh: "+data.jumlah_sembuh+"\nJumlah meninggal: "+data.jumlah_meninggal+"\nJumlah_dirawat: "+data.jumlah_dirawat+"\n\n"
                    pesan = pesan + "_Kasus Total Berdasarkan Jenis Kelamin:_\n"+data.jenis_kelamin[0].key +": "+data.jenis_kelamin[0].doc_count+"\n"+data.jenis_kelamin[1].key +": "+data.jenis_kelamin[1].doc_count+"\n\n"
                    pesan = pesan + "_Kasus Total Berdasarkan Usia:_\n"
                    for(i=0;i<data.kelompok_umur.length;i++) {
                        pesan = pesan+ data.kelompok_umur[i].key+": "+data.kelompok_umur[i].doc_count+"\n"
                    }

                } else {
                    const response = await axios.get('https://data.covid19.go.id/public/api/update.json')
                    const { update } = response.data
                    pesan = pesan + "*Kasus Harian COVID-19 di Indonesia*\nper tanggal "+update.penambahan.tanggal+"\nJumlah positif: "+update.penambahan.jumlah_positif+"\nJumlah meninggal: "+update.penambahan.jumlah_meninggal+"\nJumlah sembuh: "+update.penambahan.jumlah_sembuh+"\nJumlah dirawat: "+update.penambahan.jumlah_dirawat+"\n\n*Kasus Total*:"+"\nJumlah positif: "+update.total.jumlah_positif+"\nJumlah meninggal: "+update.total.jumlah_meninggal+"\nJumlah sembuh: "+update.total.jumlah_sembuh+"\nJumlah dirawat:"+update.total.jumlah_dirawat
                }
                client.sendText(from, pesan)
            break
            case '/rs':
                pesan = ""
                if(args.length > 1) {
                    prov = body.substr(4)
                    const respons = await axios.get('https://dekontaminasi.com/api/id/covid19/hospitals')
                    const datars = respons.data
                    pesan = pesan + "*Data Rumah Sakit Rujukan COVID-19 di "+prov+"*"
                    for(i = 0; i<datars.length; i++) {
                        key = datars[i].province.toLowerCase()
                        if(key.search(prov.toLowerCase()) != -1) {
                            pesan=pesan+"\n\n*"+datars[i].name+"*"
                            pesan = pesan + "\nAlamat : "+datars[i].address+"\nRegion : "+datars[i].region+"\nNomor Telepon : "+datars[i].phone
                        } else {
                            pesan = pesan + "Mohon masukkan nama provinsi yang valid"
                            break
                        }
                    }
                } else if (args.length===1){
                    pesan = pesan+"Maaf, keyword /rs harus dibarengi dengan nama provinsi. Ketik /menu untuk informasi selengkapya"
                }
                client.sendText(from, pesan)
            break
            case '/news':
                const respons = await axios.get('http://newsapi.org/v2/top-headlines?country=id&apiKey=b2d3b1c264c147ae88dba39998c23279&q=corona')
                const { totalResults, articles } = respons.data
                if (totalResults>10) {
                    res = 10
                } else {
                    res = totalResults
                }
                i = 0
                pesan = '_*Headline News dengan Kata Kunci Corona*_\n\n'
                for (const isi of articles) {
                    i++
                    pesan = pesan + i + '. ' + '_' + isi.title + '_' + '\n' + isi.publishedAt + '\n' + isi.description + '\n' + isi.url
                    if (i<res) {
                        pesan = pesan + '\n\n'
                    } else if(i >= res){
                        break
                    }
                }
                await client.sendText(from, pesan)
            break
          }
        }
    } catch(err) {
        console.log("Ada Error",err)
    }
}

process.on('Ada sesuatu yang salah/error', function(err) {
    console.log('Exception berupa: ', err)
})

mulaiserver()