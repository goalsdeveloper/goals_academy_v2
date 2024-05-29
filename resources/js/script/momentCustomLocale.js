import moment from "moment";

moment.updateLocale("id", {
    weekdays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
    weekdaysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    relativeTime : {
        future : "%s yang akan datang",
        past : "%s yang lalu",
        s: 'beberapa detik',
        ss : '%d detik',
        m:  "a menit",
        mm: "%d menit",
        h:  "sejam",
        hh: "%d jam",
        d:  "sehari",
        dd: "%d hari",
        w:  "seminggu",
        ww: "%d minggu",
        M:  "sebulan",
        MM: "%d bulan",
        y:  "setahun",
        yy: "%d tahun"
    },
});
