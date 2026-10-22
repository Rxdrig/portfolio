const cardsData = {
    skills: [
        {
            title: 'Frontend',
            icon: 'bi-window-sidebar',
            items: ['HTML', 'CSS', 'React', 'JavaScript', 'Bootstrap']
        },
        {
            title: 'Backend & Database',
            icon: 'bi-database',
            items: ['Python', 'Django', 'SQL', 'Node.js', 'MongoDB']
        },
        {
            title: 'Design & Tools',
            icon: 'bi-tools',
            items: ['Adobe Photoshop', 'Git', 'Adobe Illustrator', 'Power BI']
        }
    ],
    projects: [
        {
            badge: 'Full Stack / Gaming Marketplace',
            title: 'Game Store',
            description: 'Plataforma web de venta digital de videojuegos con autenticación simulada, catálogo dinámico y generación automática de keys tras la compra.',
            summary: 'Tienda full stack de videojuegos con filtrado dinámico por plataformas.',
            images: ['assets/img/gamestore.webp',
                'assets/img/gamestore-2.webp', 
                'assets/img/gamestore-3.webp', 
                'assets/img/gamestore-4.webp',
                'assets/img/gamestore-5.webp',
                'assets/img/gamestore-6.webp',
                'assets/img/gamestore-7.webp'],
            technologies: ['React', 'Vite', 'Node.js', 'Express', 'Bootstrap 5'],
            metric: 'E-commerce',
            github: 'https://github.com/rodrigo-mellav/game-store',
            //demo: '#',
            featured: false,
            status: 'full stack'
        },
        {
            badge: 'Full Stack / Finance Dashboard',
            title: 'Expense Flow',
            description: 'Aplicación web de gestión financiera enfocada en el control de gastos, presupuesto y metas de ahorro.',
            summary: 'Dashboard financiero con visualización de datos, autenticación y gestión de gastos.',
            images: ['assets/img/expenseflow-2.webp',
                    'assets/img/expenseflow.webp',
                    'assets/img/expenseflow-3.webp',
                    'assets/img/expenseflow-4.webp',
                    'assets/img/expenseflow-5.webp',
                    'assets/img/expenseflow-6.webp',
                    'assets/img/expenseflow-7.webp'],
            technologies: ['Django', 'Python', 'SQLite', 'Bootstrap', 'JavaScript'],
            metric: 'Dashboard Financiero',
            github: 'https://github.com/rodrigo-mellav/expense-flow',
            //demo: '#',
            featured: false,
            status: 'full stack'
        },
        {
            badge: 'Pproyecto 3',
            title: 'Proyecto 3',
            description: 'En desarrollo',
            summary: 'proyecto en desarrollo',
            images: ['assets/img/ejemplo.avif'],
            technologies: ['JavaScript'],
            metric: 'en desarrollo',
            github: '#',
            //demo: '#',
            featured: false
        }
    ]
    ,
    about: [
        {
            icon: 'bi-person-circle',
            title: 'Quién soy',
            text: 'Soy Rodrigo, Ingeniero Informático y Diseñador Gráfico. Combino la resolución de problemas lógicos del backend con la creatividad visual para crear experiencias web funcionales y atractivas.'
        },
        {
            icon: 'bi-phone',
            title: 'Responsive Design',
            text: 'Diseño interfaces responsivas que se adaptan de manera fluida a cualquier dispositivo, priorizando la experiencia de usuario y la accesibilidad.'
        },
        {
            icon: 'bi-people',
            title: 'Soft Skills',
            text: 'Trabajo bien en equipos ágiles, me adapto rápido a cambios y mantengo comunicación clara para cumplir plazos y objetivos.'
        },
        {
            icon: 'bi-book',
            title: 'Estudios',
            text: 'Formación en Ingeniería Informática y Diseño Gráfico. Siempre aprendiendo nuevas tecnologías y técnicas de diseño.'
        }
    ]
};