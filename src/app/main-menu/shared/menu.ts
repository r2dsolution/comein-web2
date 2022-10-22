export const MENUS = [
    {
        title: "MAIN_MENU.HOME", routerLink: '/', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['comeinAdmin', 'hotelAdmin', 'hotelStaff'] // true false
    },
    // {
    //     title: "MAIN_MENU.CUSTOMER", routerLink: '/customer', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['hotelStaff'] // true false
    // },
    {
        title: "MAIN_MENU.AGENCY_PROFILE", routerLink: '/agency-profile', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['tour'] // true false
    },
    {
        title: "MAIN_MENU.BOOKING", routerLink: '/booking', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['hotelStaff'] // true false
    },
    {
        title: "MAIN_MENU.HOTEL_STAFF", routerLink: '/hotel-staff', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['hotelAdmin'] // true false
    },
    {
        title: "MAIN_MENU.HOTEL_ADMIN", routerLink: '/hotel-admin', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['comeinAdmin'] // true false
    },
    {
        title: "MAIN_MENU.TOUR_DASHBOARD", routerLink: '/tour/dashboard', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['tour'] // true false
    },
    {
        title: "MAIN_MENU.TOUR", routerLink: '/tour', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['tour'] // true false
    },
    // {
    //     title: "MAIN_MENU.SCHEDULE", routerLink: '/schedule', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['tour'] // true false
    // },
    {
        title: "MAIN_MENU.INVENTORY", routerLink: '/inventory', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['tour'] // true false
    },
    // {
    //     title: "MAIN_MENU.TOUR_PACKAGE", routerLink: '/tour-package', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['tour'] // true false
    // },
    {
        title: "MAIN_MENU.TOUR_PROFILE", routerLink: '/tour-admin', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['comeinAdmin'] // true false
    },
    {
        title: "MAIN_MENU.TOUR_BOOKING", routerLink: '/tour-booking', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['tour'] // true false
    },
    {
        title: "MAIN_MENU.OTA", routerLink: '/ota', routerLinkActiveOptions: { exact: true }, matBadgeParameter: null, matBadgeOverlap: true, matBadgeHiddenParameter: true, role: ['comeinAdmin'] // true false
    }
]