export const detailWebinar = [
    {
        category_id: 5,
        name: "Proposal Biar Diterima",
        slug: "proposal-biar-diterima",
        excerpt: " ",
        description: " ",
        facilities: [
            {
                icon: "icon-text",
                text: "text-description",
            },
        ],
        price: 49000,
        product_image: "resources/img/webinar/1.png",
        product_type_id: 3,
        duration: 60,
        total_meet: 1,
        active_period: 30,
        number_list: 5,
        webinar_properties: {
            date: "2024-04-20",
            time: "18:00",
            pemateri: "Mas Rian",
            files: [
                {
                    title: "Analisis Kualitatif.pdf",
                    path: "path-to-storage",
                },
                {
                    title: "Analisis Kuantitatif.pdf",
                    path: "path-to-storage",
                },
            ],
        },
    },
    {
        category_id: 6,
        name: "Proposal biar diterima (Series)",
        slug: "proposal-biar-diterima-series",
        excerpt: " ",
        description: " ",
        facilities: [
            {
                icon: "icon-text",
                text: "text-description",
            },
        ],
        price: 49000,
        product_image: "resources/img/webinar/1.png",
        product_type_id: 3,
        duration: 60,
        total_meet: 1,
        active_period: 30,
        number_list: 5,
        webinar_properties: {
            start_date: "2024-04-20",
            end_date: "2024-04-24",
            session: [
                {
                    title: "Cara melakukan penelitian",
                    date: "2024-04-20",
                    pemateri: "Mas Rian",
                    files: [
                        {
                            title: "Analisis Kualitatif.pdf",
                            path: "path-to-storage",
                        },
                        {
                            title: "Analisis Kuantitatif.pdf",
                            path: "path-to-storage",
                        },
                    ],
                },
                {
                    title: "Cara untuk Mengolah Data",
                    date: "2024-04-21",
                    pemateri: "Mas Rian",
                    files: [
                        {
                            title: "Analisis Kualitatif.pdf",
                            path: "path-to-storage",
                        },
                        {
                            title: "Analisis Kuantitatif.pdf",
                            path: "path-to-storage",
                        },
                    ],
                },
            ],
        },
    },
];

export const templateDataDetail = {
    id: 1,
    sesi: "Sesi 1",
    detail: {
        informasi: [
            {
                key: "name",
                title: "Judul",
                value: "Tips & Trik Menulis Skripsi",
            },
            {
                key: "webinar_properties.pemateri",
                title: "Pemateri",
                value: "Dr Ludi",
            },
        ],
    },
};

export const templateDataDetailBanyakSesi = {
    id: 1,
    sesi: "Sesi 1",
    detail: {
        informasi: [
            {
                key: "title",
                title: "Judul",
                value: "Tips & Trik Menulis Skripsi",
            },
            {
                key: "pemateri",
                title: "Pemateri",
                value: "Dr Ludi",
            },
        ],
    },
};
